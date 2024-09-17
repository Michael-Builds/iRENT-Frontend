import React from 'react';
import DefaultAvatar from "../../assets/images/avatar.png";
import ListingCard from '../ListingCard';
import { useMainState } from '../context/StateContext';
import { Loader } from '../animation/loader';

const Landing = () => {
    const { favorites, selectedTown, properties, loading } = useMainState();

    const filteredListings = selectedTown
        ? properties.filter(listing => listing.location === selectedTown.name)
        : properties;


    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-8">
            <div className="flex flex-wrap gap-8 justify-center">
                {loading ? (
                    <Loader />
                ) : (
                    filteredListings.length > 0 ? (
                        filteredListings.map((listing, _) => (
                            <ListingCard
                                key={listing._id}
                                id={listing._id}
                                images={listing.images.map(img => img.url)}
                                category={listing.category}
                                username={listing.createdBy.firstname}
                                description={listing.description}
                                availability={listing.availability}
                                avatar={listing.createdBy?.avatar.url || DefaultAvatar}
                                price={listing.price}
                                address={listing.address}
                                isFavorited={favorites.includes(listing._id)}
                                location={listing.location}
                                className="h-[500px]"
                            />
                        ))
                    ) : (
                        <div className="flex flex-col mt-[15%] h-full w-full items-center justify-center p-8">
                            <p className="text-lg ">  No listings available in this location.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Landing;
