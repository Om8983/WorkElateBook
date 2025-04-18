import { motion } from "motion/react";
import { useRef, useState } from "react";


type Prop = {
    svg?: React.ReactElement,
    children: string,
    setPosition: ({ width, opacity, left }: { width: number, opacity: number, left: number }) => void
    onClickHandler ?: () => void
}
export default function Tabs({ children, setPosition, svg, onClickHandler }: Prop) {
    const divRef = useRef<HTMLLIElement | null>(null)
    const [hovered, setHover] = useState(false)
    return (
        <motion.li
        onClick={onClickHandler}
            ref={divRef}
            onMouseEnter={() => {
                if (!divRef.current) return;
                const { width } = divRef.current.getBoundingClientRect()
                setPosition({ opacity: 1, width: width, left: divRef.current.offsetLeft })
                setHover(true)
            }}
            onMouseLeave={() => setHover(false)}
            className=" z-10 flex items-center gap-1 cursor-pointer lg:font-medium lg:px-3 text-center text-[#fffff3] hover:text-[#fb6c53] "
        >
            {children}
            {
                svg !== undefined &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                >
                    {svg}
                </motion.div>
            }

        </motion.li>
    )
}