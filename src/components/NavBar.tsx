import { Link } from "react-router-dom";
import useSessionContext from "../context/useSessionContext";

export default function NavBar() {

  const { session } = useSessionContext()

  return (
    <nav className="px-5 py-3 flex justify-between bg-slate-800 text-white">
      <h1>Blog</h1>
      <ul className="flex gap-3 items-center">
        {session? 
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to={`/profile/${session.username}`}>{session.username}</Link></li>
        </>
        :
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
        </>
        }
      </ul>
    </nav>
  )
}