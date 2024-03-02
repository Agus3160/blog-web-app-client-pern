import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

type View = {
  path : string
  name : string
}

type Props = {
  views: View[]
}

export default function AdminHomeLayout({ views }: Props) {

  const [focus, setFocus] = useState(views[0].name)

  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/admin/${focus}`)
  }, [])

  return (
    <div className="h-full flex flex-col mx-5">
      <div className="flex flex-col h-full gap-5 ">
        <div className="justify-center flex w-full bg-slate-800 p-5 items-center justify-between rounded">
        <h2 className="font-bold hidden sm:block text-white">Admin Panel</h2>
          <ul className=" m-0 flex gap-3 list-none rounded-md">
            {views.map((view) => (
              <li className={`rounded-md ${focus === view.name ? "text-white" : "text-gray-500"}`} key={view.name} onClick={() => setFocus(view.name)}><Link to={view.path}>{view.name}</Link></li>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  )
}