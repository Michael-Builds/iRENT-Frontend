import React, { useRef, useState, useEffect } from 'react';
import { towns } from '../constants/data';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useMainState } from '../context/StateContext';

const Tabs = () => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { selectedTown, setSelectedTown } = useMainState();

    const handleCategorySelection = (town) => {
        setSelectedTown(town);
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    return (
        <div className="relative w-full select-none bg-white border-t-[1.5px] border-gray-200 px-5 py-3 flex items-center justify-between">
            {/* Left Arrow */}
            <ArrowButton
                direction="left"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
            />

            {/* Scrollable Towns */}
            <div className="flex-1 overflow-hidden mx-5" style={{ width: '80%' }}>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto whitespace-nowrap scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <TownItem
                        town={{ id: 0, name: "All" }}
                        onClick={() => handleCategorySelection(null)}
                        isSelected={!selectedTown}
                    />
                    {towns.map((town, index) => (
                        <TownItem
                            key={index}
                            town={town}
                            onClick={() => handleCategorySelection(town)}
                            isSelected={selectedTown && selectedTown.id === town.id}
                        />
                    ))}
                </div>
            </div>

            {/* Right Arrow */}
            <ArrowButton
                direction="right"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
            />
        </div>
    );
};

function TownItem({ town, onClick, isSelected }) {
    return (
        <button
            className={`inline-block m-1.5 rounded-full text-center p-2 min-w-[120px] mx-2 transition-all duration-300 ease-in-out ${isSelected
                ? 'bg-[#d57107] text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
            onClick={onClick}
        >
            <p className="text-sm font-semibold">{town.name}</p>
        </button>
    );
}


function ArrowButton({ direction, onClick, disabled }) {
    const Icon = direction === 'left' ? MdKeyboardArrowLeft : MdKeyboardArrowRight;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-gradient-to-b from-[#d57107] to-[#d70505] w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
        >
            <Icon size={24} />
        </button>
    );
}

export default Tabs;
