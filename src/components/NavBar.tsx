import { Link } from "react-router-dom";
import useSessionContext from "../context/useSessionContext";
import useQueryRefreshAccessToken from "../queries/useQueryRefreshToken";

export default function NavBar() {

  const { session } = useSessionContext()

  const { data: sessionData } = useQueryRefreshAccessToken()

  console.log(sessionData)

  return (
    <nav className="px-5 py-3 flex justify-between bg-darkBlue-100 text-white">
      <h1>Blog</h1>
      <ul className="flex gap-3">
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