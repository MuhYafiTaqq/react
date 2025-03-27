import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HiHome } from "react-icons/hi";
import { BiSolidGridAlt } from "react-icons/bi";
import { GoHeartFill } from "react-icons/go";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Untuk memantau perubahan path
    const [active, setActive] = useState("home");

    // 🔹 Perbarui active berdasarkan path saat route berubah
    useEffect(() => {
        if (location.pathname === "/") setActive("home");
        else if (location.pathname === "/grid") setActive("grid");
        else if (location.pathname === "/donations") setActive("donate");
    }, [location.pathname]);

    return (
        <>
            <nav className="h-13 w-full fixed bottom-0 bg-black pb-1 drop-shadow-[0_-1px_10px_rgba(255,255,255,0.1)]
            
            md:h-full md:left-0 md:w-18
            ">
                <div className="h-full w-full flex gap-2 text-white justify-center items-center
                
                md:flex-col
                ">

                    <button className={`w-10 h-10 flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 group
                    
                    md:w-14 md:h-14
                    ${
                        active === "home"
                            ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-amber-50 before:absolute before:rounded-t-full"
                            : "before:scale-0"
                    }
                    md:group-before:h-4
                    `}
                        onClick={() => navigate("/")}
                    >
                        <HiHome className="w-6 h-6 md:w-10 md:h-10" />
                    </button>

                    <button className={`w-10 h-10 flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 group
                    
                    md:w-14 md:h-14
                    ${
                        active === "grid"
                            ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-amber-200 before:absolute before:rounded-t-full"
                            : "before:scale-0"
                    }
                    md:group-before:bg-red-200
                    `}
                        onClick={() => navigate("/")}
                    >
                        <BiSolidGridAlt className="w-6 h-6 md:w-10 md:h-10 text-amber-200" />
                    </button>

                    <button className={`w-10 h-10 flex flex-col justify-center items-center rounded-xl relative hover:bg-white/20 transition-all duration-400 
                    
                    md:w-14 md:h-14
                    ${
                        active === "donate"
                            ? "bg-white/20 before:content-[''] before:scale-100 before:transition-all before:duration-400 before:-bottom-2 before:h-1 before:w-5 before:bg-red-400 before:absolute before:rounded-t-full"
                            : "before:scale-0"
                    }`}
                        onClick={() => navigate("/donations")}
                    >
                        <GoHeartFill className="w-6 h-6 md:w-10 md:h-10 text-red-400" />
                    </button>

                </div>
            </nav>
        </>
    );
}
