import React, { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useMainState } from './context/StateContext';
import { Circles } from 'react-loader-spinner';

const ListingCard = ({
    images,
    category,
    username,
    location,
    description,
    availability,
    avatar,
    price,
    address,
    isFavorited,
    id,
    onRemoveListing,
    showRemoveButton,
    className = "",
    ctaButton,
    loading
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { toggleFavorite, setSelectedListing, navigate } = useMainState();


    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    const handleCardClick = () => {
        setSelectedListing(id);
        navigate(`/details/${id}`);
    };


    return (
        // <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[340px]  cursor-pointer">
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden w-[340px] cursor-pointer ${className}`}>
            {/* Image Carousel */}
            <div className="relative w-full h-[300px] overflow-hidden">
                <img
                    src={images[currentImageIndex]}
                    alt="Listing"
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

                {/* Favorite Icon */}
                <div
                    className={`absolute cursor-pointer top-2 right-2 p-2 rounded-full shadow-md transition-all ${isFavorited ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
                    onClick={() => toggleFavorite(id)}
                >
                    {isFavorited ? <MdFavorite size={16} /> : <MdFavoriteBorder size={16} />}
                </div>

                {/* Ribbon */}
                <div className={`absolute text-sm top-0 left-0 px-4 py-1 text-white ${availability === 'Available' ? 'bg-green-500' : 'bg-gradient-to-b from-[#d57107] to-[#d70505]'}`}>
                    {availability}
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-[#d57107]' : 'bg-gray-400'} transition-all duration-300`}
                        />
                    ))}
                </div>
            </div>

            {/* Card Details */}
            <div className="p-4 transition-all duration-300" >
                <div className="flex items-center gap-2">
                    <div className="bg-gray-200 w-8 h-8 rounded-full overflow-hidden">
                        <img src={avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">{category}</p>
                        <p className="text-sm font-semibold">{username}</p>
                    </div>
                </div>

                <p className="mt-2 text-gray-700 text-sm">{description}</p>

                {/* Conditionally render Address */}
                {address && (
                    <div className="mt-4">
                        <p className="text-gray-500 text-sm">Address : <span className="text-gray-800 text-sm">{address}</span></p>
                    </div>
                )}

                <div className='flex items-center justify-between mt-2'>
                    {/* Conditionally render Price */}
                    {price && (
                        <div className="mt-2">
                            <p className="text-gray-500 text-sm">Price : <span className="text-gray-800 text-sm font-bold">Ghc {price.toLocaleString()}</span></p>
                        </div>
                    )}

                    <p className="mt-2 text-gray-700 font-semibold text-sm">Location: {location}</p>
                </div>

                <div onClick={handleCardClick} className='mt-2 flex justify-center items-center space-x-2 text-[#d57107] hover:text-[#b35e08] hover:underline transition-all duration-300 ease-in-out cursor-pointer'>
                    <span className="font-semibold text-sm">View Detail</span>
                    <svg className="w-4 h-4 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {showRemoveButton && (
                    <button
                        className="mt-2 text-sm w-full py-[7px] bg-[#d57107] hover:bg-[#b85e06] transition-all duration-300 ease-in-out text-white rounded-full"
                        onClick={() => onRemoveListing(id)}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <Circles
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="loading"
                                />
                            </div>
                        ) : (
                            ctaButton
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListingCard;
