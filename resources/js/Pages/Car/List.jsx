import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { IoArrowForward } from "react-icons/io5";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { BiReset } from "react-icons/bi";
import SecondaryButton from '@/Components/SecondaryButton';
import CardItem from '@/Components/CardItem';

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

    const resetFilter = () => {
        router.get('car');
    }

    const deleteItem = (item) => {
        if (window.confirm(`Yakin akan menghapus ${item?.name}?`)) {
            router.delete(`/car/${item?.id}`);
        }
    }

    const editItem = (item) => {
        router.get(`/car/edit/${item?.id}`);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Mobil</h2>
                    <PrimaryButton onClick={() => router.get("car/add-new")}>
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
                            <div className="col-span-12 md:col-span-2">
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
                            <div className="col-span-12 md:col-span-2">
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
                            <div className="col-span-12 md:col-span-2">
                                <SelectInput
                                    placeholder="- Semua Status -"
                                    className="w-full"
                                    value={availabilityFilter}
                                    onChange={(event) => setAvailabilityFilter(event.target.value)}
                                    options={[
                                        { value: 0, label: "Tidak Tersedia" },
                                        { value: 1, label: "Tersedia" }
                                    ]}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-3">
                                <TextInput
                                    placeholder="Cari Nama / No. Plat..."
                                    type="search"
                                    className="w-full"
                                    value={searchFilter}
                                    onChange={(event) => setSearchFilter(event.target.value)}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-3">
                                <div className="flex items-center h-full gap-3">
                                    <SecondaryButton className="w-full justify-center flex py-3 items-center gap-x-1" onClick={resetFilter}>
                                        <span>Reset</span>
                                        <BiReset size={17} />
                                    </SecondaryButton>
                                    <PrimaryButton className="w-full justify-center flex py-3 items-center gap-x-1" onClick={applyFilter}>
                                        <span>Cari Data</span>
                                        <IoArrowForward size={17} />
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {!cars?.total ? (
                            <div className="p-6 bg-white shadow-sm flex col-span-12 gap-3 rounded-lg justify-center items-center flex-col w-full border border-slate-200">
                                <HiOutlineEmojiSad size={64} />
                                <h4 className="text-xl">Data Tidak Ditemukan</h4>
                            </div>
                        ) : (
                            cars?.data?.map(item => (
                                <CardItem key={item?.id} item={item} deleteItem={deleteItem} editItem={editItem} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
