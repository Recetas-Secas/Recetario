import Link from "next/link";
import { getAllRecipes } from "@/lib/recipes";

export default function Home() {
  const recipes = getAllRecipes();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Recetario Secas</h1>
      <p className="mt-2 text-sm opacity-80">Recetas con orellanas deshidratadas.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <Link
            key={r.slug}
            href={`/recetas/${r.slug}`}
            className="rounded-xl border p-4 hover:shadow"
          >
            <div className="text-lg font-semibold">{r.titulo}</div>
            <div className="mt-2 text-sm opacity-80">
              {r.tiempoMin} min · {r.dificultad} · {r.vegano ? "vegano" : "no vegano"}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}