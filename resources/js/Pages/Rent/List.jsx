import RentItem from '@/Components/RentItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function RentList({ auth, data }) {

    const returnCar = (item) => {
        if (window.confirm(`Kembalikan mobil ${item?.car?.name} ?`)) {
            router.patch(`/rent/${item?.id}`);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Sewa Mobil</h2>}
        >
            <Head title="Daftar Sewa Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-transparent overflow-hidden">
                        <ul className="flex flex-col gap-y-2">
                            {data?.map(item => (
                                <RentItem item={item} key={item?.id} returnCar={returnCar} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
