import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface Event {
  date: string;
  slug: string;
  title: string;
  venue: string;
  location: string;
  artists: { id: string; slug: string; name: string }[];
  ticketUrl?: string;
}

interface EventCardProps {
  event: Event;
  className?: string;
  showArtists?: boolean;
}

export function EventCard({
  event,
  className,
  showArtists = true,
}: EventCardProps) {
  const eventDate = new Date(event.date);

  return (
    <Card className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-6">
            <div className="text-center min-w-[60px]">
              <div className="text-2xl font-bold text-white">
                {eventDate.getDate()}
              </div>
              <div className="text-sm text-blue-200">
                {eventDate.toLocaleString("default", { month: "short" })}
              </div>
            </div>
            <div className="space-y-1">
              <Link
                to={`/events/${event.slug}`}
                className="text-lg font-semibold text-white hover:text-blue-100"
              >
                {event.title}
              </Link>
              <p className="text-blue-200">
                {event.venue} • {event.location}
              </p>
              {showArtists && (
                <div className="text-sm text-blue-200">
                  {event.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <Link
                        to={`/artists/${artist.slug}`}
                        className="hover:text-blue-100"
                      >
                        {artist.name}
                      </Link>
                      {index < event.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {event.ticketUrl && (
            <Button
              variant="outline"
              className="border-blue-400 text-blue-200 whitespace-nowrap"
              asChild
            >
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Tickets
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
