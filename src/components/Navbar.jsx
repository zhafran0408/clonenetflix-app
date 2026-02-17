import { useState, useEffect } from "react";

const Navbar = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${
        isScrolled ? "bg-slate-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold text-indigo-500 tracking-tight">
          Streamify
        </h1>

        <ul className="hidden md:flex space-x-6 text-sm text-gray-300">
          <li className="cursor-pointer hover:text-white transition">Home</li>
          <li className="cursor-pointer hover:text-white transition">Movies</li>
          <li className="cursor-pointer hover:text-white transition">
            TV Shows
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Cari film..."
          className="bg-gray-800/50 text-white text-sm border border-gray-600 rounded-md px-4 py-1.5 focus:outline-none focus:border-indigo-500 transition-all w-40 md:w-60"
          value={query}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
