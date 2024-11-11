import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArtistCard } from "~/components/ArtistCard";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { db } from "~/lib/db.server";
import { validateSearchParams } from "~/utils/validations";

export type Artist = {
  id: string;
  slug: string;
  name: string;
  image: string;
  genres: string[];
  totalReleases: number;
  monthlyListeners: string;
  featured: boolean;
  createdAt: string;
};

export type LoaderData = {
  artists: Artist[];
  genres: string[];
  meta: {
    total: number;
    featuredCount: number;
    totalReleases: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
};

// Query params type
type SearchParams = {
  query?: string;
  genre?: string;
  sort?: "newest" | "popular" | "releases";
  tab?: "all" | "featured" | "new";
  page?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams);

  // Validate and parse search params
  const {
    query = "",
    genre = "all",
    sort = "newest",
    tab = "all",
    page = "1",
  } = validateSearchParams<SearchParams>(searchParams);

  // Parse pagination
  const perPage = 12;
  const currentPage = parseInt(page, 10);

  try {
    // Build the query
    const baseQuery = {
      where: {
        AND: [
          // Search by name
          query
            ? {
                OR: [
                  { name: { contains: query, mode: "insensitive" } },
                  { genres: { has: query } },
                ],
              }
            : {},
          // Filter by genre
          genre !== "all" ? { genres: { has: genre } } : {},
          // Filter by tab
          tab === "featured" ? { featured: true } : {},
          tab === "new"
            ? {
                createdAt: {
                  gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              }
            : {},
        ],
      },
    };

    // Get total count for pagination
    const total = await db.artist.count(baseQuery);

    // Get artists with pagination
    const artists = await db.artist.findMany({
      ...baseQuery,
      orderBy: [
        // Sort options
        sort === "newest"
          ? { createdAt: "desc" }
          : sort === "popular"
          ? { monthlyListeners: "desc" }
          : sort === "releases"
          ? { totalReleases: "desc" }
          : { createdAt: "desc" },
      ],
      skip: (currentPage - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        slug: true,
        name: true,
        image: true,
        genres: true,
        totalReleases: true,
        monthlyListeners: true,
        featured: true,
        createdAt: true,
      },
    });

    // Get all unique genres for filter
    const genres = await db.artist
      .findMany({
        select: { genres: true },
        distinct: ["genres"],
      })
      .then((results: any[]) =>
        Array.from(new Set(results.flatMap((r) => r.genres)))
      );

    // Get meta counts
    const [featuredCount, totalReleases] = await Promise.all([
      db.artist.count({ where: { featured: true } }),
      db.release.count(),
    ]);

    return json<LoaderData>({
      artists,
      genres,
      meta: {
        total,
        featuredCount,
        totalReleases,
        page: currentPage,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error("Error loading artists:", error);
    throw new Response("Error loading artists", { status: 500 });
  }
}

// Handle errors when loading artists
export function ErrorBoundary() {
  return (
    <div className="container py-12">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <h1 className="text-xl font-bold text-white mb-2">
          Error Loading Artists
        </h1>
        <p className="text-blue-200">
          There was a problem loading the artists. Please try again later.
        </p>
      </div>
    </div>
  );
}

// Add headers for caching if needed
export const headers = () => ({
  "Cache-Control": "public, max-age=300", // Cache for 5 minutes
});

export default function ArtistsIndex() {
  const { artists, genres, meta } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <header className="relative z-10 pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Artists</h1>
              <p className="text-gray-400">
                Discover {meta.total} artists across {genres.length} genres
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search artists..."
                className="w-full md:w-64"
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Artists Grid */}
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </main>
    </div>
  );
}
