import React, { useEffect, useState } from 'react'
import { useMainState } from '../context/StateContext';
import ListingCard from '../ListingCard';
import DefaultAvatar from "../../assets/images/avatar.png";
import { Loader } from '../animation/loader';
import { property_url } from '../../utils/Endpoint';

const MyProperties = () => {
    const { properties, favorites, fetchProperties, fetchFavorites, selectedTown, currentUser, loadingId, setLoading, setLoadingId } = useMainState();
    const [userProperties, setUserProperties] = useState([]);
    const [isFetchingProperties, setIsFetchingProperties] = useState(true);


    // Fetch properties when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            setIsFetchingProperties(true);
            await fetchProperties();
            await fetchFavorites();
            setIsFetchingProperties(false);
        };

        if (currentUser) fetchData();
    }, [currentUser]);


    useEffect(() => {
        if (properties && currentUser) {

            const filteredProperties = properties.filter(property =>
                property.createdBy._id === currentUser._id &&
                (!selectedTown || property.location === selectedTown.name)
            );
            setUserProperties(filteredProperties);
        }
    }, [properties, currentUser, selectedTown]);


    const handleRemoveListing = async (propertyId) => {
        setLoading(true);
        setLoadingId(propertyId);
        try {
            await api.delete(`${property_url}/remove-property/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            toast.success("Property Removed Successfully");
            await fetchProperties();
        } catch (error) {
            console.error('Error removing property:', error);
            toast.error("Error Removing Property");
        } finally {
            setLoading(false);
            setLoadingId(null);
        }
    };

    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-8">
            <div className="flex flex-wrap gap-8 justify-center">
                {isFetchingProperties ? (
                    <Loader />
                ) : userProperties.length > 0 ? (
                    userProperties.map((property) => (
                        <ListingCard
                            key={property._id}
                            id={property._id}
                            images={property.images.map((img) => img.url)}
                            category={property.category}
                            username={property.createdBy.firstname}
                            description={property.description}
                            availability={property.availability}
                            avatar={property.createdBy?.avatar.url || DefaultAvatar}
                            price={property.price}
                            address={property.address}
                            location={property.location}
                            onRemoveListing={handleRemoveListing}
                            showRemoveButton={true}
                            isFavorited={favorites.includes(property._id)}
                            className="h-[550px]"
                            ctaButton={'Remove Property'}
                            loading={loadingId === property._id}
                        />
                    ))
                ) : (
                    <div className="flex flex-col mt-[15%] items-center justify-center p-8">
                        <p className="text-lg">No properties found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyProperties
