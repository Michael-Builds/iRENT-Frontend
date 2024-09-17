import { IoMdClose } from "react-icons/io";
import { Menu } from "./Menu";

export const Drawer = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 w-[75%] h-full bg-white shadow-lg z-50 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 flex justify-end">
                    <IoMdClose size={20} onClick={onClose} className="cursor-pointer" />
                </div>
                <div className="p-4 -mt-4">
                    <Menu />
                </div>
            </div>
        </>
    );
};
