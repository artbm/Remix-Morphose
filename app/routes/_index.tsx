// app/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  ArrowRight,
  AudioLines,
  Calendar,
  Disc3,
  Play,
  Timer,
} from "lucide-react";
import { ArtistCard } from "~/components/ArtistCard";
import { EventCard } from "~/components/EventCard";
import { MainLayout } from "~/components/layout/MainLayout";
import { ReleaseCard } from "~/components/ReleaseCard";
import { Button } from "~/components/ui/button";
import type { Artist } from "~/types";

type ReleaseType = "EP" | "Album" | "Single";

interface Release {
  id: string;
  slug: string;
  title: string;
  cover: string;
  artist: {
    id: string;
    name: string;
    slug: string;
    image: string;
    genres: string[];
    totalReleases: number;
    monthlyListeners: string;
  };
  releaseDate: string;
  type: ReleaseType; // This ensures type is one of the three allowed values
  genre: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  artists: Artist[];
  image: string;
  slug: string;
  location: string;
}

export async function loader() {
  return json({
    featuredReleases: [
      {
        id: "1",
        slug: "digital-pulse",
        title: "Digital Pulse EP",
        cover: "/api/placeholder/400/400",
        artist: {
          id: "1",
          name: "Binary Beats",
          slug: "binary-beats",
          image: "/api/placeholder/200/200",
          genres: ["Techno"],
          totalReleases: 5,
          monthlyListeners: "10000",
        },
        releaseDate: "2024",
        type: "EP",
        genre: "Techno",
      },
    ],
    featuredArtists: [
      {
        id: "1",
        name: "Binary Beats",
        slug: "binary-beats",
        image: "/api/placeholder/200/200",
        genres: ["Techno"],
        totalReleases: 5,
        monthlyListeners: 10000,
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Techno Night",
        date: "2024-03-15",
        venue: "Club XYZ",
        city: "Berlin",
        artists: [
          {
            id: "1",
            name: "Binary Beats",
            slug: "binary-beats",
            image: "/api/placeholder/200/200",
            genres: ["Techno"],
            totalReleases: 5,
            monthlyListeners: 10000,
          },
        ],
        image: "/api/placeholder/800/400",
        slug: "techno-night",
        location: "Berlin, Germany",
      },
    ],
  });
}

export default function Index() {
  const { featuredReleases, featuredArtists, upcomingEvents } =
    useLoaderData<typeof loader>();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="inline-block mb-6 animate-pulse">
            <AudioLines className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            The Future of
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Electronic Music
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Pushing boundaries in techno, house, and electronic music. Join us
            in shaping the sound of tomorrow.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Play className="w-5 h-5 mr-2" /> Listen Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-200"
            >
              Explore Artists
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { icon: Disc3, label: "Releases", value: "100+" },
              { icon: Timer, label: "Hours of Music", value: "1000+" },
              { icon: Calendar, label: "Events", value: "50+" },
              { icon: AudioLines, label: "Artists", value: "25+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                  {value}
                </div>
                <div className="text-sm text-blue-200">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-blue-500 rotate-90" />
        </div>
      </section>

      {/* Latest Releases */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Latest Releases
              </h2>
              <p className="text-blue-200">
                Fresh tracks from our roster of artists
              </p>
            </div>
            <Button variant="ghost" className="text-blue-200">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredReleases.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Artists
            </h2>
            <p className="text-blue-200">
              Meet the innovators shaping our sound
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtists.map(
              (artist) =>
                artist && <ArtistCard key={artist.id} artist={artist} />
            )}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Upcoming Events
              </h2>
              <p className="text-blue-200">Experience the music live</p>
            </div>
            <Button variant="ghost" className="text-blue-200">
              All Events <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map(
              (event) => event && <EventCard key={event.id} event={event} />
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-blue-200 mb-8">
              Subscribe to our newsletter for exclusive updates, releases, and
              event announcements.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
