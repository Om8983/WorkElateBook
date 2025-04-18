import { motion } from "motion/react"

export default function Hover({ position }: { position: { width: number, opacity: number, left: number } }) {

    return (
        <>
            <motion.div
                animate={{ ...position, padding: 2 }}
                className="z-0 absolute h-5 rounded-md bg-[#fffff3]"
            />
        </>

    )
}