import { useState } from "react";

import { HiHome } from "react-icons/hi";
import { BiSolidGridAlt } from "react-icons/bi";
import { GoHeartFill } from "react-icons/go";

export default function NavBar() {
    const [active, setActive] = useState("home");
    
    return (
        <>
        <nav className=" h-13 w-full fixed bottom-0 bg-black pb-1 drop-shadow-[0_-1px_10px_rgba(255,255,255,0.1)]">
            <div className=" h-full w-full flex gap-2 text-white justify-center items-center">

                <a href="#" className={`w-10 h-10  flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 ${ active === "home" ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-amber-50 before:absolute before:rounded-t-full" : "before:scale-0" }`}
                onClick={() => setActive("home")}
                >
                    <HiHome className="w-6 h-6"/>
                </a>

                <a href="#" className={`w-10 h-10  flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 ${ active === "grid" ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-amber-200 before:absolute before:rounded-t-full" : "before:scale-0" }`}
                onClick={() => setActive("grid")}
                >
                    <BiSolidGridAlt className="w-6 h-6 text-amber-200" />
                </a>

                <a href="#" className={`w-10 h-10  flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 ${ active === "donate" ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-red-400 before:absolute before:rounded-t-full" : "before:scale-0" }`}
                onClick={() => setActive("donate")}
                >
                    <GoHeartFill className="w-6 h-6 text-red-400" />
                </a>

            </div>
        </nav>
        </>
    )
}