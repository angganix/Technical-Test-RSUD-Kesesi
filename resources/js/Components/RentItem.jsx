import moment from 'moment'
import React from 'react'
import { FaCircle } from 'react-icons/fa'
import PrimaryButton from './PrimaryButton'
import { IoReturnDownBack } from "react-icons/io5";

const RentItem = ({ item, returnCar = null }) => {

    const returnOn = (endRent) => {
        const nowTime = moment();
        const endTime = moment(endRent).subtract(1, "hour");
        return endTime.diff(nowTime, "hours");
    }

    return (
        <li className="bg-white flex gap-x-2 flex-col md:flex-row sm:rounded-lg shadow shadow-gray-500/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-3">
                <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col gap-y-2 relative">
                        <img alt="" src={`/storage/${item?.car?.photo}`} className="min-h-52 object-contain" />
                        <span className="text-sm text-center absolute md:top-2 left-1/2 -translate-x-1/2 w-full">
                            <span dangerouslySetInnerHTML={{ __html: returnOn(item?.end_rent) > 0 ? `Pengembalian Mobil<br /><strong>${returnOn(item?.end_rent)} Jam Lagi</strong>` : !item?.return_time && returnOn(item?.end_rent) < 0 ? "<strong>Harus Dikembalikan</strong>" : "" }}></span>
                        </span>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-2">
                    <ul className="flex flex-col gap-y-1 md:mt-2 relative px-3 md:px-0">
                        <span className="absolute h-3/4 border-r border-dashed border-gray-400 left-3 md:-left-px top-1"></span>
                        <li className="p-2 px-5 pt-0 relative">
                            <FaCircle size={20} className="absolute -left-2.5 top-3 -translate-y-1/2 text-blue-500" />
                            <span className="text-sm">
                                <strong className="block mt-0.5">Mulai</strong>
                                <small>{moment(item?.start_rent).format("DD MMMM YYYY, HH:mm")}</small>
                            </span>
                        </li>
                        <li className="p-2 px-5 pt-0 relative">
                            <FaCircle size={20} className="absolute -left-2.5 top-3 -translate-y-1/2 text-green-500" />
                            <span className="text-sm">
                                <strong className="block mt-0.5">Selesai</strong>
                                <small>{moment(item?.end_rent).format("DD MMMM YYYY, HH:mm")}</small>
                            </span>
                        </li>
                        <li className="p-2 px-5 pt-0 relative">
                            <FaCircle size={20} className="absolute -left-2.5 top-3 -translate-y-1/2 text-gray-400" />
                            <span
                                className="text-sm"
                                dangerouslySetInnerHTML={{ __html: item?.return_time ? `<strong class="block mt-0.5">Dikembalikan</strong> <small>${moment(item?.return_time).format("DD MMMM YYYY, HH:mm")}</small>` : `<strong>Sedang Digunakan</strong>` }}
                            ></span>
                        </li>
                    </ul>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <ul className="flex flex-col gap-y-2 text-sm">
                        <li className="flex justify-between items-center border-b border-gray-200 p-1">
                            <label>Nama Mobil</label>
                            <strong>{item?.car?.name}</strong>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-200 p-1">
                            <label>Merk</label>
                            <strong>{item?.car?.merk}</strong>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-200 p-1">
                            <label>Model</label>
                            <strong>{item?.car?.model}</strong>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-200 p-1">
                            <label>No. Plat</label>
                            <strong>{item?.car?.plat_number}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <div className="flex flex-col w-full gap-y-4">
                        <ul className="flex flex-col gap-y-2 text-sm">
                            <li className="flex justify-between items-center border-b border-gray-200 p-1">
                                <label>Penyewa</label>
                                <strong>{item?.customer?.name}</strong>
                            </li>
                            <li className="flex justify-between items-center border-b border-gray-200 p-1">
                                <label>No. HP</label>
                                <strong>{item?.customer?.phone}</strong>
                            </li>
                            <li className="flex justify-between items-center border-b border-gray-200 p-1">
                                <label>No. SIM</label>
                                <strong>{item?.customer?.drive_license_number}</strong>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 p-1">
                                <label>Alamat</label>
                                <strong>{item?.customer?.address}</strong>
                            </li>
                        </ul>
                        {returnCar && !item?.return_time ? (
                            <PrimaryButton className="text-center justify-center md:self-end flex items-center gap-x-2" onClick={() => returnCar(item)}>
                                <IoReturnDownBack size={18} />
                                <span>Kembalikan Mobil</span>
                            </PrimaryButton>
                        ) : null}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default RentItem