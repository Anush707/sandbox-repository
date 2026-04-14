import React, { useState } from "react";
import { useMovieStore } from "../store/useMovieStore";

export function MovieList() {
  const movies = useMovieStore((state) => state.movies);
  const toggleWatched = useMovieStore((state) => state.toggleWatched);

  const [filterType, setFilterType] = useState<
    "all" | "watched" | "unwatched"
  >("all");

  let filteredMovies = movies;

  if (filterType === "watched") {
    filteredMovies = movies.filter((m) => m.watched);
  } else if (filterType === "unwatched") {
    filteredMovies = movies.filter((m) => !m.watched);
  }

  return (
    <div className="mt-6 p-6 border rounded-xl bg-white">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilterType("all")}
          className="px-3 py-1 border rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilterType("watched")}
          className="px-3 py-1 border rounded"
        >
          Watched
        </button>

        <button
          onClick={() => setFilterType("unwatched")}
          className="px-3 py-1 border rounded"
        >
          Unwatched
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <span>
              {movie.title} {movie.watched ? "✅" : "⌛"}
            </span>

            <button
              onClick={() => toggleWatched(movie.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Change state
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}