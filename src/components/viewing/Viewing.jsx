import React, { useEffect, useState } from 'react'
import { useMainState } from '../context/StateContext';
import { PendingViewings, ViewedViewings } from "./Categories"
import api from '../../utils/api';
import { viewing_url } from '../../utils/Endpoint';
import toast from 'react-hot-toast';
import { Loader } from '../animation/loader';

const Viewing = () => {
    const { viewings, currentUser, fetchViewings, favorites, loadingId, setLoadingId, toggleFavorite, selectedTown, setLoading, loading } = useMainState();
    const [activeTab, setActiveTab] = useState('pending');
    const [isFetchingViewings, setIsFetchingViewings] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetchingViewings(true);
            await fetchViewings();
            setIsFetchingViewings(false);
        };

        if (currentUser) fetchData();
    }, [currentUser]);


    const currentDate = new Date();

    // Filter viewings based on the active tab (pending or viewed) and selected town
    const filteredViewings = viewings.filter(viewing => {
        const isPending = new Date(viewing.preferredDate) >= currentDate;
        const matchesTown = !selectedTown || viewing.property.location === selectedTown.name;

        return activeTab === 'pending' ? isPending && matchesTown : !isPending && matchesTown;
    });

    // Handle removing a viewing
    const handleRemoveViewing = async (viewingId) => {
        setLoading(true);
        setLoadingId(viewingId);
        try {
            await api.delete(`${viewing_url}/viewings/${viewingId}`);
            toast.success('Viewing removed successfully');
            await fetchViewings();  // Refetch viewings after deletion
        } catch (error) {
            console.error('Error removing viewing:', error);
            toast.error('Error removing viewing');
        } finally {
            setLoading(false);
            setLoadingId(null);
        }
    };


    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-3">
            <p className='pl-8 mb-2 font-semibold mt-2'>List of Viewings</p>

            <div className="flex ml-7 max-sm:ml-0 max-sm:w-full text-sm mb-8 items-center p-[3px] bg-[#d57107] justify-start max-w-[15%] max-sm:max-w-none max-sm:justify-center rounded-full">
                <button
                    className={`px-3 w-full max-sm:py-[6px] py-1 ${activeTab === 'pending' ? ' bg-white text-[#d57107]' : 'bg-transparent text-white'}  rounded-full max-sm:w-[90%]`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending
                </button>
                <button
                    className={`px-3 w-full max-sm:py-[6px] py-1 ${activeTab === 'viewed' ? 'bg-white text-[#d57107]' : 'bg-transparent text-white'} rounded-full max-sm:w-[90%]`}
                    onClick={() => setActiveTab('viewed')}
                >
                    Viewed
                </button>
            </div>


            <div className='-mt-12'>
                {activeTab === 'pending' ? (
                    isFetchingViewings ? (
                        <Loader />
                    ) : filteredViewings.length === 0 ? (
                        <div className="flex flex-col mt-[15%] items-center justify-center p-8">
                            <p className="text-lg">No pending viewings available.</p>
                        </div>
                    ) : (
                        <PendingViewings
                            filteredViewings={filteredViewings}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                            handleRemoveViewing={handleRemoveViewing}
                            loading={loadingId}
                        />
                    )
                ) : (
                    <ViewedViewings />
                )}
            </div>
        </div>
    )
}

export default Viewing
