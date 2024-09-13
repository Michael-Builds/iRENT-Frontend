import React from "react"
import { IoMdClose } from "react-icons/io"

export const Modal = ({ isOpen, closeModal, children, title }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <IoMdClose
                        size={20}
                        onClick={closeModal}
                        className="cursor-pointer text-gray-400 hover:text-gray-700"
                    />
                </div>
                <div className="pb-2">{children}</div>
            </div>
        </div>
    )
}

