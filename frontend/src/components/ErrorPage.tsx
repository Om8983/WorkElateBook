import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" flex h-screen justify-center items-center bg-[#fffff3]">
                <div className=" flex flex-col bg-[#fb6c53] p-5 rounded-lg justify-center items-center">
                    <h1 className="text-4xl font-semibold text-[#fffff3] rounded-md p-4 font-serif">Uh..Oh..!!! Please Try Re-Login</h1>
                    <button onClick={() => navigate("/login")} className=" font-serif font-medium p-2 rounded-xl hover:bg-[#fffff3] hover:text-[#fb6c53] ring-1 ring-[#fffff3] transition-transform ease-in-out hover:scale-110 text-[#fffff3] "> Re-Login </button>
                </div>
            </div>
        </>
    )
}