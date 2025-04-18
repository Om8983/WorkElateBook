import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { UserUpdate } from "@om_wadhi/validation"
import axios, { AxiosError } from "axios"
import { BACKEND_URL } from "../config"
import { NavBar } from "./Navbar/NavBar"
import { UserEmailProfile } from "./UserEmailProfile"
import { motion } from "motion/react"
import { IconUser } from "@tabler/icons-react"
import { useSelector } from "react-redux"

type Props = {
    username: string
    email: string
    onClickLogout: () => void
}

export const UserProfileCard = ({ username, email, onClickLogout }: Props) => {
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const {userId }  = useSelector((state : any) => state.user)
    const [changes, setChanges] = useState<UserUpdate>({
        username: username,
        email: email,
    })

    const fieldUpdate = useRef<UserUpdate>({})

    const handleChange = (field: string, changedVal: string) => {
        setChanges((prev) => ({
            ...prev,
            [field]: changedVal,
        }))
    }

    const handleSave = async () => {
        try {
            if (changes.username !== username) {
                fieldUpdate.current.username = changes.username
            }
            if (changes.email !== email) {
                fieldUpdate.current.email = changes.email
            }

            if (changes.username === username && changes.email === email) {
                setEdit(false)
                return
            }

            const res = await axios.put(`${BACKEND_URL}/users/${userId}`, fieldUpdate, {
                withCredentials: true,
            })

            if (res.status === 200) {
                alert("User info updated successfully")
                setEdit(false)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                const status = e.response?.status
                if (status === 401) {
                    alert("User Unauthorized")
                    navigate("/login")
                } else if (status === 403) {
                    alert("Please enter valid information")
                } else {
                    alert("Internal Server Error!")
                }
            }
        }
    }

    return (
        <div className="min-h-screen w-screen bg-[#fffbee] flex flex-col">
            <NavBar />

            <div className="flex-1 flex flex-col items-center justify-center gap-10 py-16 px-4 md:grid md:grid-cols-4">
                {/* user image */}
                <div className="relative w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full bg-[#fb6c53] overflow-hidden mx-auto col-span-2">
                    {/* <img className="" src="/user.svg" alt="user" /> */}
                    <IconUser className="absolute sm:inset-0 md:inset-2 lg:inset-7 stroke-black sm:w-[8rem] sm:h-[8rem]  md:w-[10rem] md:h-[10rem] self-center"></IconUser>
                </div>

                {/* details */}
                <div className="flex flex-col items-center col-span-2">
                    {/* Edit button */}
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.125, ease: "easeInOut" }}
                        className="bg-[#fffbee] outline-2 outline-[#fb6c53] cursor-pointer px-3 py-1 rounded-md text-sm font-serif font-medium mt-4 lg:text-base"
                        onClick={() => setEdit(true)}
                    >
                        Edit Profile
                    </motion.button>

                    {/* Save/Cancel buttons */}
                    {edit && (
                        <div className="flex gap-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.125, ease: "easeInOut" }}
                                className="bg-[#fffbee] outline-2 outline-[#fb6c53] cursor-pointer  px-3 py-1 rounded-md text-sm font-serif font-medium"
                                onClick={handleSave}
                            >
                                Save
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.125, ease: "easeInOut" }}
                                className="bg-[#fffbee] outline-2 outline-[#fb6c53] cursor-pointer  px-3 py-1 rounded-md text-sm font-serif font-medium"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    )}

                    {/* user info form */}
                    <UserEmailProfile
                        edit={edit}
                        nameVal={changes.username ?? ""}
                        emailVal={changes.email ?? ""}
                        setOnChange={handleChange}
                    />

                    {/* Logout button */}
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.125, ease: "easeInOut" }}
                        className="mt-6 flex items-center gap-2 px-3 py-1 rounded-md text-sm font-serif font-medium bg-[#fffbee] hover:bg-[#fb6c53] outline-2  hover:text-[#fffbee] outline-[#fb6c53]  "
                        onClick={onClickLogout}
                    >
                        Log Out
                        <img src="/logout.svg" alt="logout icon" className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}