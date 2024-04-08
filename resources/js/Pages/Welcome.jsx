import { Link, Head } from '@inertiajs/react';
import Lottie from "lottie-react";
import car from "../../lotties/car.json";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Rental Mobil" />
            <div className="bg-gray-100 min-h-screen">
                <nav className="bg-white shadow-sm sticky top-0 flex justify-between items-center px-0 md:px-16 py-2 z-10">
                    <h4 className="p-3 font-semibold">Rental Mobil</h4>
                    <div className="flex gap-x-3">
                        <Link href="/login" className="p-3">Login</Link>
                        <Link href="/register" className="p-3">Daftar</Link>
                    </div>
                </nav>
                <div className="px-0 md:px-16 py-4">
                    <div className="flex justify-center items-center">
                        <Lottie animationData={car} loop={true} width={300} height={300} />
                    </div>
                </div>
            </div>
        </>
    );
}
