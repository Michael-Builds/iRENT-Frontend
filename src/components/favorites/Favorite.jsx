import React, { useEffect, useState } from 'react'
import { useMainState } from '../context/StateContext';
import ListingCard from '../ListingCard';
import DefaultAvatar from "../../assets/images/avatar.png";
import { Loader } from '../animation/loader';

const FavoritesPage = () => {
    const { favorites, properties, selectedTown, loading, fetchFavorites, currentUser, toggleFavorite } = useMainState();
    const [userFavorites, setUserFavorites] = useState([]);
    const [isFetchingFavorites, setIsFetchingFavorites] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                setIsFetchingFavorites(true);
                await fetchFavorites();
                setIsFetchingFavorites(false);
            }
        };
        fetchData();
    }, [currentUser]);

    // Filter the properties to match the user's favorites
    useEffect(() => {
        if (favorites && properties && currentUser) {
            const filteredFavorites = properties.filter(property =>
                favorites.includes(property._id) &&
                (!selectedTown || property.location === selectedTown.name)
            );
            setUserFavorites(filteredFavorites);
        }
    }, [favorites, properties, currentUser, selectedTown]);


    // Handler to remove property from favorites (toggle)
    const handleRemoveFavorite = (propertyId) => {
        toggleFavorite(propertyId);
    };

    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-8">
            <div className="flex flex-wrap gap-8 justify-center">
                {isFetchingFavorites ? (
                    <Loader />
                ) : userFavorites.length > 0 ? (
                    userFavorites.map((favorite) => (
                        <ListingCard
                            key={favorite._id}
                            id={favorite._id}
                            images={favorite.images.map(img => img.url)}
                            category={favorite.category}
                            username={favorite.createdBy.firstname}
                            description={favorite.description}
                            availability={favorite.availability}
                            avatar={favorite.createdBy?.avatar.url || DefaultAvatar}
                            price={favorite.price}
                            address={favorite.address}
                            isFavorited={true}
                            location={favorite.location}
                            onRemoveListing={() => handleRemoveFavorite(favorite._id)}
                            showRemoveButton={true}
                            className="h-[550px]"
                            ctaButton={"Remove from Favorites"}
                        />
                    ))
                ) : (
                    <div className="flex flex-col mt-[15%] items-center justify-center p-8">
                        <p className="text-lg">No favorite properties found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavoritesPage
