import NavBar from "../fragment/NavBar";

export default function Header() {
    return (
        <>
        <header className="z-10">
            <NavBar />
            <div className="fixed pt-1 w-full bg-black">
                <p className="text-xs text-center text-white">Have some problem? <span><a href="#" className="underline hover:text-blue-400">Contact Me</a></span></p>
            </div>
        </header>

        </>
    )
}