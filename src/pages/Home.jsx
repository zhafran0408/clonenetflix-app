import { useEffect, useState } from "react";

const Navbar = ({ onSearch }) => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition duration-500 ${
        showBg ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-10 py-5">
        
        <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>

        
        <ul className="flex gap-8 text-white text-lg">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
        </ul>

       
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded outline-none"
        />
      </div>
    </div>
  );
};

export default Navbar;

