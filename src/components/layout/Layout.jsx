import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ModalContainer } from '../ModalContainer';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-nunito">
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <Navbar />
            </header>

            {/* Main container with content and footer scrolling together */}
            <main className="flex-1 w-full relative">
                <div className="flex flex-col min-h-screen">
                    {/* Content container grows to fill the available space */}
                    <div className="flex-grow overflow-y-auto">
                        {children}
                    </div>

                    {/* Footer should always stay at the bottom, even on small screens */}
                    <footer className="text-white">
                        <Footer />
                    </footer>
                </div>
            </main>
            <ModalContainer />
            <Toaster />
        </div>
    );
};

export default Layout;
