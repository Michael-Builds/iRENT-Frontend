// Loader component example
import React from 'react';
import { Circles } from 'react-loader-spinner';

export const Loader = () => (
    <div className="h-screen w-full flex items-center justify-center">
        <Circles height="100" width="100" color="#d2710a" ariaLabel="loading" />
    </div>
);
