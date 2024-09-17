import React, { useEffect, useState } from 'react';
import { useMainState } from '../context/StateContext';
import RequestCard from './RequestCard';
import { Loader } from '../animation/loader';
import api from '../../utils/api';
import { viewing_url } from '../../utils/Endpoint';
import toast from 'react-hot-toast';

const ViewingRequests = () => {
    const { ownerViewings, fetchOwnerViewings, currentUser, selectedTown, loading } = useMainState();
    const [filteredViewings, setFilteredViewings] = useState([]);
    const [loadingAcceptId, setLoadingAcceptId] = useState(null);
    const [loadingRejectId, setLoadingRejectId] = useState(null);

    useEffect(() => {
        if (currentUser) fetchOwnerViewings();
    }, [currentUser]);

    // Function to handle accepting a viewing request
    const handleAcceptRequest = async (requestId) => {
        setLoadingAcceptId(requestId);
        try {
            const response = await api.put(`${viewing_url}/viewings/${requestId}/accept`);
            if (response.data.success) {
                toast.success("Request accepted successfully!");
                fetchOwnerViewings();
            }
        } catch (error) {
            console.error("Error accepting request:", error);
            toast.error("Failed to accept request. Please try again.");
        } finally {
            setLoadingAcceptId(null);
        }
    };

    // Function to handle rejecting a viewing request
    const handleRejectRequest = async (requestId) => {
        setLoadingRejectId(requestId);
        try {
            const response = await api.put(`${viewing_url}/viewings/${requestId}/reject`);
            if (response.data.success) {
                toast.success("Request rejected successfully!");
                fetchOwnerViewings();
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("Failed to reject request. Please try again.");
        } finally {
            setLoadingRejectId(null);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchOwnerViewings();
        }
    }, [currentUser]);

    useEffect(() => {
        if (ownerViewings) {
            const filtered = ownerViewings.filter(viewing =>
                !selectedTown || viewing.property.location === selectedTown.name
            );
            setFilteredViewings(filtered);
        }
    }, [ownerViewings, selectedTown]);

    return (
        <div className="h-screen w-full bg-gray-100 p-4 pt-8">
            <div className="flex flex-wrap gap-8 justify-center">
                {loading ? (
                    <Loader />
                ) : filteredViewings.length > 0 ? (
                    filteredViewings.map(viewing => (
                        <RequestCard
                            key={viewing._id}
                            requestId={viewing._id}
                            property={viewing.property}
                            user={viewing.user}
                            preferredDate={viewing.preferredDate}
                            onAccept={handleAcceptRequest}
                            onReject={handleRejectRequest}
                            loadingAccept={loadingAcceptId === viewing._id}
                            loadingReject={loadingRejectId === viewing._id}
                        />
                    ))
                ) : (
                    <div className="flex flex-col mt-[15%] h-full w-full items-center justify-center p-8">
                        <p className="text-lg ">  No Viewing Request Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewingRequests;
