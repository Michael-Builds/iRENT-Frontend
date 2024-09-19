import React, { useEffect, useState } from 'react';
import { useMainState } from '../context/StateContext';
import { CustomSelect } from '../inputs/Select';
import { Circles } from 'react-loader-spinner';
import api from '../../utils/api';
import { auth } from '../../utils/Endpoint';
import toast from "react-hot-toast"; // Ensure toast notifications are working

const Landlord = () => {
    const { users, fetchAllUsers, setLoading, loading, closeModal } = useMainState();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    // Map users to select options
    const userOptions = users.map(user => ({
        label: `${user.firstname} ${user.lastname}`,
        value: user._id
    }));

    // Role options for selection
    const roleOptions = [
        { label: 'User', value: 'user' },
        { label: 'Landlord', value: 'landlord' },
        { label: 'Admin', value: 'admin' }
    ];

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Handle role update submission
    const handleSubmit = async () => {
        if (!selectedUser || !selectedRole) {
            toast.error("Please select both a user and a role.", { duration: 4000, position: "top-right" });
            return;
        }

        try {
            setLoading(true);

            await api.put(`${auth}/update-role`, {
                userId: selectedUser.value,
                role: selectedRole.value
            });
            toast.success("Role updated successfully!", { duration: 4000, position: "top-right" });
            closeModal();
        } catch (error) {
            toast.error("Error occurred. Please try again.", { duration: 4000, position: "top-right" });
            console.error("Error updating role:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <label htmlFor="userSelect" className="block mb-2 text-sm font-medium">
                    Select a User
                </label>
                <CustomSelect
                    options={userOptions}
                    placeholder="Select a User"
                    value={selectedUser}
                    onChange={(selectedOption) => setSelectedUser(selectedOption)}
                    isLoading={loading}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="roleSelect" className="block mb-2 text-sm font-medium">
                    Select a Role
                </label>
                <CustomSelect
                    options={roleOptions}
                    placeholder="Select a Role"
                    value={selectedRole}
                    onChange={(selectedOption) => setSelectedRole(selectedOption)}
                    isLoading={loading}
                />
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-[#d2710a] hover:bg-[#b35e08] transition-all duration-300 ease-in-out text-white p-2 rounded-full w-full"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                        </div>
                    ) : (
                        "Update Role"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Landlord;
