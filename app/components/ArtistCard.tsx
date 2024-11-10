import { Link } from "@remix-run/react";
import { Music2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface Artist {
  slug: string;
  image: string;
  name: string;
  genres: string[];
  totalReleases: number;
  monthlyListeners: number;
}

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, className }: ArtistCardProps) {
  return (
    <Link to={`/artists/${artist.slug}`}>
      <Card
        className={`bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors ${className}`}
      >
        <CardContent className="pt-6">
          <div className="relative aspect-square mb-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">{artist.name}</h2>
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
  );
}
