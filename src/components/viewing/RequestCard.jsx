import React, { useState } from 'react';
import DefaultAvatar from "../../assets/images/avatar.png";
import { Circles } from 'react-loader-spinner';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

const RequestCard = ({
    requestId,
    property,
    user,
    preferredDate,
    onAccept,
    onReject,
    loadingAccept,
    loadingReject
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[340px] cursor-pointer p-4 hover:shadow-xl hover:bg-gray-100 border transition-all duration-300">
            {/* Image Carousel */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
                <img
                    src={property.images[currentImageIndex]?.url || 'default-image-url'}
                    alt="Property"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                />

                {/* Navigation Arrows */}
                <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gradient-to-b from-[#d57107] to-[#d70505] text-white p-1 rounded-full"
                    onClick={prevImage}
                >
                    <MdKeyboardArrowLeft size={24} />
                </button>
                <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gradient-to-b from-[#d57107] to-[#d70505] text-white p-1 rounded-full"
                    onClick={nextImage}
                >
                    <MdKeyboardArrowRight size={24} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-[#d57107]' : 'bg-gray-400'} transition-all duration-300`}
                        />
                    ))}
                </div>
            </div>

            {/* Property Details */}
            <div className="mt-4 ml-4">
                <h3 className="text-lg font-bold mb-1">{property.address}</h3>
                <p className="text-gray-500">{property.category}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">Price: Ghc {property.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Location: {property.location}</p>
                <p className="text-sm text-gray-500">Availability: {property.availability}</p>
            </div>

            {/* Requesting User Info */}
            <div className="flex items-center mt-4 -ml-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={user?.avatar?.url || DefaultAvatar} alt={user.firstname} className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-semibold">{user.firstname} {user.lastname}</p>
                    <p className="text-sm text-gray-500">Requested Viewing</p>
                    <p className="text-sm text-gray-500">Date: {new Date(preferredDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-4 mb-2">
                <button
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
                    onClick={() => onAccept(requestId)}
                    disabled={loadingAccept || loadingReject}
                >
                    {loadingAccept ? (
                        <div className="flex justify-center items-center">
                            <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                        </div>
                    ) : 'Accept'}
                </button>

                <button
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    onClick={() => onReject(requestId)}
                    disabled={loadingAccept || loadingReject}
                >
                    {loadingReject ? (
                        <div className="flex justify-center items-center">
                            <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                        </div>
                    ) : 'Reject'}
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
