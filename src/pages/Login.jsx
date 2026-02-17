import { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) onLoginSuccess();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Poster dengan Overlay Biru Gelap */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0744f902144f/98669305-9518-4f51-ba2a-b0502b740518/ID-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          className="w-full h-full object-cover opacity-30"
          alt="bg"
        />
        {/* Overlay gradasi biar makin kerasa biru gelap vibe-nya */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-blue-900/20 to-black" />
      </div>

      {/* Form Login */}
      <div className="relative z-10 w-full max-w-[420px] p-10 bg-black/80 rounded-lg shadow-2xl border border-blue-900/30">
        <h1 className="text-3xl font-bold text-blue-500 mb-8 tracking-tight">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 rounded bg-[#222] text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-[#333] transition-all border border-transparent"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* TOMBOL BIRU MANTAP */}
          <button className="bg-blue-600 hover:bg-blue-700 py-3.5 rounded text-white font-bold text-lg mt-4 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
