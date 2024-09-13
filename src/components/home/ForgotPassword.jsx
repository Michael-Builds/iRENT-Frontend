import React, { useState } from "react"
import { FiMail } from "react-icons/fi"
import { useMainState } from "../context/StateContext"
import { Input } from "../inputs/Input"


export const ForgotPasswordForm = () => {
    const { openModal } = useMainState()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            setError("Please enter your email")
            return
        }
        openModal("RESET_PASSWORD")

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    icon={<FiMail className="text-gray-400" />}
                />
                <button
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-5 rounded-sm focus:outline-none transition-all duration-300 ease-in-out"
                >
                    Reset Password
                </button>
            </form>
            <div className="flex text-sm mt-2 items-center gap-2 justify-center">
                <p>Remember your password?</p>
                <a href="#" onClick={() => openModal("LOGIN")}>
                    Login
                </a>
            </div>
        </div>
    )
}

