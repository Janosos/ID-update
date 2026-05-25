import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface WordPressPage {
    title: string;
    content: string;
}

// 1. LLAMADO MASIVO: Obtiene de golpe todos los Slugs publicados en WordPress
export async function generateStaticParams() {
    const query = `
    query ObtenerTodosLosSlugs {
      pages {
        nodes {
          slug
        }
      }
    }
  `;

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_URL as string, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const { data } = await res.json();
        return data?.pages?.nodes.map((page: { slug: string }) => ({
            slug: page.slug,
        })) || [];
    } catch (error) {
        console.error("Error al obtener los slugs globales:", error);
        return [];
    }
}

// 2. LLAMADO INDIVIDUAL: Jala el contenido específico de la página que se está horneando
async function getPageContent(slug: string): Promise<WordPressPage | null> {
    const query = `
    query ObtenerContenidoPagina($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
    }
  `;

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_URL as string, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { slug } }),
        });

        const { data } = await res.json();
        return data?.page || null;
    } catch {
        return null;
    }
}

// 3. RENDERIZADO VISUAL CON TAILWIND
export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPageContent(slug);

    if (!page) notFound(); // Si la URL no existe en WordPress, manda un 404 estático seguro

    return (
        <main className="min-h-screen bg-slate-900 text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                    {page.title}
                </h1>
                {/* Aquí inyectas el contenido de WordPress, pero puedes rodearlo de componentes locales diseñados por ti */}
                <div
                    className="prose prose-invert max-w-none prose-purple"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </main>
    );
}