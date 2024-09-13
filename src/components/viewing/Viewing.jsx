import React, { useState } from 'react'
import { useMainState } from '../context/StateContext';
import { listings as initialListings } from '../constants/data';
import ListingCard from '../ListingCard';

const Viewing = () => {
    const { favorites, setFavorites, selectedTown } = useMainState();
    const [activeTab, setActiveTab] = useState('pending');
    const [listings, setListings] = useState(initialListings);


    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-3">
            <p className='pl-8 mb-2 font-semibold mt-4'>List of Viewings</p>
            <div className="flex ml-7 text-sm mb-8 items-center p-[3px] bg-[#d57107] justify-start max-w-[15%]  rounded-full">
                <button
                    className={`px-3 w-full py-1 ${activeTab === 'pending' ? ' bg-white text-[#d57107]' : 'bg-transparent text-white'}  rounded-full`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending
                </button>
                <button
                    className={`px-3 w-full py-1 ${activeTab === 'viewed' ? 'bg-white text-[#d57107]' : 'bg-transparent text-white'} rounded-full`}
                    onClick={() => setActiveTab('viewed')}
                >
                    Viewed
                </button>
            </div>
            {/* 
            {activeTab === 'pending' ? (
                <div className="flex flex-wrap gap-8 justify-center">
                    {filteredListings.length > 0 ? (

                        filteredListings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                id={listing.id}
                                images={listing.images}
                                category={listing.category}
                                username={listing.username}
                                description={listing.description}
                                availability={listing.availability}
                                avatar={listing.avatar}
                                price={listing.price}
                                isFavorited={favorites.includes(listing.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                                onRemoveListing={handleRemoveListing}
                                showRemoveButton={true}
                                location={listing.location}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col mt-[15%] items-center justify-center p-8">
                            <p className="text-lg ">  No listings available in this location.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col mt-[10%] items-center justify-center p-8">
                    <p className="text-lg ">You have no viewed listings yet.</p>
                </div>
            )} */}
        </div>
    )
}

export default Viewing
