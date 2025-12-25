import Link from "next/link";
import { marked } from "marked";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export default async function RecetaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const recipe = getRecipeBySlug(slug);
  if (!recipe) return <main className="p-6">Receta no encontrada.</main>;

  const html = marked.parse(recipe.markdown);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/" className="underline text-sm">
        ← Volver
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{recipe.titulo}</h1>
      <p className="mt-2 text-sm opacity-80">
        {recipe.tiempoMin} min · {recipe.dificultad} ·{" "}
        {recipe.vegano ? "vegano" : "no vegano"}
      </p>

      <h2 className="mt-6 text-xl font-semibold">Ingredientes</h2>
      <ul className="mt-2 list-disc pl-6">
        {recipe.ingredientes.map((i, idx) => (
          <li key={idx}>
            {i.qty} {i.unit} — {i.item}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold">Preparación</h2>
      <div
        className="prose prose-invert mt-3 max-w-none"
        dangerouslySetInnerHTML={{ __html: String(html) }}
      />
    </main>
  );
}