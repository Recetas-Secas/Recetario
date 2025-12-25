import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Ingredient = { item: string; qty: number; unit: string };

export type Recipe = {
  slug: string;
  titulo: string;
  tiempoMin: number;
  dificultad: "fácil" | "media" | "difícil";
  tipo: string[];
  vegano: boolean;
  porcionesBase: number;
  alergenos: string[];
  ingredientes: Ingredient[];
  markdown: string;
};

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");

export function getAllRecipes(): Recipe[] {
  const files = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const full = path.join(RECIPES_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);

    return {
      slug: String(data.slug),
      titulo: String(data.titulo),
      tiempoMin: Number(data.tiempoMin),
      dificultad: data.dificultad,
      tipo: Array.isArray(data.tipo) ? data.tipo : [],
      vegano: Boolean(data.vegano),
      porcionesBase: Number(data.porcionesBase),
      alergenos: Array.isArray(data.alergenos) ? data.alergenos : [],
      ingredientes: Array.isArray(data.ingredientes) ? data.ingredientes : [],
      markdown: content,
    } as Recipe;
  });
}

export function getRecipeBySlug(slug: string): Recipe | null {
  return getAllRecipes().find((r) => r.slug === slug) ?? null;
}