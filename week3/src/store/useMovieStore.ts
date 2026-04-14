import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  watched: boolean;
}

interface MovieState {
  movies: Movie[];
  toggleWatched: (id: number) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [
    { id: 1, title: "Interstellar", watched: false },
    { id: 2, title: "Inception", watched: true },
    { id: 3, title: "The Matrix", watched: false },
    { id: 4, title: "Avatar", watched: true },
  ],

  toggleWatched: (id) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      ),
    })),
}));