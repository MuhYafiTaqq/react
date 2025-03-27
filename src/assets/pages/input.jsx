import Header from "../components/Header";
import imgStarShip from "../icon/starShip.svg";
import imgDocument from "../icon/document.svg";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Input() {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false); // 🟢 State untuk mendeteksi dragging
    const fileInputRef = useRef(null);
    const navigate = useNavigate(); 

    const handleFile = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageData = reader.result;
                setImage(imageData); 

                // 🚀 Langsung navigasi ke halaman crop
                navigate("/setings", { state: { image: imageData } });
            };
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true); // 🟢 Aktifkan efek saat dragging
    };

    const handleDragLeave = () => {
        setIsDragging(false); // 🔴 Hapus efek saat dragging selesai
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false); // 🔴 Hapus efek dragging
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    return (
        <div className="dark">
            <Header />
            <div className="h-dvh flex md:pl-25 flex-col justify-center items-center">
                <img src={imgStarShip} alt="starship" className="w-35 md:w-65 md:mb-15 mb-7" />

                <div 
                    className={`relative w-75 h-35 md:w-110 md:h-50 rounded-3xl border-3 border-dashed text-center ${
                        isDragging ? "border-blue-400 bg-blue-900/50" : "border-white/20 bg-neutral-700/50"
                    } flex flex-col justify-center items-center transition-all duration-300`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <img src={imgDocument} alt="" className="w-8 md:w-13 md:mb-7 invert mb-4" />
                    <h6 className="text-white md:text-xl text-sm font-bold mb-1">
                        {isDragging ? "Drop the file here" : "Drag or click to select a file"}
                    </h6>
                    <p className="text-white md:text-md text-xs opacity-50">
                        Supported format: PNG, JPG, JPEG
                    </p>

                    {/* Input file yang tersembunyi */}
                    <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        id="inputImg" 
                        onChange={handleFileChange}
                    />

                    {/* Preview gambar */}
                    {image && <img src={image} alt="Preview" className="w-40 h-40 object-cover mt-4" />}
                </div>
            </div>
        </div>
    );
}
