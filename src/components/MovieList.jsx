import { useEffect, useState } from "react";
import axios from "../api/axios";

const MovieList = ({ title, fetchUrl, moviesData, watchlist, toggleWatchlist, isWatchlistRow }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

  useEffect(() => {
    if (moviesData) {
      setMovies(moviesData);
    } else {
      async function fetchData() {
        try {
          const connector = fetchUrl.includes('?') ? '&' : '?';
          const request = await axios.get(
            `${fetchUrl}${connector}api_key=${import.meta.env.VITE_TMDB_KEY}`
          );
          setMovies(request.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
      fetchData();
    }
  }, [fetchUrl, moviesData]);

  const isInWatchlist = (id) => watchlist?.some((m) => m.id === id);

  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="text-white px-4 md:px-10 mb-6 md:mb-8">
      {/* Judul Row - Font lebih dinamis */}
      <h2 className={`text-base md:text-xl font-bold mb-3 md:mb-4 tracking-tight ${isWatchlistRow ? "text-cyan-400" : "text-gray-100"}`}>
        {title}
      </h2>

      {/* List Film Horizontal - Touch Friendly */}
      <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 no-scrollbar scroll-smooth snap-x">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="flex-none w-[110px] md:w-[160px] group cursor-pointer snap-start"
            onClick={() => setSelectedMovie(movie)}
          >
            {/* Poster Card */}
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg md:rounded-xl shadow-lg transition-all duration-300 active:scale-95 md:group-hover:scale-105">
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Quick Action Button - Selalu muncul di Mobile, Hover di Desktop */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(movie);
                }}
                className={`absolute top-1.5 right-1.5 md:top-2 md:right-2 p-1 md:p-1.5 rounded-full z-20 shadow-lg transition-all
                  ${isInWatchlist(movie.id) ? "bg-cyan-500 text-white" : "bg-black/60 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100"}`}
              >
                <span className="text-[10px] md:text-xs px-1 font-bold">{isInWatchlist(movie.id) ? "✓" : "+"}</span>
              </button>
            </div>

            {/* Info Singkat */}
            <div className="mt-2 px-0.5">
              <p className="text-[10px] md:text-xs font-bold truncate">
                {movie.title || movie.name}
              </p>
              <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-gray-400 mt-0.5">
                <span className="text-yellow-500">★ {movie.vote_average?.toFixed(1)}</span>
                <span>•</span>
                <span>{(movie.release_date || movie.first_air_date)?.substring(0, 4)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DETAIL - Mobile Optimized */}
      {selectedMovie && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center z-[999] transition-all"
          onClick={() => setSelectedMovie(null)}
        >
          <div 
            className="bg-[#1a1a1a] w-full md:max-w-lg rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom md:zoom-in duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X */}
            <button 
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-[100] bg-black/50 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold"
            >✕</button>

            {/* Modal Banner */}
            <div className="relative h-48 md:h-64">
              <img 
                src={`${BACKDROP_BASE}${selectedMovie.backdrop_path || selectedMovie.poster_path}`} 
                className="w-full h-full object-cover" 
                alt="cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-xl md:text-3xl font-black text-white drop-shadow-lg line-clamp-2">
                    {selectedMovie.title || selectedMovie.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <span className="text-green-400">{Math.round(selectedMovie.vote_average * 10)}% Match</span>
                <span className="text-gray-300">{formatDate(selectedMovie.release_date || selectedMovie.first_air_date)}</span>
                <span className="border border-gray-600 px-1.5 py-0.5 rounded text-gray-400">HD</span>
              </div>
              
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-4 md:line-clamp-5">
                {selectedMovie.overview || "Tidak ada deskripsi tersedia."}
              </p>

              {/* Action Buttons - Stacked on Mobile */}
              <div className="flex flex-col md:flex-row gap-3">
                <button className="flex-1 py-3.5 md:py-3 bg-white text-black rounded-xl md:rounded-lg font-black text-xs uppercase tracking-widest active:bg-gray-200">
                  ▶ Play
                </button>
                <button 
                  onClick={() => {
                    toggleWatchlist(selectedMovie);
                    setSelectedMovie(null);
                  }} 
                  className={`flex-1 py-3.5 md:py-3 rounded-xl md:rounded-lg font-black text-xs uppercase tracking-widest transition-all border
                    ${isInWatchlist(selectedMovie.id) 
                      ? "bg-red-500/10 border-red-500 text-red-500" 
                      : "bg-[#333] border-transparent text-white"}`}
                >
                  {isInWatchlist(selectedMovie.id) ? "Remove List" : "+ Watchlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default MovieList;
