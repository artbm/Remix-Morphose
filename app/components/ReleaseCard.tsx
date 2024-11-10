import { Link } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

interface Release {
  slug: string;
  cover: string;
  title: string;
  artist: {
    slug: string;
    name: string;
  };
  type: string;
  releaseDate: string;
}

interface ReleaseCardProps {
  release: Release;
  className?: string;
  showArtist?: boolean;
}

export function ReleaseCard({
  release,
  className,
  showArtist = true,
}: ReleaseCardProps) {
  return (
    <Link to={`/releases/${release.slug}`}>
      <Card
        className={`bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors ${className}`}
      >
        <CardContent className="p-4">
          <img
            src={release.cover}
            alt={release.title}
            className="w-full aspect-square rounded-lg mb-4"
          />
          <div className="space-y-2">
            <h3 className="font-semibold text-white line-clamp-1">
              {release.title}
            </h3>
            {showArtist && (
              <Link
                to={`/artists/${release.artist.slug}`}
                className="text-sm text-blue-200 hover:text-blue-100 block"
              >
                {release.artist.name}
              </Link>
            )}
            <div className="flex justify-between items-center">
              <Badge variant="secondary">{release.type}</Badge>
              <span className="text-sm text-blue-200">
                {release.releaseDate}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
