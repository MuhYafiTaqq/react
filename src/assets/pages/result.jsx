import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import { FaDownload } from "react-icons/fa6";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { croppedImages = [] } = location.state || [];

    return (
        <>
            <Header />
            <div className="min-h-dvh flex flex-col justify-center items-center z-1">
                <div className={`grid pt-6 text-center grid-cols-3 gap-1 min-h-4/5 p-2`}>
                    {croppedImages.map((src, index) => (
                        <div key={index} className="flex flex-col items-center relative">
                            <img src={src} alt={`Cropped ${index + 1}`} className="border border-black" />
                            <a href={src} download={`cropped-${index + 1}.png`} className="bg-blue-500 right-2 top-0 absolute text-white px-2 py-1 rounded mt-2">
                                <FaDownload />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="text-center px-2 w-full h-50 flex flex-col pb-13 border-t-1 pt-2 border-t-white ">
                    <h6 className="text-white font-bold text-xl">Here The Result</h6>
                    <div className="flex w-full mb-2 mt-4 gap-2">
                        <button 
                            onClick={() => navigate("/")} 
                            className="border-2 border-white h-10 w-1/2 text-white px-4 py-2 rounded-full"
                        >
                            Restart
                        </button>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="border-2 border-white w-1/2 h-10 text-white px-4 py-2 rounded-full"
                        >
                            Kembali
                        </button>
                    </div>
                    <button 
                        onClick={() => navigate("/donations")} 
                        className="bg-red-400 h-10 text-white px-4 py-2 rounded-full"
                    >
                        Donations
                    </button>
                </div>
            </div>
        </>
    );
}
