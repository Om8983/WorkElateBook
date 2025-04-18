import { useState } from "react"
import Tabs from "./Tabs"
import Hover from "./Hover"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


export const Menu = ({ scrollTo }: { scrollTo: () => void }) => {
    const [position, setPosi] = useState({
        width: 0,
        opacity: 0,
        left: 0
    })

    const { userRole } = useSelector((state: any) => state.user)

    const navigate = useNavigate()
    const homeNav = () => {
        navigate("/")
    }
    console.log(userRole);
    
    return (
        <ul className=" relative hidden md:flex md:justify-center md:items-center md:gap-5 cursor-pointer "
            onMouseLeave={() => {
                setPosi((prev) => ({
                    ...prev, opacity: 0
                }))

            }}

        >
            {/* relative was given above so that when hovered, the bg color for text must come starting from the text itself else it would come from the extreme left  */}
            <Tabs onClickHandler={homeNav} setPosition={setPosi}>Home </Tabs>
            <Tabs onClickHandler={() => navigate("/discover")} setPosition={setPosi}>Discover </Tabs>
            <Tabs onClickHandler={scrollTo} setPosition={setPosi}>Contact </Tabs>
            {
                userRole === "Admin" &&
                <Tabs setPosition={setPosi}>Add Book </Tabs>
            }

            <Hover position={position}></Hover>
        </ul>
    )
}
