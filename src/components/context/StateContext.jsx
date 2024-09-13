import axios from "axios";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { auth, property_url, favorites_ul, viewing_url } from "../../utils/Endpoint";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const MainContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [step, setStep] = useState(0);
    const [selectedTown, setSelectedTown] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [selectedListing, setSelectedListing] = useState(null);
    const [properties, setProperties] = useState([])
    const [viewings, setViewings] = useState([]);

    // Create Viewing Request
    const createViewingRequest = async (propertyId, viewingType, preferredDate) => {
        try {
            setLoading(true);
            const res = await axios.post(`${viewing_url}/create-viewing`, {
                propertyId,
                viewingType,
                preferredDate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            toast.success("Viewing request created!", { duration: 4000, position: "top-right" });
            setViewings((prev) => [...prev, res.data.viewing]);
        } catch (error) {
            console.error("Error creating viewing request:", error);
            toast.error("Error creating viewing request!", { duration: 4000, position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    // Fetch all user's viewing requests
    const fetchViewings = async () => {
        try {
            const res = await axios.get(`${viewing_url}/get-viewings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setViewings(res.data.viewings);
        } catch (error) {
            console.error("Error fetching viewings:", error);
        }
    };

    useEffect(() => {
        fetchViewings();
    }, []);


    const refreshToken = async () => {
        try {
            const refresh_token = localStorage.getItem('refreshToken');
            const res = await axios.post(`${auth}/refresh-token`, { refresh_token });
            localStorage.setItem('accessToken', res.data.accessToken);
            setToken(res.data.accessToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    // Hook to run every 20 minutes and refresh the token
    useEffect(() => {
        if (currentUser && token) {
            const interval = setInterval(() => {
                refreshToken();
            }, 12 * 60 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [currentUser, token]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setToken(accessToken);
        }
    }, []);


    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${auth}/user-info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(res.data.user);
        } catch (error) {
            console.log("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    };


    const login = async (inputs) => {
        try {
            setLoading(true);
            const res = await axios.post(`${auth}/login`, inputs);
            setCurrentUser(res.data.user);
            setToken(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            await fetchUserInfo();
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchProperties = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${property_url}/get-properties`)
            setProperties(res.data.properties);
        } catch (error) {
            console.error(error.message)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchProperties();
    }, []);

    const logout = async () => {
        try {
            let token = localStorage.getItem('accessToken');
            if (!token) {
                console.warn("No access token found, refreshing token.");
                await refreshToken();
                token = localStorage.getItem('accessToken');
            }

            await axios.get(`${auth}/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            toast.success("Logged out successfully!");
        } catch (error) {
            console.log("Logout error:", error);
            toast.error("Error logging out.");
        }
    };

    // Function to toggle favorites
    const toggleFavorite = async (propertyId) => {
        try {
            const res = await axios.post(`${favorites_ul}/toggle-favorites`, { propertyId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            // Update the state based on whether it's added or removed
            if (res.data.message.includes("added")) {
                // Property added to favorites, update state
                setFavorites((prev) => [...prev, propertyId]);
                toast.success("Added to favorites");
            } else {
                // Property removed from favorites, update state
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
                toast.success("Removed from favorites");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Failed to toggle favorite");
        }
    };

    // Fetch all user's favorite properties
    const fetchFavorites = async () => {
        try {
            const res = await axios.get(`${favorites_ul}/get-favorites`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            // Map the result to an array of property IDs
            const favoriteIds = res.data.favorites.map((fav) => fav.property._id);
            setFavorites(favoriteIds);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const openModal = (type) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setModalType(null);
        setIsOpen(false);
    };
    

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        if (!currentUser) return;
    }, [currentUser]);

    const providerValue = useMemo(() => ({
        openModal,
        closeModal,
        isOpen,
        modalType,
        login,
        logout,
        fetchUserInfo,
        loading,
        setLoading,
        currentUser,
        userInfo,
        step,
        setStep,
        selectedTown,
        setSelectedTown,
        selectedPrice,
        setSelectedPrice,
        selectedLocation,
        setSelectedLocation,
        selectedCategory,
        setSelectedCategory,
        favorites,
        setFavorites,
        toggleFavorite,
        fetchFavorites,
        navigate,
        selectedListing,
        setSelectedListing,
        properties,
        fetchProperties,
        createViewingRequest,
        fetchViewings,
        viewings,
    }), [
        isOpen,
        modalType,
        loading,
        currentUser,
        userInfo,
        step,
        selectedTown,
        selectedPrice,
        selectedLocation,
        selectedCategory,
        favorites,
        navigate,
        selectedListing,
        properties,
        viewings
    ]);

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export const useMainState = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useMainState must be used within a MainStateProvider");
    }
    return context;
};
