import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { ModalContainer } from '../ModalContainer';
import { ScrollToTop } from '../home/ScrollToBottom';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen font-nunito">
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <Navbar />
            </header>
            <main className="flex-1 w-full h-screen overflow-y-auto">
                {children}
                {/* <ScrollToTop /> */}
                <Footer />
            </main>
            <ModalContainer />
            <Toaster />
        </div>
    );
};

export default Layout;
