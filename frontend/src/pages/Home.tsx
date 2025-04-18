// import { NavBar } from "../components/Navbar/NavBar"

// export const Home = () => {
//   return (
//     <div
//       className=" lg:inset-0 h-screen w-full items-center lg:px-5 lg:py-18 bg-[#fb6c53]">
//         <NavBar></NavBar>
//         <div className="md:grid md:grid-cols-12 ">
//           {/* main taglines */}
//           <div>
//             <h1 className="flex items-center mt-[10rem]  text-4xl font-bold text-[#faf9f6] lg:grid-cols-7 text-left">Where Readers Speak & Stories Shine.</h1>
//           </div>
//           {/* main img */}
//           <div></div>
//         </div>

//     </div>
//   )
// }

import { useNavigate } from "react-router-dom"
import { motion } from "motion/react";
import { NavBar } from "../components/Navbar/NavBar";
import MagneticTabs from "../components/MagneticTabs";
import { useRef } from "react";
export const Home = () => {
  const title = "Where Readers Speak & Stories Shine."
  const subtitle = "Because books deserve more than stars."

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }

  const contactRef = useRef<HTMLLIElement | null>(null)
  const scrollToContacts = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <NavBar scroll={scrollToContacts}/>
      {/* div of grid having 2 cols on large screen, one side text other side image */}
      <section className=" lg:grid lg:grid-cols-2 w-screen h-screen bg-[#fb6c53] ">
        {/* div containing contents  */}
        <motion.div
          initial="initial"
          animate="animate"
          className=" pt-[9rem] md:pt-[12rem] lg:pt-[14.5rem] ml-4 lg:ml-[8rem]"
        >
          {/* the first h1 will be visible to screen-reader only "sr-only", but the other h1 won't be visible to screen-readers. While this is the opposite of how the user sees. The user would see the other h1 but won't be able to visit the first h1 */}
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="text-7xl md:text-8xl font-[boy] font-bold ">
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[#faf9f6] text-2xl font-[boy] ">
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className=" pt-5 ">
            <button
              className="w-[170px] h-[40px] text-xl text-black bg-white bg-opacity-40 font-[boy] outline-none border-2 border-black rounded-2xl p-1 transition ease-in-out delay-100 hover:scale-110 hover:bg-black hover:text-white"
              onClick={handleClick}>
              Let's Begin
            </button>
          </motion.div>
        </motion.div>
        {/* img  */}

      </section>

      {/* most rated books from backend */}
      {/* need to fix the height as per the books total 8books to be mentioned only  */}
      <section className="h-fit sm:px-5 bg-[#fb6c53]">
        <div className="w-full sm:h-[40rem] lg:h-[48rem] rounded-2xl sm:px-4 sm:pt-5 bg-[#fffbee]">
          <div className=" flex justify-center items-center gap-x-0.5 text-xl font-medium ">Most <span className="font-bold text-2xl font-[boy] text-[#fb6c53]">Rated</span> <span className="w-full h-[1px] bg-[#fb6c53]"></span></div>
        </div>
      </section>
      {/* contacts page */}
      <section ref={contactRef} className="sm:h-[8rem] pt-5 sm:px-5 bg-[#fb6c53] w-full">
        <div className="w-full sm:h-[6rem]  flex flex-col justify-center items-center rounded-2xl sm:px-4  bg-[#fffbee]">
          <div className="flex w-full justify-ceter items-center gap-2 sm:font-medium sm:text-xl">
            <span className="w-full  h-[1px] bg-[#fb6c53]"></span>
            Contacts
            <span className="w-full h-[1px] bg-[#fb6c53]"></span></div>
          <MagneticTabs></MagneticTabs>
        </div>
      </section>
    </>
  )
}