import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formattedNumber } from '@/utils/helper';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { IoArrowForward, IoCheckbox, IoClose } from "react-icons/io5";

export default function CarList({ auth, cars, search, merk, model, availability, master_data }) {
    const [searchFilter, setSearchFilter] = useState(search);
    const [merkFilter, setMerkFilter] = useState(merk);
    const [modelFilter, setModelFilter] = useState(model);
    const [availabilityFilter, setAvailabilityFilter] = useState(availability);

    const applyFilter = () => {
        router.get(`car`, {
            search: searchFilter,
            merk: merkFilter,
            model: modelFilter,
            availability: availabilityFilter
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Mobil</h2>
                    <PrimaryButton>
                        Tambah Baru
                    </PrimaryButton>
                </div>
            )}
        >
            <Head title="Daftar Mobil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-3">
                                <SelectInput
                                    placeholder="- Semua Merk -"
                                    className="w-full"
                                    value={merkFilter}
                                    onChange={(event) => setMerkFilter(event.target.value)}
                                    options={master_data?.merk?.map(item => ({
                                        value: item?.merk,
                                        label: item?.merk
                                    }))}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-3">
                                <SelectInput
                                    placeholder="- Semua Model -"
                                    className="w-full"
                                    value={modelFilter}
                                    onChange={(event) => setModelFilter(event.target.value)}
                                    options={master_data?.model?.map(item => ({
                                        value: item?.model,
                                        label: item?.model
                                    }))}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <TextInput
                                    placeholder="Cari Nama atau No. Plat..."
                                    type="search"
                                    className="w-full"
                                />
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <div className="flex items-center h-full">
                                    <PrimaryButton className="w-full justify-center flex py-3 items-center gap-x-1" onClick={applyFilter}>
                                        <span>Cari Data</span>
                                        <IoArrowForward size={17} />
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {cars?.data?.map(item => (
                            <div key={item?.id} className="col-span-12 md:col-span-3 p-4 border border-slate-100 bg-white rounded-none sm:rounded-lg shadow-sm cursor-pointer">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold flex-grow">{item?.name}</h4>
                                    {item?.availability ? <IoCheckbox className="text-green-500 text-xl" /> : <IoClose className="text-orange-500 text-xl" />}
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex flex-col">
                                        <small className="text-slate-400">Merk</small>
                                        <h5 className="text-sm text-slate-600 font-semibold">{item?.merk}</h5>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <small className="text-slate-400">Model</small>
                                        <h5 className="text-sm text-slate-600 font-semibold">{item?.model}</h5>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <small className="text-slate-400">Plat Nomor</small>
                                        <h5 className="text-sm text-slate-600 font-semibold">{item?.plat_number}</h5>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <small className="text-slate-400">Sewa /hari</small>
                                        <h5 className="text-sm text-slate-600 font-semibold">{formattedNumber(item?.daily_cost)}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
