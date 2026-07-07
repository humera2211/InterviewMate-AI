import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

  const loggedIn=localStorage.getItem("authToken");
  const navigate=useNavigate();

  const handleLogout=async ()=>{
    try{

    await axios.post("/api/v1/auth/logout");
    localStorage.removeItem("authToken");
    alert("Logout successful");

    navigate("/login");
    }catch(err)
    {
      console.log(err);

    }
  };


  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16  items-center justify-between px-6 ">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 shadow-xs shadow-cyan-500/20">
            <span className="text-lg font-bold text-cyan-400">AI</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide text-white">
              NexusGPT
            </h1>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-zinc-400 transition hover:text-cyan-400"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-sm text-zinc-400 transition hover:text-cyan-400"
          >
            Features
          </Link>
          {loggedIn ?
          (<button onClick={handleLogout} className="hover:text-cyan-400 text-zinc-400 text-sm">
            logout
          </button>)
          :
          (<div className="">
            <Link
              to="/register"
              className="mr-10 text-sm text-zinc-400 transition hover:text-cyan-400"
            >
              SignUp
            </Link>
            <Link
              to="/login"
              className="text-sm text-zinc-400 transition hover:text-cyan-400"
            >
              SignIn
            </Link>
          </div>)
}
        </div>

        {/*Button */}
        <button className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:shadow-lg hover:shadow-cyan-500/30">
          Start Chat
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
