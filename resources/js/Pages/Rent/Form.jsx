import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formattedNumber } from '@/utils/helper';
import { Head, router, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IoArrowBack, IoCheckmark, IoPerson } from 'react-icons/io5';
import { IoCarSportSharp } from "react-icons/io5";

export default function RentForm({ auth, car }) {
    const { data: dataForm, processing, errors, post, setData } = useForm({
        start_rent: moment().format("YYYY-MM-DD HH:mm:ss"),
        end_rent: moment().add(3, "days").format("YYYY-MM-DD HH:mm:ss"),
        car_id: null
    });
    const [cost, setCost] = useState(0);
    const [countDay, setCountDay] = useState(0);

    const save = (e) => {
        e.preventDefault();
        post(route("rent.store"));
    }

    useEffect(() => {
        if (car) {
            setData({
                car_id: car?.id,
                start_rent: moment().format("YYYY-MM-DD HH:mm:ss"),
                end_rent: moment().add(3, "days").format("YYYY-MM-DD HH:mm:ss"),
            });
        }
    }, [car]);

    useEffect(() => {
        const start = moment(dataForm?.start_rent);
        const end = moment(dataForm?.end_rent);
        setCountDay(end.diff(start, 'days'));
    }, [dataForm]);

    useEffect(() => {
        setCost(countDay * car?.daily_cost);
    }, [countDay]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sewa Mobil {car?.name}</h2>}
        >
            <Head title={`Sewa Mobil ${car?.name}`} />

            <form onSubmit={save}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 text-sm">
                                <div className="col-span-12 md:col-span-3 mb-3 md:mb-0">
                                    <div className="flex flex-col gap-y-3 relative">
                                        <img alt="" src={`/storage/${car?.photo}`} className="min-h-52 object-contain" />
                                        <h4 className="font-semibold absolute -bottom-2 md:bottom-3 left-1/2 -translate-x-1/2">
                                            Rp. {formattedNumber(car?.daily_cost)} /hari
                                        </h4>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-y-2 mb-3 md:mb-0 md:border-r md:border-dashed md:border-slate-200 md:pr-5">
                                    <h4 className="font-semibold flex gap-x-1.5 items-center">
                                        <IoCarSportSharp size={18} />
                                        <span>Informasi Mobil</span>
                                    </h4>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Nama Mobil</div>
                                        <div className="flex-shrink-0 font-semibold">{car?.name}</div>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Merk</div>
                                        <div className="flex-shrink-0 font-semibold">{car?.merk}</div>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Model</div>
                                        <div className="flex-shrink-0 font-semibold">{car?.model}</div>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Plat Nomor</div>
                                        <div className="flex-shrink-0 font-semibold">{car?.plat_number}</div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 flex flex-col justify-center gap-y-2">
                                    <h4 className="font-semibold flex gap-x-1.5 items-center">
                                        <IoPerson size={16} />
                                        <span>Informasi Penyewa</span>
                                    </h4>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Nama</div>
                                        <div className="flex-shrink-0 font-semibold">{auth?.user?.name}</div>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">No. HP</div>
                                        <div className="flex-shrink-0 font-semibold">{auth?.user?.phone}</div>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">No. SIM</div>
                                        <div className="flex-shrink-0 font-semibold">{auth?.user?.drive_license_number ?? "-"}</div>
                                    </div>
                                    <div className="flex justify-between md:items-center gap-x-0 md:gap-x-4 border-b border-slate-100 p-1">
                                        <div className="w-24 flex-grow text-gray-500">Alamat</div>
                                        <div className="flex-shrink-0 font-semibold">{auth?.user?.address ?? "-"}</div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-b border-dashed border-slate-200 mb-3" />
                            <div className="grid grid-cols-12 gap-3 mb-3">
                                <div className="col-span-6 md:col-span-3">
                                    <InputLabel htmlFor="start_rent" value="Mulai Sewa" />

                                    <TextInput
                                        id="start_rent"
                                        type="datetime-local"
                                        name="start_rent"
                                        value={dataForm.start_rent}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('start_rent', e.target.value)}
                                    />

                                    <InputError message={errors.start_rent} className="mt-2" />
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <InputLabel htmlFor="end_rent" value="Selesai Sewa" />

                                    <TextInput
                                        id="end_rent"
                                        type="datetime-local"
                                        name="end_rent"
                                        value={dataForm.end_rent}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('end_rent', e.target.value)}
                                    />

                                    <InputError message={errors.end_rent} className="mt-2" />
                                </div>
                                <div className="col-span-12 md:col-span-3 hidden md:flex md:items-center relative">
                                    <h4 className="font-semibold absolute left-1/2 -translate-x-1/2 bg-white p-2 mt-5">{countDay} Hari</h4>
                                    <hr className="border-b border-dashed border-slate-200 w-full mt-5" />
                                </div>
                                <div className="col-span-12 md:col-span-3">
                                    <InputLabel value={`Total Bayar (${countDay} Hari)`} />

                                    <TextInput
                                        id="cost"
                                        type="text"
                                        name="cost"
                                        value={formattedNumber(cost)}
                                        className="mt-1 block w-full"
                                        disabled
                                    />
                                </div>
                            </div>

                            <hr className="mb-3" />
                            <div className="flex justify-between items-center">
                                <SecondaryButton disabled={processing} type="button" className="flex items-center justify-center gap-x-1" onClick={() => router.get("/dashboard")}>
                                    <IoArrowBack size={16} />
                                    <span>Kembali</span>
                                </SecondaryButton>
                                {auth?.user?.access === "customer" && (
                                    <PrimaryButton disabled={processing} type="submit" className="flex items-center justify-center gap-x-1">
                                        <span>Sewa</span>
                                        <IoCheckmark size={16} />
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
