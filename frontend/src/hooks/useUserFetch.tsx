
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";

type UserDetails = {
  username: string,
  email: string
}
export const useUserFetch = () => {
  const [user, setUser] = useState<UserDetails>()
  const [loading, setLoading] = useState<boolean>(true)
  const { userId } = useSelector((state: any) => state.user)

  useEffect(() => {
    (async () => {
      try {

        let res = await axios.get(`${BACKEND_URL}/users/${userId}`, { withCredentials: true })

        if (res.status == 200) {
          const { username, email } = res.data.user as UserDetails
          setUser({
            username: username,
            email: email
          })  // by default false
          setLoading(false)  // by default true
        }
      } catch (e) {
        if (e instanceof AxiosError) {

          if (e.response?.status === 401) {
            setLoading(false)
          } else {
            setLoading(false)
          }
        }
      }
    })()
    return () => { }
  }, [userId])
  return { user, loading };
}
