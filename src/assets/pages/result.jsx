import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import { FaDownload } from "react-icons/fa6";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const croppedImages = location.state?.croppedImages || [];

    return (
        <>
            <Header />
            <div className="h-dvh flex flex-col justify-center items-center z-1">
                <div className="grid pt-6 grid-cols-3 gap-1 h-4/5 p-2 border-2 border-amber-600">
                    {croppedImages.map((src, index) => (
                        <div key={index} className="flex flex-col items-center relative">
                            <img src={src} alt={`Cropped ${index + 1}`} className="border border-black" />
                            <a href={src} download={`cropped-${index + 1}.png`} className="bg-blue-500 right-2 top-0 absolute text-white px-2 py-1 rounded mt-2">
                                <FaDownload />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="border-2 border-amber-50 w-full h-1/5 flex pb-13">
                    <button 
                        onClick={() => navigate("/")} 
                        className="bg-gray-500 h-10 text-white px-4 py-2 rounded"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </>
    );
}
