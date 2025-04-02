import Header from "../components/Header";
import { useState } from "react";
import gopayz from '../icon/Gopay.jpg'

export default function Donations() {
    const [ gopay, setGopay] = useState(false);
    return (
        <>
        <Header />
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold text-white mb-4">Dukung Kami</h1>
                <p className="text-white text-center max-w-lg mb-6">
                    Anda dapat berdonasi melalui platform berikut:
                </p>

                <div className="flex flex-col gap-4">
                    {/* Tombol Donasi */}
                    <a 
                        href="https://sociabuzz.com/yafi_taqi/tribe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-80"
                    >
                        ❤️ Donasi via Sosiabuzz
                    </a>

                    <a 
                        href="https://link.dana.id/minta/2vsyc3484qo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-400 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-80"
                    >
                        ☕ Donasi via Dana
                    </a>

                    <button 
                        rel="noopener noreferrer"
                        className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-80"
                        onClick={() => setGopay(!gopay)}
                    >
                        💳 Donasi via gopay <br />
                        <div>
                            <img src={gopayz} alt="" className={`mt-3 ${gopay ? "block" : "hidden"}`} />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
