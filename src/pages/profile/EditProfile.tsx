import useDeleteUserMutation from "../../queries/user/useDeleteUserMutation"
import useGetUserDataQuery from "../../queries/user/useGetUserDataQuery"
import useSessionContext from "../../context/useSessionContext"
import Modal from "../../components/Modal"
import { useEffect, useState } from "react"
import Form from "../../components/customForm/Form"
import LoadingPage from "../utils/LoadingPage"
import ErrorPage from "../utils/ErrorPage"
import UploadImage from "../../components/UploadImage"
import useUpdateUserInfoMutation from "../../queries/user/useUpdateUserInfoMutation"
import useChangePasswordMutation from "../../queries/user/useChangePasswordMutation"
import SelectInput from "../../components/customForm/SelectInput"
import { Roles } from "../../enums"
import useLogOutMutation from "../../queries/auth/useLogOutMutation"

export default function EditProfile() {
  const { session } = useSessionContext()

  const [showModal, setShowModal] = useState(false)
  const [loadingUserData, setLoadingUserData] = useState(true)

  const [formData, setFormData] = useState({
    username: session?.username || '',
    email: '',
    currentPassword: '',
    newImage: '',
    role: Roles.USER
  })

  const [formPassword, setFormPassword] = useState({
    currentPassword: '',
    newPassword: ''
  })

  const { data: userData, isLoading: gettingUserInfo, isError, error, refetch } = useGetUserDataQuery(session?.username || '')

  const { mutateAsync: editProfile, isLoading: isEditingProfile } = useUpdateUserInfoMutation()
  const { mutateAsync: changePassword, isLoading: isChangingPassword } = useChangePasswordMutation()
  const { mutateAsync: deleteProfile } = useDeleteUserMutation()
  const { mutateAsync:logOut } = useLogOutMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData && session) {
          await refetch();
        }
        if (userData) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: userData.email || "",
            role: userData.role || Roles.USER,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUserData(false);
      }
    };
    fetchData();
  }, [userData, refetch]);

  if (gettingUserInfo || loadingUserData) return <LoadingPage />

  if (!userData) return null

  if (isError || error) return <ErrorPage error={error} />

  const fieldsUserInfo = [
    { name: 'username', autoComplete: 'off', id: 'username', minLength: 5, maxLength: 25, dontAllowWhiteSpaces: true, type: 'text', value: formData.username, placeholder: 'Enter your new username', required: true },
    { name: 'email', id: 'email', type: 'email', value: formData.email, placeholder: 'Enter your new email', required: true },
    { name: 'currentPassword', id: 'password', type: 'password', minLength: 8, value: formData.currentPassword, placeholder: 'Enter your current password', required: true },
  ]

  const fieldsUserPassword = [
    { name: 'currentPassword', id: 'currentPassword', type: 'password', minLength: 8, value: formPassword.currentPassword, placeholder: 'Enter your current password', required: true },
    { name: 'newPassword', id: 'newPassword', type: 'password', minLength: 8, value: formPassword.newPassword, placeholder: 'Enter your new password', required: false },
  ]

  return (
    <div className="w-11/12 h-full mx-auto text-white flex flex-col gap-4 items-center justify-center">
      <Modal
        actionButtonText="Delete"
        setShowModal={setShowModal}
        showModal={showModal}
        message="Are you sure you want to delete your account?"
        title="Wait!"
        onActionFn={async () => {
          await deleteProfile(session?.userId!)
          await logOut()
        }}
      />

      <Form
        formData={formData}
        setFormData={setFormData}
        fields={fieldsUserInfo}
        isLoading={isEditingProfile}
        title="Update your Information"
        onSubmitFn={editProfile}
        sendButtonText="Update"
      >
        <SelectInput values={[Roles.USER, Roles.ADMIN]} name="role" id="role" labelText="Role:" onChange={(e)=> setFormData({...formData, role: e.target.value as Roles})}/>
        <UploadImage preloadImage={userData.imageUrl} setImage={(newImage) => setFormData({ ...formData, newImage })} message="Upload an image here..." advice="To change your profile image, upload a new one" />
      </Form>

      <Form
        formData={formPassword}
        setFormData={setFormPassword}
        fields={fieldsUserPassword}
        isLoading={isChangingPassword}
        title="Change your Password"
        onSubmitFn={changePassword}
        sendButtonText="Change your password"
      />

      <button
        className="bg-red-500 p-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>

    </div>
  )
}