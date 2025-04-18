import { useSelector } from "react-redux"
import { UserProfileCard } from "../components/UserProfileCard"

import { ErrorPage } from "../components/ErrorPage"
import { useUserFetch } from "../hooks/useUserFetch"
import { Loading } from "../components/Loading"


export const UserProfile = () => {

  const { userLogin } = useSelector((state: any) => state.user)
  const { user, loading } = useUserFetch()

  const handleLogout = () => {
    
  }
  return (
    <>
      {
        userLogin ?
          !loading?
          <UserProfileCard
            username={user?.username as string}
            email={user?.email as string}
            onClickLogout={handleLogout}
          >
          </UserProfileCard> : 
          <Loading></Loading>
          :
          <ErrorPage></ErrorPage>
      }
    </>
  )
}
