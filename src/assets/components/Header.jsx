import NavBar from "./NavBar";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Header() {
    return (
        <>
        <header className="z-10">
            <NavBar />
            <div className="fixed pt-1 md:pl-25 w-full">
                <p className="text-xs md:text-lg text-center text-white">Have some problem? <span><a href="https://chat.whatsapp.com/JAXMVJAdtZWKZI41ioOKLW" className="underline hover:text-blue-400">Contact Me</a></span></p>
            </div>
            <div>
                <a href="https://chat.whatsapp.com/JAXMVJAdtZWKZI41ioOKLW">
                    <IoLogoWhatsapp className="absolute h-10 w-10 bottom-18 right-5 bg-white rounded-xl p-1 text-green-500
                    
                    md:h-13 md:w-13 md:right-18
                    " />
                </a>
            </div>
        </header>

        </>
    )
}