import useDeleteUserMutation from "../queries/user/useDeleteUserMutation"
import useGetUserDataQuery from "../queries/user/useGetUserDataQuery"
import useSessionContext from "../context/useSessionContext"

export default function EditProfile() {

  const { session } = useSessionContext()

  const { data:userData , isLoading, isError } = useGetUserDataQuery(session?.username || '')
  const { mutateAsync: deleteProfile } = useDeleteUserMutation()

  if (isLoading) return <div>Loading...</div>

  if (isError || !userData) return <div>Error</div>

  return (
    <div className="w-11/12 h-full mx-auto text-white flex flex-col items-center justify-center">
      
      <div className="flex flex-col gap-3 items-center text-center p-3 rounded-xl bg-slate-800">
        <h1>{userData.username}</h1>

        <div className="flex gap-3">
          <span className="text-slate-400">Email: </span>
          <p>{userData.email}</p>
        </div>

        <div>
          <button 
            className="bg-red-500 p-2 rounded-md"
            onClick={async() => await deleteProfile()}
          >Delete Account
          </button>
        </div>
      </div>

    </div>
  )
}