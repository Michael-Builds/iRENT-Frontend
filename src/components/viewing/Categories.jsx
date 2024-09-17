import React from 'react';
import DefaultAvatar from '../../assets/images/avatar.png';
import ListingCard from '../ListingCard';

export const PendingViewings = ({ filteredViewings, favorites, toggleFavorite, handleRemoveViewing, loading }) => (

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


export const ViewedViewings = () => {
    return (
        <div className="flex flex-col mt-[15%] items-center justify-center p-8">
            <p className="text-lg">No viewed items available.</p>
        </div>
    )
}