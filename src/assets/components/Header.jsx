import NavBar from "./NavBar";

export default function Header() {
    return (
        <>
        <header>
            <NavBar />
            <div>
                <p className="text-xs text-center text-white mt-1">Have some problem? <span><a href="#" className="underline hover:text-blue-400">Contact Me</a></span></p>
            </div>

        </header>

        </>
    )
}