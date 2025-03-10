import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const croppedImages = location.state?.croppedImages || [];

    return (
        <>
            <Header />
            <div className="h-dvh mt-5 pb-13 flex flex-col items-center">
                <h2 className="text-lg text-white font-bold mb-4">Hasil Potongan Gambar</h2>
                <div className="grid grid-cols-3 gap-4 p-2 border-2 border-amber-600">
                    {croppedImages.map((src, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img src={src} alt={`Cropped ${index + 1}`} className="border border-black" />
                            <a href={src} download={`cropped-${index + 1}.png`} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
                                Download
                            </a>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => navigate("/")} 
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                >
                    Kembali
                </button>
            </div>
        </>
    );
}
