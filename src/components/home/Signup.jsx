import React, { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import Github from "../../assets/images/github.png";
import Google from "../../assets/images/google.png";
import { useMainState } from "../context/StateContext";
import { Input } from "../inputs/Input";
import AlternateLoginButton from "../buttons/AlternateAuth";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "../../utils/Endpoint";


export const SignupForm = () => {
    const { setLoading, loading, openModal, closeModal } = useMainState();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    // Validate input fields
    const validateFields = () => {
        const newErrors = {};
        if (!firstname) newErrors.firstname = "First name is required.";
        if (!lastname) newErrors.lastname = "Last name is required.";
        if (!email) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle errors during signup
    const handleError = (error) => {
        if (error.response && error.response.data) {
            const { message, errors } = error.response.data;

            if (message === "Email already exists") {
                toast.error("Email already exists. Please use a different one.", {
                    duration: 4000,
                    position: "top-right",
                });
            } else {
                toast.error(message || "An error occurred. Please try again.", {
                    duration: 4000,
                    position: "top-right",
                });
            }

            setError(errors || {});
        } else {
            toast.error("An error occurred. Please try again.", {
                duration: 4000,
                position: "top-right",
            });
        }
    };

    // Submit the signup form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setError({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        });

        // Validate the form
        if (!validateFields()) return;

        try {
            setLoading(true);
            const formData = { firstname, lastname, email, password };
            const res = await axios.post(`${auth}/register`, formData);

            sessionStorage.setItem('activation_token', res.data.activationToken);

            toast.success("Account created successfully!", {
                duration: 4000,
                position: "top-right",
            });

            
            // Reset the form
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");

            closeModal();
            openModal("VERIFY_ACCOUNT");
            return res.data;
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <Input
                label="First Name"
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                error={error.firstname}
                icon={<FiUser className="text-gray-400" />}
            />
            <Input
                label="Last Name"
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                error={error.lastname}
                icon={<FiUser className="text-gray-400" />}
            />
            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                icon={<FiMail className="text-gray-400" />}
            />
            <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
                icon={<FiLock className="text-gray-400" />}
                togglePassword
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-5 rounded-sm focus:outline-none transition-all duration-300 ease-in-out"
            >
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                    </div>
                ) : (
                    "Signup"
                )}
            </button>
            <div className="flex flex-col gap-4 items-center">
                <AlternateLoginButton
                    src={Google}
                    alt="Google"
                    height={22}
                    width={22}
                    text="Signup with Google"
                />
                <AlternateLoginButton
                    src={Github}
                    alt="Github"
                    height={25}
                    width={25}
                    text="Signup with Github"
                />
            </div>
            <div className="flex text-sm mt-2 items-center gap-2 justify-center">
                <p>Already have an account?</p>
                <a href="#" onClick={() => openModal("LOGIN")}>
                    Login
                </a>
            </div>
        </form>
    );
};
