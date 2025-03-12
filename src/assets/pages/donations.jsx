import Header from "../components/Header";

export default function Donations() {
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
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-60"
                    >
                        ❤️ Donasi via Saweria
                    </a>

                    <a 
                        href="https://sociabuzz.com/yafi_taqi/tribe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-60"
                    >
                        ☕ Donasi via Trakteer
                    </a>

                    <a 
                        href="https://sociabuzz.com/yafi_taqi/tribe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold text-center w-60"
                    >
                        💳 Donasi via PayPal
                    </a>
                </div>
            </div>
        </>
    );
}
