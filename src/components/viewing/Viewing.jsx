import React, { useEffect, useState, useCallback } from 'react';
import { useMainState } from '../context/StateContext';
import api from '../../utils/api';
import { viewing_url } from '../../utils/Endpoint';
import toast from 'react-hot-toast';
import { Loader } from '../animation/loader';
import DefaultAvatar from '../../assets/images/avatar.png';
import ListingCard from '../ListingCard';

const Viewing = () => {
    const { viewings, currentUser, fetchViewings, favorites, loadingId, setLoadingId, toggleFavorite, selectedTown, setLoading, loading } = useMainState();
    const [activeTab, setActiveTab] = useState('pending');
    const [localViewings, setLocalViewings] = useState([]);

    useEffect(() => {
        if (currentUser) {
            fetchViewings();
        }
    }, [currentUser]);

    useEffect(() => {
        setLocalViewings(viewings);
    }, [viewings]);

    const currentDate = new Date();

    const filteredViewings = localViewings.filter(viewing => {
        const isPending = new Date(viewing.preferredDate) >= currentDate;
        const matchesTown = !selectedTown || viewing.property.location === selectedTown.name;
        return activeTab === 'pending' ? isPending && matchesTown : !isPending && matchesTown;
    });

    const handleRemoveViewing = async (viewingId) => {
        setLoading(true);
        setLoadingId(viewingId);
        try {
            await api.delete(`${viewing_url}/viewings/${viewingId}`);
            toast.success('Viewing removed successfully');
            setLocalViewings(prevViewings => prevViewings.filter(viewing => viewing._id !== viewingId));
            await fetchViewings();
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
                    loading ? (
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
    );
};

const PendingViewings = ({ filteredViewings, favorites, toggleFavorite, handleRemoveViewing, loading }) => (
    <div className="flex flex-wrap gap-8 justify-center">
        {filteredViewings.length > 0 ? (
            filteredViewings.map((viewing) => {
                const property = viewing.property || {};
                const images = property.images || [];
                const createdBy = property.createdBy || {};

                return (
                    <ListingCard
                        key={property._id || viewing._id}
                        id={property._id}
                        images={images.map((img) => img.url)}
                        category={property.category}
                        username={createdBy.firstname}
                        description={property.description}
                        availability={property.availability}
                        avatar={createdBy.avatar?.url || DefaultAvatar}
                        price={property.price}
                        address={property.address}
                        isFavorited={favorites.includes(property._id)}
                        location={property.location}
                        onFavoriteToggle={() => toggleFavorite(property._id)}
                        onRemoveListing={() => handleRemoveViewing(viewing._id)}
                        showRemoveButton={true}
                        className="h-[540px]"
                        ctaButton={"Cancel Viewing"}
                        loading={loading === viewing._id}
                    />
                );
            })
        ) : (
            <div className="flex flex-col mt-[15%] items-center justify-center p-8">
                <p className="text-lg">No pending viewings available.</p>
            </div>
        )}
    </div>
);

const ViewedViewings = () => {
    return (
        <div className="flex flex-col mt-[15%] items-center justify-center p-8">
            <p className="text-lg">No viewed items available.</p>
        </div>
    );
};

export default Viewing;