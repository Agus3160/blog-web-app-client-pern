import { Link } from "react-router-dom";
import useSessionContext from "../context/useSessionContext";

export default function NavBar() {

  const { session } = useSessionContext()

  return (
    <nav className="px-5 py-3 flex justify-between bg-slate-800 text-white">
      <h1>Blog</h1>
      <ul className="flex gap-3 items-center list-none">
        {session? 
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          {session.role === "ADMIN" && <li><Link to={'/admin'}>Admin</Link></li>}
          <li><Link to={`/profile/${session.username}`}>Profile</Link></li>
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