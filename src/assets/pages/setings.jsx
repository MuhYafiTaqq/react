import { useLocation } from "react-router-dom";

export default function Setings() {
    const location = useLocation();
    const image = location.state?.image; // Ambil data dari state

    return (
        <div className="h-dvh flex flex-col justify-center items-center">
            <h1 className="text-white text-lg mb-4">Crop Your Image</h1>
            {image ? (
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
                <p className="text-white">No image selected</p>
            )}
        </div>
    );
}
