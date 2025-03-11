import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { LuRows3 } from "react-icons/lu";

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
        
        let aspectRatio = 1440 / 3312; // Rasio asli (lebar : tinggi)
        
        let cellWidth, cellHeight;
        let startX = 0, startY = 0;
    
        if (cropMode === "grid") {
            // Hitung ukuran sel berdasarkan aspek rasio
            cellWidth = canvas.width / gridCols;
            cellHeight = cellWidth * aspectRatio;
    
            let totalWidth = cellWidth * gridCols;
            let totalHeight = cellHeight * gridRows;
    
            // Jika total tinggi lebih besar dari canvas, sesuaikan ukuran grid
            if (totalHeight > canvas.height) {
                cellHeight = canvas.height / gridRows;
                cellWidth = cellHeight / aspectRatio;
            }
    
            totalWidth = cellWidth * gridCols;
            totalHeight = cellHeight * gridRows;
    
            // Pusatkan grid di tengah-tengah canvas
            if (totalWidth < canvas.width) {
                startX = (canvas.width - totalWidth) / 2;
            }
            if (totalHeight < canvas.height) {
                startY = (canvas.height - totalHeight) / 2;
            }
        }
        else if (cropMode === "carousel") {
            aspectRatio = 4 / 5; // Rasio 4:5
            cellWidth = canvas.width / gridCols;
            cellHeight = cellWidth / aspectRatio; // Sesuaikan tinggi agar tetap 4:5

            let totalWidth = cellWidth * gridCols;
            let totalHeight = cellHeight;

            // **Cek apakah tinggi melebihi gambar asli, jika iya, sesuaikan**
            if (totalHeight > canvas.height) {
                cellHeight = canvas.height;
                cellWidth = cellHeight * aspectRatio;
            }

            totalWidth = cellWidth * gridCols;
            totalHeight = cellHeight;

            // **Hitung posisi awal crop agar grid tepat di tengah**
            startX = (canvas.width - totalWidth) / 2;
            startY = (canvas.height - totalHeight) / 2; // **Pusatkan secara vertikal**
        }
        else if (cropMode === "custom") {
            // **Mode custom: Potong sesuai jumlah kolom & baris user, tanpa aspek rasio khusus**
            cellWidth = canvas.width / gridCols;
            cellHeight = canvas.height / gridRows;
    
            // **Sesuaikan jika total ukuran melebihi gambar asli**
            let totalWidth = cellWidth * gridCols;
            let totalHeight = cellHeight * gridRows;
    
            if (totalWidth > canvas.width) {
                cellWidth = canvas.width / gridCols;
            }
            if (totalHeight > canvas.height) {
                cellHeight = canvas.height / gridRows;
            }
    
            startX = (canvas.width - (cellWidth * gridCols)) / 2;
            startY = (canvas.height - (cellHeight * gridRows)) / 2;
        }
    
        // 🔹 **Gambar Grid Sesuai Mode**
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
    
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridRows; j++) {
                let x = startX + i * cellWidth;
                let y = startY + j * cellHeight;
                ctx.strokeRect(x, y, cellWidth, cellHeight);
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
                let aspectRatio = 1440 / 3312; // Rasio asli (lebar : tinggi)
                let startX = 0, startY = 0;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
            
                // 🔹 Hitung skala antara ukuran asli dan ukuran canvas
                let scaleX = originalWidth / canvas.width;
                let scaleY = originalHeight / canvas.height;
            
                // 🔹 Hitung ukuran grid berdasarkan gambar asli
                let gridCellWidth = originalWidth / gridCols;
                let gridCellHeight = gridCellWidth * aspectRatio;
            
                let totalGridWidth = gridCellWidth * gridCols;
                let totalGridHeight = gridCellHeight * gridRows;
            
                if (totalGridHeight > originalHeight) {
                    gridCellHeight = originalHeight / gridRows;
                    gridCellWidth = gridCellHeight / aspectRatio;
                }
            
                totalGridWidth = gridCellWidth * gridCols;
                totalGridHeight = gridCellHeight * gridRows;
            
                // 🔹 Pusatkan grid dalam gambar asli
                if (totalGridWidth < originalWidth) {
                    startX = (originalWidth - totalGridWidth) / 2;
                }
                if (totalGridHeight < originalHeight) {
                    startY = (originalHeight - totalGridHeight) / 2;
                }
            
                for (let j = 0; j < gridRows; j++) {
                    for (let i = 0; i < gridCols; i++) {
                        let cropCanvas = document.createElement("canvas");
                        let cropCtx = cropCanvas.getContext("2d");
            
                        // 🔹 Hitung posisi crop berdasarkan gambar asli
                        let cropX = startX + i * gridCellWidth;
                        let cropY = startY + j * gridCellHeight;
            
                        cropCanvas.width = 3312; // Ukuran output tetap
                        cropCanvas.height = 1440;
            
                        cropCtx.drawImage(
                            img,
                            cropX, cropY, gridCellWidth, gridCellHeight, // **Crop area di gambar asli**
                            0, 0, 3105, 1350 // **Resize hasil crop ke 3312x1440**
                        );
            
                        // 🔹 **Bagi hasil crop menjadi 3 bagian**
                        let cropWidths = [0, 1013, 2025]; // Posisi kiri, tengah, kanan
                        for (let k = 0; k < 3; k++) {
                            let cropCanvas2 = document.createElement("canvas");
                            let cropCtx2 = cropCanvas2.getContext("2d");
            
                            cropCanvas2.width = 1080; // Ukuran output tetap
                            cropCanvas2.height = 1350;
            
                            cropCtx2.drawImage(
                                cropCanvas,
                                cropWidths[k], 0, 1080, 1350, // **Crop area di hasil grid**
                                0, 0, 1080, 1350 // **Resize hasil crop ke 1080x1350**
                            );
            
                            croppedData.push(cropCanvas2.toDataURL("image/png"));
                        }
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
                // MODE CAROUSEL: Memotong dari tengah dengan aspek rasio 4:5
                let targetWidth = 1080; // 4:5 aspect ratio (width)
                let targetHeight = 1350; // 4:5 aspect ratio (height)

                // Hitung total lebar dan tinggi hasil crop
                let totalCropWidth = gridCols * targetWidth;
                let totalCropHeight = targetHeight;

                // Hitung posisi awal cropping dari tengah gambar asli
                let startX = (originalWidth - totalCropWidth) / 2;
                let startY = (originalHeight - totalCropHeight) / 2;

                // **Jika grid lebih lebar dari gambar asli, sesuaikan ukuran crop**
                if (totalCropWidth > originalWidth) {
                    let scaleFactor = originalWidth / totalCropWidth;
                    targetWidth *= scaleFactor;
                    targetHeight *= scaleFactor;
                    startX = 0; // Mulai dari kiri
                }

                // **Jika tinggi crop lebih besar dari gambar asli, sesuaikan juga**
                if (targetHeight > originalHeight) {
                    let scaleFactor = originalHeight / targetHeight;
                    targetWidth *= scaleFactor;
                    targetHeight *= scaleFactor;
                    startY = 0; // Mulai dari atas
                }

                for (let i = 0; i < gridCols; i++) {
                    let cropCanvas = document.createElement("canvas");
                    let cropCtx = cropCanvas.getContext("2d");
                    
                    cropCanvas.width = 1080; // Ukuran output tetap 4:5
                    cropCanvas.height = 1350;

                    let cropX = startX + i * targetWidth; // Mulai crop dari tengah secara horizontal
                    let cropY = startY + (originalHeight - targetHeight) / 2; // **Fix: Crop benar-benar dari tengah vertikal**

                    cropCtx.drawImage(
                        img,
                        cropX, cropY, targetWidth, targetHeight, // **Crop area di gambar asli**
                        0, 0, 1080, 1350 // **Resize ke 1080x1350**
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
                <div ref={prevRef} className="flex flex-col justify-center mx-2 h-3/4 items-center">
                    <canvas ref={canvasRef} className="border-2 border-black"></canvas>
                </div>
                <div className="h-1/4 px-3 py-1 w-full">
                    <p className="flex items-center gap-2 text-white mb-1 text-sm">
                        <VscSettings className="h-4 w-4"/>
                        Type
                    </p>
                    <div className={`inline-flex p-0.5 mb-2 border-1 border-white rounded-full relative before:content-[''] before:absolute before:w-28 before:h-full before:bg-amber-50 before:top-0 before:rounded-full before:z-1 ${cropMode === "custom" ? "before:left-0" : cropMode === "grid" ? "before:right-0" : "before:right-25"}`}>
                        <button onClick={() => { setCropMode("custom"); resetGrid(); }} 
                            className={`text-sm z-2 w-25 px-4 rounded ${cropMode === "custom" ? "text-black font-bold" : "text-white"}`}>
                            Custom
                        </button>
                        <button onClick={() => { setCropMode("carousel"); resetGrid(); }} 
                            className={`text-sm z-2 w-25 px-4 rounded ${cropMode === "carousel" ? "text-black font-bold" : "text-white"}`}>
                            Carousel
                        </button>
                        <button onClick={() => { setCropMode("grid"); resetGrid(); }} 
                            className={`text-sm z-2 w-25 px-4 rounded ${cropMode === "grid" ? "text-black font-bold" : "text-white"}`}>
                            Grid
                        </button>
                    </div>

                    <div className={`flex ${cropMode != "grid" ? "gap-5" : "" }`}>
                        <div className="">
                            {(cropMode === "custom" || cropMode === "carousel") && (
                            <>
                                <p className="flex items-center gap-2 text-white mb-1 text-sm">
                                    <HiOutlineViewColumns className="h-4 w-4"/>
                                    Columns
                                </p>
                                <button onClick={handleRemoveColumn} className="text-lg bg-white text-black font-bold px-2 rounded-full mb-2">
                                    -
                                </button>
                                <h6 className="inline-flex text-white px-4">{gridCols}</h6>
                                <button onClick={handleAddColumn} className="text-lg bg-white text-black font-bold px-2 rounded-full mb-2">
                                    +
                                </button>
                            </>
                            )}
                        </div>

                        <div className="">
                            {(cropMode === "custom" || cropMode === "grid") && (
                            <>
                                <p className="flex items-center gap-2 text-white mb-1 text-sm">
                                    <LuRows3 className="w-4 h-4"/>
                                    Rows
                                </p>
                                <button onClick={handleRemoveRow} className="text-lg bg-white text-black font-bold px-2 rounded-full mb-2">
                                    -
                                </button>
                                <h6 className="inline-flex text-white px-4">{gridRows}</h6>
                                <button onClick={handleAddRow} className="text-lg bg-white text-black font-bold px-2 rounded-full mb-2">
                                    +
                                </button>
                            </>
                            )}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleCrop} className="mt-2 text-sm bg-green-700 font-bold border-2 border-green-800 text-white w-1/2 px-4 py-0.5 rounded-full">Potong Gambar</button>
                        <button onClick={() => navigate("/", { state : {
                            cols: gridCols,
                            rows: gridRows }})} className="mt-2 text-sm border-2 border-white text-white ml-5 w-1/3 px-4 py-0.5 rounded-full">Back</button>
                    </div>
                </div>
            </div>
        </>
    );
} 