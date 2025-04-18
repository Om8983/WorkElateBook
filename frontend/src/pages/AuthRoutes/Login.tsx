import { LoginSchema } from "@om_wadhi/validation"
import { motion } from "motion/react"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import { InputBox } from "../../components/InputBox"
import { GoogleButton } from "../../components/GoogleButton"
import { Button } from "../../components/Button"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setUserLogin } from "../../redux/userSlice"

export const Login = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const navigate = useNavigate();
  const RedirectLogin = () => {
    navigate('/signup')
  }
  
  
  const handleLogin = async () => {
    let userDetails: LoginSchema = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, userDetails, { withCredentials: true })
      if (response.status === 200) {
        toast.success("User Login Success!!")
        dispatch(setUserLogin({userLogin : true}))
        navigate("/discover")
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 403) {
          toast('Invalid Credentials!!')
        } else if (e.response?.status === 404) {
          toast.error("User Doesn't Exist. Please Login!! ")
          navigate("/login")
        } else {
          toast.error("Internal Server Error. Please Try Again!")
        }
      }
    }
  }
  const variant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  }



  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#fffff3]">
        <div className="relative bg-white lg:grid lg:grid-cols-6 lg:gap-32  lg:w-[75rem] lg:rounded-xl lg:p-6 lg:border-4  lg:border-[#d0d0d0]">
          <motion.div animate={{ scale: [1.1, 1.6, 1.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute pointer-events-none -z-0  inset-0 sm:right-5 sm:top-10 md:left-1/3 lg:left-25 lg:top-45  mix-blend-multiply blur-xl   opacity-50 bg-[#ff846e] w-72 h-72 rounded-full"></motion.div>
          <motion.div animate={{ scale: [1.1, 1.4, 1.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", }} className="absolute pointer-events-none -z-0 inset-0 sm:left-15 sm:top-35 md:left-1/4 lg:left-50 lg:top-65  mix-blend-multiply  blur-xl  opacity-50 bg-[#6431fa] w-72 h-72 rounded-full"></motion.div>
          <div className="flex col-span-3 flex-col sm:mt-25 justify-center items-center gap-3  z-50">
            <div className="flex flex-col gap-2 mb-7">
              <motion.h1 variants={variant} initial={'initial'} animate={"animate"} className="text-center font-semibold text-4xl font-[myfont] text-black ">
                Login To Your Account
              </motion.h1>
              <motion.p variants={variant} initial={'initial'} animate={"animate"} className="text-center inline-block ">
                Don't have an account ?
                <span className=" inline-block pl-2 cursor-pointer  underline " onClick={() => RedirectLogin()} >
                  Sign Up
                  <img className="inline-block w-4 h-4 ml-1 pb-[2px]" src="/redirect.svg" alt="redirectImg" />
                </span>
              </motion.p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <motion.label variants={variant} initial={'initial'} animate={"animate"} htmlFor="email" >
                  Email
                </motion.label>
                <InputBox
                  type="email"
                  setValue={setEmail}
                  id="email"
                  placeholder="example@gmail.com"></InputBox>

              </div>

              <div className="flex flex-col">
                <motion.label variants={variant} initial={'initial'} animate={"animate"}
                  htmlFor="password">
                  Password
                </motion.label>
                <InputBox
                  type="password"
                  setValue={setPassword}
                  id="password"
                  placeholder="********"></InputBox>
              </div>
            </div>

            <Button onclick={handleLogin} className="mt-4" text="Login"></Button>
            <div className="flex flex-col gap-8 mt-3">
              <div className="flex items-center">
                <span className="w-20 h-[0.05rem] bg-black" />
                <span className=" text-sm px-4 text-black"> OR</span>
                <span className="w-20 h-[0.05rem] bg-black" />
              </div>
              <div>
                <GoogleButton accType="Login" />
              </div>
            </div>
          </div>
          <img className="hidden lg:block  lg:col-span-3 lg:w-[50rem] lg:h-[40rem] lg:rounded-2xl" src="/loginImg.jpg" alt="loginImg" />
        </div>
      </div>
    </>
  )
}
