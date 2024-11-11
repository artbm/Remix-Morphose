// app/utils/db.helpers.ts

import { PrismaClient } from "@prisma/client";

export async function slugify(text: string): Promise<string> {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export async function createUniqueSlug(
  text: string,
  model: "artist" | "release" | "event",
  db: PrismaClient
): Promise<string> {
  let slug = await slugify(text);
  let counter = 0;
  let uniqueSlug = slug;

  while (true) {
    const existing = await db[model].findUnique({
      where: { slug: uniqueSlug },
    });

    if (!existing) break;

    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }

  return uniqueSlug;
}
