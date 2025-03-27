import NavBar from "./NavBar";

export default function Header() {
    return (
        <>
        <header className="z-10">
            <NavBar />
            <div className="fixed pt-1 md:pl-25 w-full">
                <p className="text-xs md:text-lg text-center text-white">Have some problem? <span><a href="#" className="underline hover:text-blue-400">Contact Me</a></span></p>
            </div>
        </header>

        </>
    )
}