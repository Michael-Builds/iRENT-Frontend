import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineMail, AiOutlineStar } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdPool, MdSecurity } from "react-icons/md";
import { PiBuildingApartmentLight, PiPhone } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import DefaultAvatar from "../../assets/images/avatar.png";
import { useMainState } from '../context/StateContext';
import { CustomSelect } from '../inputs/Select';
import { FaDumbbell, FaParking, FaWifi, FaFan } from 'react-icons/fa';
import { Loader } from '../animation/loader';

const DetailsPage = () => {
    const { navigate, openModal, properties, loading } = useMainState();
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [years, setYears] = useState({ value: 1, label: "1 Year" });
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch the property DetailsPage based on the id from the URL
    useEffect(() => {
        const selectedListing = properties.find(item => item._id === id);
        if (selectedListing) {
            setListing(selectedListing);
            setTotalPrice(selectedListing.price * 12 * years.value);
        }
    }, [id, properties, years]);

    // Update total price when year selection changes
    useEffect(() => {
        if (listing) {
            setTotalPrice(listing.price * 12 * years.value);
        }
    }, [listing, years]);

    // Options for the year select dropdown
    const yearOptions = [
        { value: 1, label: "1 Year" },
        { value: 2, label: "2 Years" },
        { value: 3, label: "3 Years" },
        { value: 4, label: "4 Years" },
        { value: 5, label: "5 Years" },
    ];

    const handleYearChange = (selectedOption) => {
        setYears(selectedOption);
        if (listing) {
            const calculatedPrice = listing.price * 12 * selectedOption.value;
            setTotalPrice(calculatedPrice);
        }
    };

    if (!listing) {
        return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
    }

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center">
            <Loader />
        </div>;
    }

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Array(rating).fill(<AiFillStar size={16} color="#f6c700" />);
        const outlineStars = Array(totalStars - rating).fill(<AiOutlineStar size={16} color="#f6c700" />);
        return [...filledStars, ...outlineStars];
    };

    const amenitiesIcons = {
        'Swimming Pool': <MdPool size={18} className='text-gray-600' />,
        'Gym': <FaDumbbell size={18} className='text-gray-600' />,
        'Parking': <FaParking size={18} className='text-gray-600' />,
        'Security': <MdSecurity size={18} className='text-gray-600' />,
        'Wi-Fi': <FaWifi size={18} className='text-gray-600' />,
        'Air Conditioning': <FaFan size={18} className='text-gray-600' />,
    };

    const handleRequestViewing = () => {
        openModal("VIEWING", listing._id);
    };

    return (
        <div className='min-h-screen w-full bg-gray-100 max-sm:pl-2 max-sm:pr-2 p-5 pb-8'>
            <div
                onClick={() => navigate(-1)}
                className='justify-start mb-2 flex items-center bg-[#d57107] hover:bg-[#b85e06] transition-all duration-300 ease-in-out text-white shadow-lg cursor-pointer p-2 w-8 h-8 sm:w-8 sm:h-8 rounded-full'
            >
                <MdKeyboardArrowLeft className="w-full h-full"/>
            </div>

            {/* Main content */}
            <div className=' 2xl:ml-[10rem] 2xl:mr-[10rem] w-auto h-auto flex flex-col items-center justify-center 2xl:mt-6 p-4'>
                {/* Main image */}
                <div className='flex flex-col items-center w-full gap-2 mb-4'>
                    <img
                        src={listing.images[0].url}
                        alt="Main Image"
                        className='w-full max-h-[450px] object-cover rounded-md'
                    />
                </div>

                {/* Remaining images */}
                <div className='flex gap-6 justify-center w-full max-sm:flex-col max-sm:gap-4'>
                    {listing.images.slice(1).map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Image ${index + 2}`}
                            className='w-full max-h-[320px] object-cover rounded-md'
                        />
                    ))}
                </div>

                <div className='flex flex-col lg:flex-row mt-4 border border-gray-300 rounded-lg w-full justify-between p-6 max-sm:p-4'>
                    <div className='flex flex-col gap-2 w-full lg:w-3/5'>
                        {/* Title Section */}
                        <div className='flex flex-col text-xl font-medium'>
                            <p>{listing.category}, {listing.location}</p>
                        </div>

                        {/* Amenities */}
                        <div className='flex flex-wrap items-center gap-3 mt-2'>
                            {listing.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {amenitiesIcons[amenity.name]}
                                    <p className='text-sm'>{amenity.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Owner */}
                        <div className='flex items-center gap-2 mt-2'>
                            <div className="bg-gray-200 w-8 h-8 rounded-full overflow-hidden">
                                <img src={listing.createdBy.avatar.url || DefaultAvatar} alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-sm'>Uploaded by: <span className='font-bold'>{listing.createdBy?.firstname || 'Unknown'}</span></p>
                                <p className='text-sm'>Age of building: <span className='font-bold'>{listing.yearBuilt}</span></p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className='flex gap-4 mt-2'>
                            <div className='flex items-center gap-1'>
                                <AiOutlineMail size={16} className='text-gray-600' />
                                <p className='text-sm'>{listing.createdBy?.email || "N/A"}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <PiPhone size={16} className='text-gray-600' />
                                <p className='text-sm'>{listing.phone || "N/A"}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className='flex items-center gap-3 mt-1'>
                            <p className='font-semibold text-sm'>Ghc {listing.price} <span className='text-xs'>per month</span></p>
                            <p className='flex items-center gap-1'>
                                <PiBuildingApartmentLight size={16} className='text-gray-600' />
                                <span className='font-semibold text-sm'>{listing.category}</span>
                            </p>
                        </div>

                        {/* Description */}
                        <div className='mt-1 mb-2'>
                            <p className='text-sm'>{listing.description}</p>
                        </div>

                        {/* Availability */}
                        <div className={`text-sm justify-start w-[8rem] text-center px-4 py-1 text-white ${listing.availability === 'Available' ? 'bg-green-500' : 'bg-gradient-to-b from-[#d57107] to-[#d70505]'}`}>
                            {listing.availability}
                        </div>

                        {/* Reviews */}
                        <div className='mt-1'>
                            {listing.reviews && listing.reviews.length > 0 ? (
                                listing.reviews.map((review, index) => (
                                    <div key={index} className='flex gap-4 mb-4 bg-white p-4 shadow-md rounded-lg'>
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img src={review.avatar || "default-avatar.jpg"} alt={`${review.reviewer} avatar`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className='flex flex-col justify-start w-full'>
                                            <div className='flex items-center justify-between'>
                                                <p className='font-semibold text-sm'>{review.reviewer}</p>
                                                <div className='flex'>
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className='text-gray-600 mt-2 text-sm'>{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm text-gray-500'>No reviews yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Price Calculator */}
                    <div className='flex flex-col w-full lg:w-2/5 h-full justify-between max-sm:mt-4'>
                        <div className='p-4 shadow-xl bg-white border border-b-[#d57107] rounded-xl'>
                            <div className='p-2 rounded-lg'>
                                <h2 className='text-xl font-semibold text-center max-sm:text-md'>Price Calculator</h2>
                                <p className='mt-2 max-sm:text-sm'>Price per month: <span className='font-semibold'>Ghc {listing.price}</span></p>

                                {/* Year selection dropdown */}
                                <label htmlFor="years" className='mt-4 block mb-2 text-sm'>Select Number of Years</label>
                                <CustomSelect
                                    options={yearOptions}
                                    placeholder="Select years"
                                    value={years}
                                    onChange={handleYearChange}
                                />
                                <p className='mt-6 text-center font-semibold text-lg max-sm:text-sm'>Total price for {years.value} {years.value === 1 ? 'year' : 'years'}: <span className='font-bold text-[#d2710a]'>Ghc {totalPrice.toLocaleString()}</span></p>
                            </div>
                        </div>

                        <div className='mt-8 flex items-center gap-2'>
                            <button
                                onClick={handleRequestViewing}
                                className="bg-[#d2710a] max-sm:text-sm hover:bg-[#b35e08] focus:outline-none transition-all duration-300 ease-in-out w-full p-2 rounded-full text-white"
                            >
                                Request Viewing
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DetailsPage;
