
import { useNavigate } from "react-router-dom"
import { InputBox } from "../../components/InputBox"
import axios, { AxiosError } from "axios"
import { SignUpSchema } from "@om_wadhi/validation"
import { useState } from "react"
import { motion } from "motion/react"
import { GoogleButton } from "../../components/GoogleButton"
import { Button } from "../../components/Button"
import { BACKEND_URL } from "../../config"
import { toast } from "sonner"
export const Signup = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, SetPass] = useState<string>("")

  const navigate = useNavigate();
  //login redirect
  const RedirectLogin = () => {
    navigate('/login')
  }
  // sending backend request
  const handleSignup = async () => {
    let newUser: SignUpSchema = {
      username, email, password
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, newUser, { withCredentials: true })
      if (response.status === 200) {
        toast("User SignUp SuccessFull !!")
        navigate("/books")
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 403) {
          toast.error("Invalid Credentials!")
        } else if (e.response?.status === 409) {
          toast.warning("User Already exist! Please Login")
          navigate("/login")
        } else {
          toast.error("Internal Server Error!")
        }
      }
    }
  }
  const variant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative lg:grid lg:grid-cols-6 lg:gap-32  lg:w-[75rem] lg:rounded-xl lg:p-6 lg:border-4  lg:border-[#d0d0d0]">
        <motion.div animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -z-10 inset-0 sm:right-5 sm:top-10 lg:left-25 lg:top-45 mix-blend-multiply blur-xl  md:left-1/3   opacity-50 bg-[#ff846e] w-72 h-72 rounded-full"></motion.div>
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", }} className="absolute -z-10 inset-0 sm:left-15 sm:top-35 lg:left-50 lg:top-65 mix-blend-multiply  blur-xl  md:left-1/4  opacity-50 bg-[#6431fa] w-72 h-72 rounded-full"></motion.div>
        <div className="flex flex-col col-span-3 justify-center sm:mt-15  items-center gap-3">
          <div className="flex flex-col gap-2 mb-7">
            <motion.h1
              variants={variant}
              initial={"initial"}
              animate={"animate"}
              className="text-center font-semibold text-4xl font-[myfont] text-black  ">Create An Account</motion.h1>
            <motion.p
              variants={variant}
              initial={"initial"}
              animate={"animate"}
              className="text-center inline-block">Already have an account ?
              <span className="inline-block  pl-2 cursor-pointer underline " onClick={() => RedirectLogin()} >Login
                <img className="inline-block w-4 h-4 ml-1 pb-[2px]" src="/redirect.svg" alt="redirectimg" />
              </span>
            </motion.p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <motion.label
                variants={variant}
                initial={"initial"}
                animate={"animate"}
                htmlFor="username"
              >
                Username</motion.label>
              <InputBox
                type="text"
                setValue={setUsername}
                id="username"
                placeholder="Enter Your Username"></InputBox>
            </div>

            <div className="flex flex-col">
              <motion.label
                variants={variant}
                initial={"initial"}
                animate={"animate"}
                htmlFor="email"
              >
                Email</motion.label>
              <InputBox
                type="email"
                setValue={setEmail}
                id="email"
                placeholder="example@gmail.com"></InputBox>
            </div>

            <div className="flex flex-col">
              <motion.label
                variants={variant}
                initial={"initial"}
                animate={"animate"}
                htmlFor="password"
              >
                Password</motion.label>
              <InputBox
                type="password"
                setValue={SetPass}
                id="password"
                placeholder="********"></InputBox>
            </div>
          </div>

          <Button
            onclick={handleSignup}
            className="mt-4"
            text="Sign Up"></Button>
          <div className="flex flex-col gap-8 mt-3">
            <div className="flex items-center">
              <span className="w-20 h-[0.05rem] bg-white " />
              <span className=" text-sm px-4 text-white "> OR</span>
              <span className="w-20 h-[0.05rem] bg-white " />
            </div>
            <div>
              <GoogleButton accType="SignUp" />
            </div>
          </div>
        </div>

        <img className="hidden lg:block lg:col-span-3 lg:w-[50rem] lg:h-[40rem] lg:rounded-2xl " src="7450190.jpg" alt="signupImg" />

      </div >
    </div>
  )
}
