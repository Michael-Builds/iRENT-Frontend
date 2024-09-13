import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Show the button when the page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-gradient-to-b from-[#d57107] to-[#d70505] text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ease-in-out hover:opacity-80"
                >
                    <MdKeyboardArrowUp size={24} />
                </button>
            )}
        </div>
    );
};

