import { useState } from "react"
import { FiLock, FiMail } from "react-icons/fi"
import Github from "../../assets/images/github.png"
import Google from "../../assets/images/google.png"
import AlternateLoginButton from "../buttons/AlternateAuth"
import Checkbox from "../inputs/Checkbox"
import { useMainState } from "../context/StateContext"
import { Input } from "../inputs/Input"
import { Circles } from 'react-loader-spinner';
import toast from "react-hot-toast"

export const LoginForm = () => {
    const { login, loading, closeModal, openModal } = useMainState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState({ email: "", password: "" });

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setError({ email: "", password: "" });

        // Validate form fields
        if (!validateFields()) return;

        try {
            await login({ email, password }, rememberMe);
            toast.success("Logged in successfully!", { duration: 4000, position: "top-right" });
            closeModal();
        } catch (error) {
            toast.error("Login failed. Please try again.", { duration: 4000, position: "top-right" });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error.email}
                    icon={<FiMail className="text-gray-400" />}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error.password}
                    icon={<FiLock className="text-gray-400" />}
                    togglePassword
                />
                <div className="flex text-sm items-center justify-between">
                    <Checkbox
                        label="Remember Me?"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <a href="#" onClick={() => openModal("FORGOT_PASSWORD")}>
                        Forgot Password?
                    </a>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#d2710a]  hover:bg-[#b35e08] w-full text-white py-2 px-5 rounded-sm  focus:outline-none transition-all duration-300 ease-in-out"
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Circles
                                height="20"
                                width="20"
                                color="#fff"
                                ariaLabel="loading"
                            />
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="flex flex-col gap-4 items-center">
                    <AlternateLoginButton
                        src={Google}
                        alt="Google"
                        height={22}
                        width={22}
                        text="Login with Google"
                    />
                    <AlternateLoginButton
                        src={Github}
                        alt="Github"
                        height={25}
                        width={25}
                        text="Login with Github"
                    />
                </div>
                <div className="flex text-sm mt-2 items-center gap-2 justify-center">
                    <p>Don't have an account?</p>
                    <a href="#" onClick={() => openModal("SIGNUP")}>
                        Signup
                    </a>
                </div>
            </form>
        </div>
    )
}

