import React, { useState } from "react"
import { FiLock, FiKey } from "react-icons/fi"
import { useMainState } from "../context/StateContext"
import { Input } from "../inputs/Input"

export const ResetPasswordForm = () => {
    const { openModal } = useMainState()
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState({
        code: "",
        newPassword: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!code || !newPassword) {
            setError({
                code: code ? "" : "Please enter the reset code",
                newPassword: newPassword ? "" : "Please enter your new password",
            })
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <Input
                    label="Reset Code"
                    type="text"
                    placeholder="Enter the reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    error={error.code}
                    icon={<FiKey className="text-gray-400" />}
                />
                <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={error.newPassword}
                    icon={<FiLock className="text-gray-400" />}
                    togglePassword
                />
                <button
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    className="bg-[#d2710a] hover:bg-[#b35e08] w-full text-white py-2 px-5 rounded-sm focus:outline-none transition-all duration-300 ease-in-out"
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}
