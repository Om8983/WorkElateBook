
import { useState } from "react"
import { Authbutton } from "./Authbutton"
import { Menu } from "./Menu"
import { useMotionValueEvent, useScroll } from "motion/react"
import { motion } from "motion/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "../Dropdown"
import { DropdownOpt } from "../DropdownOpt"
export const NavBar = ({ scroll }: { scroll?: () => void }) => {
    const [drop, setDrop] = useState(false)
    const { scrollY } = useScroll();
    const [diff, setDiff] = useState("up")
    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = scrollY.getPrevious()!
        latest > prev && latest > 50 ? setDiff("down") : setDiff("up")
    })
    const { userLogin } = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    const handleLogout = () => {

    }
    return (
        <>
            {/*  <div className={` flex justify-around text-white ${className}`}> */}

            <motion.div className={` flex justify-around h-[60px] fixed items-center w-full text-[#faf9f6] hover:text-[#fb6c53] top-0 left-0 z-50 bg-[#fb6c53]  `}
                variants={{
                    hidden: { y: -100 },
                    visible: { y: 0 }
                }}
                initial={"visible"}
                animate={diff == "up" ? "visible" : "hidden"}
                transition={{
                    duration: 0.35,
                    ease: "easeInOut"
                }}
                layout
            >
                <div className=" text-3xl font-bold text-[#faf9f6] ">
                    Ravely.
                </div>
                <Menu scrollTo={scroll!}></Menu>
                {
                    userLogin ?
                        <li>
                            <Dropdown onClick={() => setDrop(!drop)} />
                            <div >
                                <div className={` ${drop ? "transition transform duration-150 ease-in-out scale-100 " : " opacity-0 scale-0"} absolute w-screen h-screen bg-transparent backdrop-blur-lg  right-0 top-0  `} >
                                    <button className="absolute top-6 right-6 w-8 h-8 transition-transform hover:scale-110" onClick={() => setDrop(!drop)}> <img src="/dropclose.svg" alt="closesvg" /></button>

                                    <div className="flex flex-col gap-3 justify-center items-center h-screen">
                                        <DropdownOpt onclick={() => navigate("/userProfile")} text="Home" svg="/home.svg" />
                                        <DropdownOpt onclick={() => navigate("/editor")} text="UserProfile" svg="/user.svg" className="md:hidden" />
                                        <DropdownOpt onclick={handleLogout} text="Log Out" svg="/logout.svg" />
                                    </div>
                                </div>
                            </div>
                        </li>
                        :
                        <Authbutton></Authbutton>
                }
            </motion.div>
        </>
    )
}
