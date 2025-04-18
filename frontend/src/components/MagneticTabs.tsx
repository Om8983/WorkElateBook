import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react"
import { motion } from "motion/react";
import { useRef, useState } from "react"


type Image = {
    imgName: string,
    imgLink: string,
    imgTag: React.ReactNode
}
export default function MagneticTabs() {
    const imgArr: Image[] = [
        {
            imgName: "X",
            imgLink: "https://x.com/om_wadhi",
            imgTag: <IconBrandTwitter className=" size-9"></IconBrandTwitter>
        },

        {
            imgName: "Instagram",
            imgLink: "https://www.instagram.com/_om_wadhi64/",
            imgTag: <IconBrandInstagram className=" size-9"></IconBrandInstagram>
        },
        {
            imgName: "Youtube",
            imgLink: "https://youtube.com",
            imgTag: <IconBrandYoutube className=" size-9"></IconBrandYoutube>
        },
        {
            imgName: "LinkedIn",
            imgLink: "https://www.linkedin.com/in/om-wadhi-024824251/",
            imgTag: <IconBrandLinkedin className=" size-9"></IconBrandLinkedin>
        },
        {
            imgName: "Facebook",
            imgLink: "https://facebook.com",
            imgTag: <IconBrandFacebook className="stroke-black size-9"></IconBrandFacebook>
        }
    ]
    return (
        <>
            <div className="   flex justify-center items-center  ">
                {
                    imgArr.map((imgObj) => {
                        return <Links key={imgObj.imgName} children={imgObj}></Links>
                    })
                }
            </div>
        </>
    )
}

function Links({ children }: { children: Image }) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })
    return (
        <>
            <motion.div
                onMouseMove={(e) => {
                    const { clientX, clientY } = e
                    // left also called "x" and top also called "y" just to avoid name similarity i defined them as left top
                    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 }
                    // const horizontalCenter = bounds.left + bounds.width / 2
                    // const verticalCenter = bounds.top + bounds.height / 2

                    const x = clientX - bounds.left - bounds.width / 2
                    const y = clientY - bounds.top - bounds.height / 2
                    setPosition({ x, y })
                }}
                onMouseLeave={() => setPosition({ x: 0, y: 0 })}
                ref={ref}
                animate={{ ...position }}
                transition={{type : "spring", damping : 10, stiffness : 150, mass : 0.1}}
                className="flex justify-center items-center cursor-pointer size-16"
            >
                <a href={children.imgLink}  >  {children.imgTag}</a>
            </motion.div>
        </>
    )
}