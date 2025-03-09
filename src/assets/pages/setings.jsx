import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";

export default function Setings() {
    const location = useLocation();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [gridCols, setGridCols] = useState(1);
    const [gridRows, setGridRows] = useState(1);
    const [cropMode, setCropMode] = useState("custom"); // NEW: Menyimpan mode pemotongan
    const prevRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [croppedImages, setCroppedImages] = useState([]);
    const handleAddColumn = () => setGridCols(gridCols + 1);
    const handleRemoveColumn = () => gridCols > 1 && setGridCols(gridCols - 1);
    const handleAddRow = () => setGridRows(gridRows + 1);
    const handleRemoveRow = () => gridRows > 1 && setGridRows(gridRows - 1);
    
    useEffect(() => {
        if (prevRef.current) {
            setHeight(prevRef.current.clientHeight);
            setWidth(prevRef.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        if (location.state && location.state.image) {
            setImgSrc(location.state.image);
        }
    }, [location]);

    useEffect(() => {
        if (cropMode === "carousel") {
            setGridRows(1); // Paksa satu baris untuk mode carousel
        }
    }, [cropMode]);

    useEffect(() => {
        if (imgSrc) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = imgSrc;
            img.onload = function () {
                let aspectRatio = img.width / img.height;
                let adjustedWidth = width;
                let adjustedHeight = adjustedWidth / aspectRatio;

                if (adjustedHeight > height) {
                    adjustedHeight = height;
                    adjustedWidth = adjustedHeight * aspectRatio;
                }

                canvas.width = adjustedWidth;
                canvas.height = adjustedHeight;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                drawGrid(ctx, canvas);
            };
        }
    }, [imgSrc, gridCols, gridRows]);

    useEffect(() => {
        if (imgSrc) {
            resetGrid();
            updateCanvas();
        }
    }, [imgSrc, gridCols, gridRows, cropMode]);

    const resetGrid = () => {
        if (cropMode === "grid") {
            setGridCols(1);
        }
        // setGridRows(1);
    };

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            let aspectRatio = img.width / img.height;
            let adjustedWidth = width;
            let adjustedHeight = adjustedWidth / aspectRatio;

            if (adjustedHeight > height) {
                adjustedHeight = height;
                adjustedWidth = adjustedHeight * aspectRatio;
            }

            canvas.width = adjustedWidth;
            canvas.height = adjustedHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawGrid(ctx, canvas);
        };
    };

    const drawGrid = (ctx, canvas) => {
        let cellWidth = canvas.width / gridCols;
        let cellHeight = canvas.height / gridRows;
        
        let startY = 0;
        if (cropMode === "grid") {
            cellWidth = canvas.width;
            cellHeight = (canvas.width * 1440) / 3312; // Sesuai rasio 3312:1440

            let totalHeight = cellHeight * gridRows;
            if (totalHeight > canvas.height) {
                startY = (canvas.height - totalHeight) / 2;
            }
        } else {
            cellWidth = canvas.width / gridCols;
            cellHeight = canvas.height / gridRows;
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridRows; j++) {
                ctx.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    };


    const handleCrop = () => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            let originalWidth = img.width;
            let originalHeight = img.height;
            let croppedData = [];

            if (cropMode === "grid") {
                let blockWidth = img.width;
                let blockHeight = (img.width * 1440) / 3312;
                let adjustedBlockHeight = Math.min((blockHeight * 1350) / 1440, img.height);
                let cropWidth = blockWidth / 3;
                let cropHeight = adjustedBlockHeight;

                let totalHeight = blockHeight * gridRows;
                let startY = Math.max((img.height - totalHeight) / 2, 0);

                for (let j = 0; j < gridRows; j++) {
                    for (let i = 0; i < 3; i++) {
                        let cropCanvas = document.createElement("canvas");
                        let cropCtx = cropCanvas.getContext("2d");
                        cropCanvas.width = cropWidth;
                        cropCanvas.height = cropHeight;
                
                        let startX = i * cropWidth;
                        
                        cropCtx.drawImage(img,
                            startX, startY + j * blockHeight,
                            cropWidth, cropHeight,
                            0, 0, cropWidth, cropHeight
                        );
                
                        croppedData.push(cropCanvas.toDataURL("image/png"));
                    }
                }
                
            }
            else if (cropMode === "custom") {
                // MODE CUSTOM: Memotong dengan grid
                let cellWidth = originalWidth / gridCols;
                let cellHeight = originalHeight / gridRows;

                for (let i = 0; i < gridCols; i++) {
                    for (let j = 0; j < gridRows; j++) {
                        let cropCanvas = document.createElement("canvas");
                        let cropCtx = cropCanvas.getContext("2d");
                        cropCanvas.width = cellWidth;
                        cropCanvas.height = cellHeight;

                        cropCtx.drawImage(
                            img,
                            i * cellWidth, j * cellHeight,
                            cellWidth, cellHeight,
                            0, 0, cellWidth, cellHeight
                        );

                        croppedData.push(cropCanvas.toDataURL("image/png"));
                    }
                }
            }
            else if (cropMode === "carousel") {
                // MODE CAROUSEL: Memotong hanya ke kanan
                let slideWidth = originalWidth / gridCols;
                let slideHeight = originalHeight; // Tinggi tetap penuh

                for (let i = 0; i < gridCols; i++) {
                    let cropCanvas = document.createElement("canvas");
                    let cropCtx = cropCanvas.getContext("2d");
                    cropCanvas.width = slideWidth;
                    cropCanvas.height = slideHeight;

                    cropCtx.drawImage(
                        img,
                        i * slideWidth, 0,
                        slideWidth, slideHeight,
                        0, 0, slideWidth, slideHeight
                    );

                    croppedData.push(cropCanvas.toDataURL("image/png"));
                }
            }


            setCroppedImages(croppedData);
            navigate("/result", { state: { croppedImages: croppedData } });
        };
    };

    return (
        <>
            <Header />
            <div className="h-dvh pt-6 pb-13">
                <div ref={prevRef} className="flex flex-col justify-center mx-2 h-3/4 items-center border-2 border-amber-100">
                    <canvas ref={canvasRef} className="border-2 border-black"></canvas>
                </div>
                <div className="h-1/4 w-full border-2 border-amber-600">
                    <div className="flex space-x-4 mb-4">
                        <button onClick={() => { setCropMode("custom"); resetGrid(); }} 
                            className={`px-4 py-2 rounded ${cropMode === "custom" ? "bg-blue-600 text-white" : "bg-gray-400 text-black"}`}>
                            Custom
                        </button>
                        <button onClick={() => { setCropMode("carousel"); resetGrid(); }} 
                            className={`px-4 py-2 rounded ${cropMode === "carousel" ? "bg-blue-600 text-white" : "bg-gray-400 text-black"}`}>
                            Carousel
                        </button>
                        <button onClick={() => { setCropMode("grid"); resetGrid(); }} 
                            className={`px-4 py-2 rounded ${cropMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-400 text-black"}`}>
                            Grid
                        </button>
                    </div>
                    <div className="flex">
                        <button onClick={handleAddColumn} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Tambah ke Kanan</button>
                        <button onClick={handleRemoveColumn} className="bg-red-500 text-white px-4 py-2 rounded mb-2">Kurangi ke Kanan</button>
                    </div>
                    <div className="flex">
                        {(cropMode === "custom" || cropMode === "grid") && (
                        <>
                            <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                                Tambah ke Bawah
                            </button>
                            <button onClick={handleRemoveRow} className="bg-red-500 text-white px-4 py-2 rounded mb-2">
                                Kurangi ke Bawah
                            </button>
                        </>
)}
                    </div>
                    <button onClick={handleCrop} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Potong Gambar</button>
                </div>
            </div>
        </>
    );
} 