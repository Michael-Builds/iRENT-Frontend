import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { property_url } from '../../utils/Endpoint';
import { towns } from '../constants/data';
import { useMainState } from '../context/StateContext';
import { Input } from '../inputs/Input';
import { CustomSelect } from '../inputs/Select';
import { Textarea } from '../inputs/TextArea';
import api from '../../utils/api';

const AddProperty = () => {
    const {
        step,
        setStep,
        setLoading,
        loading,
        closeModal,
        fetchProperties
    } = useMainState();

    const [address, setAddress] = useState('');
    const [availability, setAvailability] = useState({ value: 'Available', label: 'Available' });
    const [amenities, setAmenities] = useState([]);
    const [category, setCategory] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [yearBuilt, setYearBuilt] = useState('');
    const [error, setError] = useState({});


    // Reset the step to 0 when the component mounts
    useEffect(() => {
        setStep(0);
    }, [setStep]);

    // Validation function to check required fields
    const validateFields = () => {
        const newErrors = {};
        if (!address) newErrors.address = 'Address is required.';
        if (!availability) newErrors.availability = 'Availability is required.';
        if (amenities.length < 3) newErrors.amenities = 'Select at least 3 amenities.';
        if (!category) newErrors.category = 'Category is required.';
        if (!description) newErrors.description = 'Description is required.';
        if (images.length === 0) newErrors.images = 'At least one image is required.';
        if (!location) newErrors.location = 'Location is required.';
        if (!phone || phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits.';
        if (!price || price < 0) newErrors.price = 'Price must be a positive number.';
        if (!yearBuilt) newErrors.yearBuilt = 'Year built is required.';

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 3) {
            toast.error('You can only upload up to 3 images.', {
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        setImages([...images, ...files]);
    };

    const handleError = (error) => {
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            toast.error(message || 'An error occurred. Please try again.', {
                duration: 4000,
                position: 'top-right',
            });
        } else {
            toast.error('An error occurred. Please try again.', {
                duration: 4000,
                position: 'top-right',
            });
        }
    };

    // Handle submit logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (!validateFields()) return;

        try {
            setLoading(true);

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                toast.error('Unauthorized. Please login.', {
                    duration: 4000,
                    position: 'top-right',
                });
                return;
            }

            const formData = new FormData();
            formData.append('address', address);
            formData.append('availability', availability.value);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('price', parseFloat(price));
            formData.append('yearBuilt', parseInt(yearBuilt, 10));
            formData.append('phone', phone);
            amenities.forEach((amenity) => formData.append('amenities[]', amenity.value));
            images.forEach((image) => formData.append('images', image));

            // API call to create property
            const res = await api.post(`${property_url}/add-property`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Property added successfully!', {
                duration: 4000,
                position: 'top-right',
            });
            // Reset form after successful submission
            setAddress('');
            setAvailability('Available');
            setAmenities([]);
            setCategory('');
            setDescription('');
            setImages([]);
            setLocation('');
            setPrice('');
            setYearBuilt('');
            setPhone('');
            closeModal();
            await fetchProperties();
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized. Please login again.', {
                    duration: 4000,
                    position: 'top-right',
                });
            } else {
                handleError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Validation for phone number and price
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 10 && /^[0-9\b]+$/.test(inputValue)) {
            setPhone(inputValue);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (value >= 0) {
            setPrice(value);
        }
    };

    // Move to the next step
    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handleBack = () => setStep((prevStep) => prevStep - 1);

    // Options for select inputs
    const availabilityOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Rented', label: 'Rented' },
    ];

    const categoryOptions = [
        { value: 'Apartment', label: 'Apartment' },
        { value: 'House', label: 'House' },
        { value: 'Studio', label: 'Studio' },
    ];

    const amenitiesOptions = [
        { value: 'Swimming Pool', label: 'Swimming Pool' },
        { value: 'Gym', label: 'Gym' },
        { value: 'Parking', label: 'Parking' },
        { value: 'Security', label: 'Security' },
        { value: 'Wi-Fi', label: 'Wi-Fi' },
        { value: 'Air Conditioning', label: 'Air Conditioning' },
    ];

    const locationOptions = towns.map((town) => ({
        value: town.name,
        label: `${town.name}, ${town.region}`,
    }));

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => ({
        value: (1900 + i).toString(),
        label: (1900 + i).toString(),
    }));

    return (
        <div>
            {step === 0 && (
                <div className="mt-4 mb-4">
                    <Input
                        label="Property Address"
                        type="text"
                        placeholder="Enter property address"
                        value={address}
                        error={error.address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button
                        onClick={handleNext}
                        className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
                    >
                        Next
                    </button>
                </div>
            )}
            {step === 1 && (
                <div className="mt-4 mb-4">
                    <div className="mb-6">
                        <CustomSelect
                            options={amenitiesOptions}
                            placeholder="Select Amenities (minimum 3)"
                            value={amenities}
                            onChange={setAmenities}
                            isMulti={true}
                        />
                        {error.amenities && <p className="text-red-500 text-sm mt-2">{error.amenities}</p>}
                    </div>

                    <CustomSelect
                        options={availabilityOptions}
                        placeholder="Select Availability"
                        value={availability}
                        onChange={setAvailability}
                    />

                    <div className="flex justify-between gap-8 mt-4">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="mt-4 mb-4">
                    <h3 className="text-lg font-normal text-center mb-2">Property Details</h3>
                    <div className='mb-3'>
                        <CustomSelect
                            options={categoryOptions}
                            placeholder="Select Category"
                            value={categoryOptions.find(option => option.value === category)}
                            onChange={(selectedOption) => setCategory(selectedOption.value)}
                        />

                    </div>
                    <Textarea
                        label="Description"
                        placeholder="Enter property description"
                        value={description}
                        error={error.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        label="Price"
                        type="number"
                        placeholder="Enter price per month"
                        value={price}
                        error={error.price}
                        onChange={handlePriceChange}
                    />

                    <CustomSelect
                        options={yearOptions}
                        placeholder="Select Year Built"
                        value={yearOptions.find(option => option.value === yearBuilt)}
                        onChange={(selectedOption) => setYearBuilt(selectedOption.value)}
                    />

                    <div className="flex justify-between gap-8 mt-2">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="mt-4 mb-4">
                    <h3 className="text-lg font-normal text-center mb-4">Property Location & Amenities</h3>
                    <div className='mb-6'>
                        <CustomSelect
                            options={locationOptions}
                            placeholder="Select Property Location"
                            value={locationOptions.find(option => option.value === location)}
                            onChange={(selectedOption) => setLocation(selectedOption.value)}
                        />
                    </div>
                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        error={error.phone}
                        onChange={handlePhoneChange}
                    />

                    <div className="flex justify-between gap-8 mt-2">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="mt-4 mb-4">
                    <p className="text-md text-gray-600 text-center mb-4">You can upload up to 3 images. {images.length}/3 uploaded.</p>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded mt-2"
                        disabled={images.length >= 3}
                    />
                    {images.length >= 3 && <p className="text-red-500 text-sm mt-2">Maximum of 3 images uploaded. Remove some to upload more.</p>}

                    <div className="flex justify-between gap-8 mt-6">
                        <button
                            onClick={handleBack}
                            className="bg-gray-300 hover:bg-gray-400 w-full text-gray-800 py-2 px-4 rounded-full mt-2 transition-all duration-300 ease-in-out"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-4 rounded-full mt-2 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                                </div>
                            ) : (
                                "Upload"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddProperty
