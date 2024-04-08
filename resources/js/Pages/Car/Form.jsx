import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { IoArrowBack, IoCheckmark } from 'react-icons/io5';

export default function CarForm({ auth, data }) {
    const { data: dataForm, processing, errors, post, put, setData } = useForm({
        name: "",
        merk: "",
        model: "",
        plat_number: "",
        daily_cost: 0,
        photo: null
    });

    const save = (e) => {
        e.preventDefault();

        if (data?.id) {
            post(route("car.update", data?.id));
        } else {
            post(route("car.insert"));
        }
    }

    useEffect(() => {
        if (data) {
            setData({
                name: data?.name,
                merk: data?.merk,
                model: data?.model,
                plat_number: data?.plat_number,
                daily_cost: data?.daily_cost,
            });
        }
    }, [data]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{data?.id ? "Edit" : "Tambah"} Mobil</h2>}
        >
            <Head title={`${data?.id ? "Edit" : "Tambah"} Mobil`} />

            <form onSubmit={save}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="photo" value="Gambar Mobil (optional)" />

                                    <TextInput
                                        id="photo"
                                        type="file"
                                        name="photo"
                                        className="mt-1 block w-full border border-slate-300 p-1"
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                    />

                                    <InputError message={errors.photo} className="mt-2" />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="name" value="Nama Mobil" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={dataForm.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="merk" value="Merk Mobil" />

                                    <TextInput
                                        id="merk"
                                        type="text"
                                        name="merk"
                                        value={dataForm.merk}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('merk', e.target.value)}
                                    />

                                    <InputError message={errors.merk} className="mt-2" />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="model" value="Model" />

                                    <TextInput
                                        id="model"
                                        type="text"
                                        name="model"
                                        value={dataForm.model}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('model', e.target.value)}
                                    />

                                    <InputError message={errors.model} className="mt-2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="plat_number" value="Plat Nomor" />

                                    <TextInput
                                        id="plat_number"
                                        type="text"
                                        name="plat_number"
                                        value={dataForm.plat_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('plat_number', e.target.value)}
                                    />

                                    <InputError message={errors.plat_number} className="mt-2" />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <InputLabel htmlFor="daily_cost" value="Biaya Sewa /hari" />

                                    <TextInput
                                        id="daily_cost"
                                        type="number"
                                        name="daily_cost"
                                        value={dataForm.daily_cost}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('daily_cost', e.target.value)}
                                    />

                                    <InputError message={errors.daily_cost} className="mt-2" />
                                </div>
                            </div>
                            <hr className="mb-3" />
                            <div className="flex justify-between items-center">
                                <SecondaryButton disabled={processing} type="button" className="flex items-center justify-center gap-x-1" onClick={() => router.get("/car")}>
                                    <IoArrowBack size={16} />
                                    <span>Kembali</span>
                                </SecondaryButton>
                                <PrimaryButton disabled={processing} type="submit" className="flex items-center justify-center gap-x-1">
                                    <span>Simpan</span>
                                    <IoCheckmark size={16} />
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
