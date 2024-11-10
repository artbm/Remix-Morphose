// app/routes/artists.jsx - Artists listing
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Music2, Search } from "lucide-react";
import { MainLayout } from "~/components/layout/MainLayout";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export async function loader() {
  const artists = [
    {
      slug: "synthwave-sally",
      name: "Synthwave Sally",
      image: "/api/placeholder/400/400",
      genres: ["Synthwave", "Electronic"],
      totalReleases: 12,
      monthlyListeners: "234K",
    },
    // ... more artists
  ];
  return json({ artists });
}

export default function Artists() {
  const { artists } = useLoaderData<{
    artists: Array<{
      slug: string;
      name: string;
      image: string;
      genres: string[];
      totalReleases: number;
      monthlyListeners: string;
    }>;
  }>();

  return (
    <MainLayout>
      <div className="h-full min-h-screen bg-gradient-to-b from-gray-950 to-black">
        <div className="container px-4 py-6 lg:py-10">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Artists</h1>
              <p className="text-sm text-blue-200">
                Discover our roster of talented artists
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-200" />
              <Input
                placeholder="Search artists..."
                className="pl-8 bg-gray-900 border-gray-800 text-white"
              />
            </div>
          </div>

          {/* Tabs for filtering */}
          <Tabs defaultValue="all" className="mt-6">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="all">All Artists</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New Additions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artists.map((artist) => (
                  <Link key={artist.slug} to={artist.slug}>
                    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors">
                      <CardContent className="pt-6">
                        <div className="relative aspect-square mb-6">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                        <div className="space-y-4">
                          <h2 className="text-xl font-bold text-white">
                            {artist.name}
                          </h2>
                          <div className="flex gap-2 flex-wrap">
                            {artist.genres.map((genre) => (
                              <Badge key={genre} variant="secondary">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between text-blue-200">
                        <div className="flex items-center gap-2">
                          <Music2 className="h-4 w-4" />
                          <span>{artist.totalReleases} releases</span>
                        </div>
                        <span>{artist.monthlyListeners} monthly listeners</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
