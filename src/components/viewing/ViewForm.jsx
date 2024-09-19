import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { useMainState } from '../context/StateContext';
import { CustomSelect } from '../inputs/Select';
import { DatePicker } from '../inputs/DatePicker';

const ViewForm = ({ propertyId }) => {
    const [viewingOption, setViewingOption] = useState(null);
    const [preferredDate, setPreferredDate] = useState('');
    const { closeModal, loading, setLoading, currentUser, openModal, createViewingRequest, selectedListing } = useMainState();

    // Options for in-person or remote viewing
    const options = [
        { value: 'in-person', label: 'In-Person' },
        { value: 'remote', label: 'Remote' },
    ];

    const handleSubmit = async () => {
        setLoading(true)
        if (!currentUser) {
            openModal("LOGIN");
            setLoading(false);
            toast.error("You're not Logged in", { duration: 4000, position: "top-right" });
            return;
        }

        // Ensure viewing option and date are selected
        if (!viewingOption || !preferredDate) {
            toast.error("Please select a viewing option and preferred date", { duration: 4000, position: "top-right" });
            setLoading(false);
            return;
        }
        // Create the viewing request using the context function
        await createViewingRequest(propertyId, viewingOption.value, preferredDate);

        closeModal();
        setLoading(false);
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <label htmlFor="viewingOption" className="block mb-2 text-sm font-medium">
                    Choose how you want to view the property:
                </label>
                <CustomSelect
                    options={options}
                    placeholder="Select Viewing Option"
                    value={viewingOption}
                    onChange={(selectedOption) => setViewingOption(selectedOption)}
                />
            </div>

            <div className="mb-6">
                <DatePicker
                    label="Select Preferred Viewing Date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    minDate={new Date().toISOString().split('T')[0]}
                    error={!preferredDate && "Date is required"}
                />
            </div>

            {/* Request button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-[#d2710a] hover:bg-[#b35e08] transition-all duration-300 ease-in-out text-white p-2 rounded-full w-full"
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
                        "Request"
                    )}
                </button>
            </div>
        </div>
    )
}

export default ViewForm
