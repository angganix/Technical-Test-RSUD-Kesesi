import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        drive_license_number: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="">
                    <div className="mb-3">
                        <InputLabel htmlFor="name" value="Nama Lengkap" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div className="">
                    <div className="mb-3">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="password_confirmation" value="Ulangi Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="">
                    <div className="mb-3">
                        <InputLabel htmlFor="phone" value="No. Handphone" />

                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="drive_license_number" value="No. SIM" />

                        <TextInput
                            id="drive_license_number"
                            type="text"
                            name="drive_license_number"
                            value={data.drive_license_number}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('drive_license_number', e.target.value)}
                            required
                        />

                        <InputError message={errors.drive_license_number} className="mt-2" />
                    </div>
                </div>

                <div className="">
                    <div className="mb-3">
                        <InputLabel htmlFor="address" value="Alamat Lengkap" />

                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>
                </div>


                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sudah Punya Akun?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
