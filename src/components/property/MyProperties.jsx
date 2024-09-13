import React, { useEffect, useState } from 'react'
import { useMainState } from '../context/StateContext';
import ListingCard from '../ListingCard';
import DefaultAvatar from "../../assets/images/avatar.png";

const MyProperties = () => {
    const { properties, fetchProperties, fetchViewings, selectedTown, currentUser } = useMainState();
    const [userProperties, setUserProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
        fetchViewings();
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
        try {
            await axios.delete(`${property_url}/remove-property/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            toast.success("Property Removed Successfully");
            fetchProperties();
        } catch (error) {
            console.error('Error removing property:', error);
            toast.error("Error Removing Property");
        }
    };

    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-8">
            <div className="flex flex-wrap gap-8 justify-center">
                {userProperties.length > 0 ? (
                    userProperties.map((property) => (
                        <ListingCard
                            key={property._id}
                            id={property._id}
                            images={property.images.map(img => img.url)}
                            category={property.category}
                            username={property.createdBy.firstname}
                            description={property.description}
                            availability={property.availability}
                            avatar={property.createdBy?.avatar.url || DefaultAvatar}
                            price={property.price}
                            address={property.address}
                            isFavorited={false}
                            location={property.location}
                            onRemoveListing={handleRemoveListing}
                            showRemoveButton={true}
                            className="h-[590px]"
                            ctaButton={"Remove Property"}
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
