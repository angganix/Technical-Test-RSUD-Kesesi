import React from 'react'
import SecondaryButton from './SecondaryButton'
import { IoPencil, IoTrashBin } from 'react-icons/io5'
import { formattedNumber } from '@/utils/helper'

const CardItem = ({ item, deleteItem = null, editItem = null }) => {
    return (
        <div className="col-span-12 md:col-span-3 border border-slate-100 bg-white rounded-none sm:rounded-lg shadow-sm">
            <div className="p-2">
                <img alt="" src={`/storage/${item?.photo}`} className="min-h-52 object-contain" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold flex-grow">{item?.name}</h4>
                    <small className={`p-px px-1 rounded-lg text-white ${item?.availability ? 'bg-green-500' : 'bg-orange-500'}`}>{item?.availability ? "Tersedia" : "Tidak Tersedia"}</small>
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
                <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                        <small className="text-slate-400">Plat Nomor</small>
                        <h5 className="text-sm text-slate-600 font-semibold">{item?.plat_number}</h5>
                    </div>
                    <div className="flex flex-col items-end">
                        <small className="text-slate-400">Sewa /hari</small>
                        <h5 className="text-sm text-slate-600 font-semibold">{formattedNumber(item?.daily_cost)}</h5>
                    </div>
                </div>
                {deleteItem && editItem && (
                    <div className="flex justify-between items-center">
                        <SecondaryButton type="button" className="flex items-center justify-center gap-x-1 text-red-500 border-red-500" onClick={() => deleteItem(item)}>
                            <IoTrashBin />
                            <span>Hapus</span>
                        </SecondaryButton>
                        <SecondaryButton type="button" className="flex items-center justify-center gap-x-1 text-slate-500 border-slate-500" onClick={() => editItem(item)}>
                            <IoPencil />
                            <span>Edit</span>
                        </SecondaryButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardItem