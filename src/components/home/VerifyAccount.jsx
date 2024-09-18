import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useMainState } from '../context/StateContext';
import { Circles } from 'react-loader-spinner';
import { auth } from '../../utils/Endpoint';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export const VerifyAccount = () => {
    const [otp, setOtp] = useState('');
    const { loading, setLoading, closeModal, openModal } = useMainState();
    const activationToken = sessionStorage.getItem('activation_token');

    const handleVerify = async () => {
        if (!otp) {
            toast.error('Please enter the OTP.', { duration: 4000, position: 'top-right' });
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`${auth}/account-activate`, {
                activation_token: activationToken,
                activation_code: otp,
            });
            console.log(res.data)
            toast.success('Account Activated successfully!', {
                duration: 4000,
                position: 'top-right',
            });
            closeModal();
            openModal("LOGIN");
            return res.data;
        } catch (error) {
            console.log(error.message)
            toast.error('Account Activation failed. Please try again.', {
                duration: 4000,
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '50px',
        height: '50px',
        margin: '0 10px',
        fontSize: '24px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-medium mb-6">Verify Your Account</h2>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span style={{ width: '10px' }}></span>}
                renderInput={(props) => <input {...props} style={inputStyle} className="select-none w-20 h-12 border-2 border-gray-300 focus:outline-none rounded-sm text-center text-xl font-semibold" />}
                containerStyle={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
            />
            <button
                onClick={handleVerify}
                className="bg-[#d2710a] mt-3 hover:bg-[#b35e08] w-full max-w-xs text-white py-2 px-5 rounded-sm focus:outline-none transition-all duration-300 ease-in-out"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
                    </div>
                ) : (
                    "Verify Account"
                )}
            </button>
        </div>
    );
}