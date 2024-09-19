import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { auth, favorites_url, property_url, viewing_url } from "../../utils/Endpoint";
import { logoutUser } from "../../utils/auth";

export const AuthContext = createContext();

export const MainContextProvider = ({ children }) => {
    // State Variables
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [step, setStep] = useState(0);
    const [selectedTown, setSelectedTown] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [properties, setProperties] = useState([]);
    const [viewings, setViewings] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [ownerViewings, setOwnerViewings] = useState([]);
    const navigate = useNavigate();

    // Helper Functions
    const storeUserAndToken = (user, accessToken, refreshToken) => {
        setCurrentUser(user);
        setToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const handleApiError = (error, defaultMessage) => {
        console.error(error);
        // toast.error(defaultMessage || "An error occurred.");
    };

    const updateTokenAndRetry = async (refreshToken) => {
        try {
            const refreshRes = await api.post(`${auth}/refresh-token`, { refresh_token: refreshToken });
            const newAccessToken = refreshRes.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            setToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            logoutUser();
            throw new Error("Failed to refresh token. Please log in again.");
        }
    };

    // Authentication Functions
    const checkAuthOnMount = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken && !refreshToken) {
            logoutUser();
            return;
        }

        try {
            const res = await api.get(`${auth}/user-info`);
            setCurrentUser(res.data.user);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const newAccessToken = await updateTokenAndRetry(refreshToken);
                    const userRes = await api.get(`${auth}/user-info`);
                    setCurrentUser(userRes.data.user);
                } catch {
                    logoutUser();
                }
            } else {
                handleApiError(error, "Error fetching user info");
            }
        }
    };

    useEffect(() => {
        checkAuthOnMount();
    }, []);

    const login = async (inputs, rememberMe) => {
        try {
            setLoading(true);
            const res = await api.post(`${auth}/login`, inputs);
            storeUserAndToken(res.data.user, res.data.accessToken, res.data.refreshToken);
            await fetchUserInfo();
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("rememberMe");
            }
            return res.data;
        } catch (error) {
            handleApiError(error, "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.get(`${auth}/logout`);
            setCurrentUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            toast.success("Logged out successfully!");
            navigate("/");
        } catch (error) {
            handleApiError(error, "Error logging out.");
        }
    };

    // Fetching Data Functions
    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${auth}/user-info`);
            setUserInfo(res.data.user);
        } catch (error) {
            console.log(error.message)
            // handleApiError(error, "Error fetching user info");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${auth}/all-users`);
            setUsers(res.data.users);
        } catch (error) {
            handleApiError(error, "Error fetching users.");
        } finally {
            setLoading(false);
        }
    };

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${property_url}/get-properties`);
            setProperties(res.data.properties);
        } catch (error) {
            handleApiError(error, "Error fetching properties.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchViewings = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${viewing_url}/get-viewings`);
            setViewings(res.data.viewings);
        } catch (error) {
            handleApiError(error, "Error fetching viewings.");
        } finally {
            setLoading(false);
        }
    };

    const fetchOwnerViewings = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${viewing_url}/viewings/owner-requests`);
            setOwnerViewings(res.data.viewings);
        } catch (error) {
            handleApiError(error, "Error fetching owner viewings.");
        } finally {
            setLoading(false);
        }
    };

    // Action Functions
    const createViewingRequest = async (propertyId, viewingType, preferredDate) => {
        try {
            if (!currentUser) {
                openModal("LOGIN")
            }
            setLoading(true);
            const res = await api.post(`${viewing_url}/create-viewing`, { propertyId, viewingType, preferredDate });
            toast.success("Viewing request created!", { duration: 4000 });
            setViewings((prev) => [...prev, res.data.viewing]);
            await fetchViewings();
        } catch (error) {
            handleApiError(error, "Error creating viewing request.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (propertyId) => {
        try {
            if (!currentUser) {
                openModal("LOGIN")
            }
            const res = await api.post(`${favorites_url}/toggle-favorites`, { propertyId });
            if (res.data.message.includes("added")) {
                setFavorites((prev) => [...prev, propertyId]);
                toast.success("Added to favorites");
            } else {
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
                toast.success("Removed from favorites");
            }
        } catch (error) {
            handleApiError(error, "Failed to toggle favorite");
        }
    };

    const fetchFavorites = async () => {
        try {
            const res = await api.get(`${favorites_url}/get-favorites`);
            const favoriteIds = res.data.favorites.map((fav) => fav.property._id);
            setFavorites(favoriteIds);
        } catch (error) {
            handleApiError(error, "Error fetching favorites");
        }
    };

    // Modal Handling Functions
    const openModal = (type) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setModalType(null);
        setIsOpen(false);
    };

    useEffect(() => {
        if (currentUser) localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    // Context Value Memoization
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
        token,
        loadingId,
        setLoadingId,
        fetchOwnerViewings,
        ownerViewings,
        users,
        fetchAllUsers
    }), [
        isOpen,
        users,
        loadingId,
        token,
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
        viewings,
        ownerViewings
    ]);

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

// Hook to use the AuthContext
export const useMainState = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useMainState must be used within a MainContextProvider");
    }
    return context;
};
