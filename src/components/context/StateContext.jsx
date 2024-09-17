import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { auth, favorites_ul, property_url, viewing_url } from "../../utils/Endpoint";

export const AuthContext = createContext();

export const MainContextProvider = ({ children }) => {
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


    // New function to fetch all users (admin-only)
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${auth}/all-users`);
            setUsers(res.data.users);

        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to create viewing request
    const createViewingRequest = async (propertyId, viewingType, preferredDate) => {
        try {
            setLoading(true);
            const res = await api.post(`${viewing_url}/create-viewing`, {
                propertyId,
                viewingType,
                preferredDate
            });

            toast.success("Viewing request created!", { duration: 4000 });
            setViewings(prev => [...prev, res.data.viewing]);
            console.log("Viewing request", res.data.viewing)
            return res.data.viewing
        } catch (error) {
            toast.error("Error creating viewing request.", { duration: 4000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch all user's viewing requests
    const fetchViewings = async () => {
        try {
            const res = await api.get(`${viewing_url}/get-viewings`);
            setViewings(res.data.viewings);
        } catch (error) {
            console.error("Error fetching viewings:", error);
        }
    };


    // New function to fetch owner's viewing requests
    const fetchOwnerViewings = async () => {
        try {
            setLoading(true);
            const res = await api.get(`${viewing_url}/viewings/owner-requests`);
            setOwnerViewings(res.data.viewings);
        } catch (error) {
            console.error("Error fetching owner's viewings:", error);
        } finally {
            setLoading(false);
        }
    };


    // Fetch user information
    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const res = await api.get(`${auth}/user-info`);
            setUserInfo(res.data.user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    };

    // Updated login function to handle errors
    const login = async (inputs, rememberMe) => {
        try {
            setLoading(true);
            const res = await api.post(`${auth}/login`, inputs);

            // If login is successful
            setCurrentUser(res.data.user);
            setToken(res.data.accessToken);

            // Store user and token
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("rememberMe");
            }

            await fetchUserInfo();
            return true;
        } catch (error) {
            console.error("Login error:", error);

            // Handle different types of errors
            if (error.response) {
                // Server responded with a status code outside 2xx range
                const message = error.response.data.message || "Invalid credentials. Please try again.";
                throw new Error(message);
            } else if (error.request) {
                // Request made but no response received
                throw new Error("Network error. Please check your connection.");
            } else {
                // Something else happened
                throw new Error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch properties
    const fetchProperties = async () => {
        setLoading(true);
        try {
            const res = await api.get(`${property_url}/get-properties`);
            setProperties(res.data.properties);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Function to log out the user
    const logout = async () => {
        try {
            await api.get(`${auth}/logout`);
            setCurrentUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            toast.success("Logged out successfully!");
            navigate("/")
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error logging out.");
        }
    };


    // Function to toggle favorites
    const toggleFavorite = async (propertyId) => {
        try {
            const res = await api.post(`${favorites_ul}/toggle-favorites`, { propertyId });
            if (res.data.message.includes("added")) {
                setFavorites(prev => [...prev, propertyId]);
                toast.success("Added to favorites");
            } else {
                setFavorites(prev => prev.filter(id => id !== propertyId));
                toast.success("Removed from favorites");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Failed to toggle favorite");
        }
    };


    // Function to fetch favorites
    const fetchFavorites = async () => {
        try {
            const res = await api.get(`${favorites_ul}/get-favorites`);
            const favoriteIds = res.data.favorites.map(fav => fav.property._id);
            setFavorites(favoriteIds);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };


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

export const useMainState = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useMainState must be used within a MainStateProvider");
    }
    return context;
};
