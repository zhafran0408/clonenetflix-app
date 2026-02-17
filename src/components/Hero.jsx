import { useEffect, useState } from "react";
import axios from "../api/axios.js";

const Hero = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);
  const [activeGenre, setActiveGenre] = useState(null);

  const genreList = [
    { id: null, name: "Trending" },
    { id: 28, name: "Action" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(
          `${fetchUrl}&api_key=${import.meta.env.VITE_TMDB_KEY}`,
        );
        const allMovies = request.data.results;
        let selectedList = allMovies;

        if (activeGenre) {
          const filtered = allMovies.filter((m) =>
            m.genre_ids?.includes(activeGenre),
          );
          if (filtered.length > 0) selectedList = filtered;
        }

        const randomIndex = Math.floor(Math.random() * selectedList.length);
        setMovie(selectedList[randomIndex]);
      } catch (error) {
        console.error("Streamify Error:", error);
      }
    }
    fetchData();
  }, [fetchUrl, activeGenre]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  if (!movie) return <div className="h-[70vh] md:h-[85vh] bg-[#0a0a0a] animate-pulse" />;

  return (
    <header
      className="relative h-[80vh] md:h-[85vh] w-full flex items-center transition-all duration-1000 bg-[#0a0a0a] overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,1) 100%), 
                          linear-gradient(to bottom, rgba(10,10,10,0) 20%, rgba(10,10,10,0.8) 70%, rgba(10,10,10,1) 100%), 
                          url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center 20%",
      }}
    >
      <div className="px-6 md:ml-20 z-10 space-y-5 md:space-y-7 mt-20 md:mt-10 w-full">
        
        {/* Genre Selector - Mobile Friendly (Scrollable) */}
        <div className="flex gap-2 p-1 w-fit max-w-full overflow-x-auto no-scrollbar rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          {genreList.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGenre(g.id)}
              className={`px-4 md:px-6 py-1.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-300 whitespace-nowrap ${
                activeGenre === g.id
                  ? "bg-blue-600 text-white shadow-lg scale-105" // Pakai Blue sesuai request lu tadi
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Title - Responsive Font Size */}
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-2xl max-w-4xl leading-[0.95] md:leading-[0.9]">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 md:gap-5 text-[10px] md:text-[12px] font-bold text-gray-400 tracking-[0.2em] uppercase">
          <span className="text-white bg-blue-600 px-2 py-0.5 rounded">
            Top 10
          </span>
          <span>{movie?.release_date?.split("-")[0] || "2026"}</span>
          <span className="text-yellow-500">
            ★ {movie?.vote_average?.toFixed(1)}
          </span>
          <span className="border border-white/20 px-1.5 py-0.5 rounded text-white text-[8px] md:text-[10px]">
            4K ULTRA HD
          </span>
        </div>

        {/* Overview - Shorter on Mobile */}
        <p className="max-w-xs md:max-w-xl text-gray-300 text-xs md:text-base leading-relaxed font-medium drop-shadow-md">
          {truncate(movie?.overview, 100)} {/* Gue pendekin buat mobile */}
        </p>

        {/* Buttons - Stacked on Mobile? Better side-by-side with smaller padding */}
        <div className="flex gap-3 md:gap-5 pt-2">
          <button className="flex-1 md:flex-none px-6 md:px-12 py-3 md:py-4 bg-white text-black font-black rounded-sm transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-95 uppercase tracking-widest text-[10px] md:text-xs">
            Play Now
          </button>

          <button className="flex-1 md:flex-none px-6 md:px-12 py-3 md:py-4 bg-transparent text-white font-black rounded-sm border-2 border-white/20 transition-all duration-300 hover:bg-white hover:text-black active:scale-95 uppercase tracking-widest text-[10px] md:text-xs text-center">
            + List
          </button>
        </div>
      </div>

      {/* Decorative Line - Hidden on Mobile for cleaner look */}
      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,1)]" />
    </header>
  );
};

export default Hero;
