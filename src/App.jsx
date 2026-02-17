import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Hero from "./components/Hero";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [watchlist, setWatchlist] = useState(() => {
    const savedData = localStorage.getItem("streamify-watchlist");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("streamify-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    const isExist = watchlist.find((item) => item.id === movie.id);
    if (isExist) {
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
    <div className="bg-black min-h-screen font-sans">
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Navbar onSearch={setSearchQuery} />

          {!searchQuery && <Hero fetchUrl="/trending/all/week?" />}

          <div className={searchQuery ? "pt-28" : "mt-10 relative z-10"}>
            {searchQuery ? (
              <MovieList
                title={`Results for: ${searchQuery}`}
                fetchUrl={`/search/movie?query=${searchQuery}`}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
              />
            ) : (
              <>
                {watchlist.length > 0 && (
                  <div className="mb-4">
                    <MovieList
                      title="My Personal Collection"
                      moviesData={watchlist}
                      watchlist={watchlist}
                      toggleWatchlist={toggleWatchlist}
                      isWatchlistRow={true}
                    />
                  </div>
                )}

                <MovieList
                  title="Trending Now"
                  fetchUrl="/trending/all/week?"
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
                <MovieList
                  title="Netflix Originals"
                  fetchUrl="/discover/tv?with_networks=213"
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
                <MovieList
                  title="Action Movies"
                  fetchUrl="/discover/movie?with_genres=28"
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
