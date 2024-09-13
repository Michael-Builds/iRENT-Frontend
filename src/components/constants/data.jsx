export const towns = [
    { id: 1, name: "Accra", region: "Greater Accra" },
    { id: 2, name: "Kumasi", region: "Ashanti" },
    { id: 3, name: "Tamale", region: "Northern" },
    { id: 4, name: "Takoradi", region: "Western" },
    { id: 5, name: "Cape Coast", region: "Central" },
    { id: 6, name: "Ho", region: "Volta" },
    { id: 7, name: "Sunyani", region: "Bono" },
    { id: 8, name: "Koforidua", region: "Eastern" },
    { id: 9, name: "Wa", region: "Upper West" },
    { id: 10, name: "Bolgatanga", region: "Upper East" },
    { id: 11, name: "Techiman", region: "Bono East" },
    { id: 12, name: "Tema", region: "Greater Accra" },
    { id: 13, name: "Obuasi", region: "Ashanti" },
    { id: 14, name: "Sefwi Wiawso", region: "Western North" },
    { id: 15, name: "Dambai", region: "Oti" },
    { id: 16, name: "Bawku", region: "Upper East" },
    { id: 17, name: "Nsawam", region: "Eastern" },
    { id: 18, name: "Nkawkaw", region: "Eastern" },
    { id: 19, name: "Axim", region: "Western" },
    { id: 20, name: "Goaso", region: "Ahafo" }
];


export const listings = [
    {
        id: 1,
        images: [
            'https://dq5r178u4t83b.cloudfront.net/wp-content/uploads/sites/133/2021/07/09160124/So_-Berlin-Das-Stue-Hotel-_-Suite.jpg',
            'https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg',
            'https://www.wilsonhomes.com.au/sites/default/files/styles/hero_image/public/My%20project%20-%202023-06-20T095818.329%20%281%29_0.jpg?itok=86RMvcZw',
        ],
        category: 'Two bedroom Suite',
        username: 'John Doe',
        description: 'Modern 3-bed townhouse, downtown location.',
        availability: 'Available',
        price: 450,
        address: '123 Main St, Metropolis',
        location: "Tamale",
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
        amenities: ['Air Conditioning', 'Wi-Fi', 'Parking', 'Gym', 'Pool'],
        size: '1500 sqft',
        type: 'Apartment',
        yearBuilt: 2018,
        contactInfo: {
            phone: '123-456-7890',
            email: 'johndoe@example.com'
        },
        reviews: [
            {
                reviewer: 'Alice',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Loved the place! Perfect for a family getaway.',
                rating: 5
            },
            {
                reviewer: 'Bob',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Great location, and the amenities were top-notch.',
                rating: 4
            }
        ]
    },
    {
        id: 2,
        images: [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412110583.jpg?k=c7d6c6a3ef9306f2313482709ffd6e781eceffd91c5f9963fc4dc0c99c86b69e&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/443692576.jpg?k=a6ef46e594839d6a128c8456673c6bd71043de35d392e19ac0ced79a520d1db7&o=&hp=1',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/443692551.jpg?k=811933e4d4f24c28dc3854e73d5d5b32d8e5d920a0176eb0494f7de55cc4af89&o=&hp=1',
        ],
        category: '3 bedroom Suite',
        username: 'Jane Smith',
        description: 'A beautiful luxury villa with scenic views.',
        availability: 'Available',
        price: 1200,
        location: "Goaso",
        address: '456 Ocean Blvd, Malibu',
        avatar: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        amenities: ['Wi-Fi', 'Balcony', 'Beach View', 'Private Parking'],
        size: '2000 sqft',
        type: 'Villa',
        yearBuilt: 2020,
        contactInfo: {
            phone: '234-567-8901',
            email: 'janesmith@example.com'
        },
        reviews: [
            {
                reviewer: 'Michael',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Amazing experience. The view was breathtaking.',
                rating: 5
            },
            {
                reviewer: 'Diana',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Perfect for a relaxing weekend away from the city.',
                rating: 4
            }
        ]
    },
    {
        id: 3,
        images: [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/495585215.jpg?k=4016d5039397fb0b8d83dd5be6ed1cc852c74261643c29a2d726251892a751bb&o=&hp=1',
            'https://www.carnivalcruiseline.de/sites/default/files/styles/header-full/public/couple-balcony-stateroom-jpg.jpg?itok=9G7A_A-N',
            'https://img.cruisecritic.net/cms-sb/f/1005231/389a0f6682/carnival-valor_carnival-cruise-line_cabin_4206.jpg?w=800',
        ],
        category: '4 bedroom apartment',
        username: 'Mike Ross',
        description: 'Cozy apartment located in a prime area.',
        availability: 'Rented',
        price: 800,
        address: '789 Downtown Ave, Chicago',
        location: "Nkawkaw",
        avatar: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        amenities: ['Public Transport Nearby', 'Pet-Friendly', 'Gym', 'Laundry'],
        size: '1600 sqft',
        type: 'Apartment',
        yearBuilt: 2015,
        contactInfo: {
            phone: '345-678-9012',
            email: 'mikeross@example.com'
        },
        reviews: [
            {
                reviewer: 'Jessica',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Great location, but could use some modern updates.',
                rating: 3
            },
            {
                reviewer: 'Steve',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Perfect for a short-term stay. Very convenient.',
                rating: 4
            }
        ]
    },
    {
        id: 4,
        images: [
            'https://www.caldwellcline.com/wp-content/uploads/2020/09/017-1080x675.jpg',
            'https://as2.ftcdn.net/v2/jpg/05/97/99/07/1000_F_597990781_gXH1yiv4UAGlzQeOUH0SSixjn5CmijMj.jpg',
            'https://img.freepik.com/premium-photo/wooden-house-forest-interior-design-modern-living-room-with-wooden-lining_954355-1131.jpg',
        ],
        category: '3 bedroom semi-detached',
        username: 'Sarah Parker',
        description: 'Spacious condo with a modern design.',
        availability: 'Available',
        price: 950,
        location: "Techiman",
        address: '321 Urban St, San Francisco',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
        amenities: ['Garage', 'Open Floor Plan', 'Nearby Parks', 'Modern Kitchen'],
        size: '1800 sqft',
        type: 'Condo',
        yearBuilt: 2017,
        contactInfo: {
            phone: '456-789-0123',
            email: 'sarahparker@example.com'
        },
        reviews: [
            {
                reviewer: 'Anna',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Beautiful design and very spacious. Perfect for families.',
                rating: 5
            },
            {
                reviewer: 'Mark',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4NTB8MHwxfGFsbHw0fHx8fHx8fHwxNjk0NTM2MDU4fA&ixlib=rb-4.0.3&q=80&w=50',
                comment: 'Loved the modern kitchen and the nearby parks.',
                rating: 4
            }
        ]
    },
    {
        id: 5,
        images: [
            'https://img1.wsimg.com/isteam/stock/Qzl9x4Q/:/cr=t:0%25,l:0%25,w:100%25,h:100%25',
            'https://cdn.onekindesign.com/wp-content/uploads/2024/08/Modern-Craftsman-Dream-House-California-Ridgecrest-Designs-01-1-Kindesign-600x400.jpg',
            'https://media.licdn.com/dms/image/v2/D4E10AQEHmtCtKNzTsQ/image-shrink_800/image-shrink_800/0/1689944828104?e=2147483647&v=beta&t=ho13p6SHPuxXiD9MM_eXhpO6SBysAJWYXOlpGwFCrU8',
        ],
        category: 'Townhouse',
        username: 'David Chen',
        description: 'A large townhouse in a family-friendly environ.',
        availability: 'Available',
        price: 700,
        location: "Obuasi",
        address: '456 Suburb Dr, Brooklyn',
        avatar: 'https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
        amenities: ['Outdoor Space', 'Nearby Schools', 'Parking', 'Family-Friendly Neighborhood'],
        size: '1900 sqft',
        type: 'Townhouse',
        yearBuilt: 2016,
        contactInfo: {
            phone: '567-890-1234',
            email: 'davidchen@example.com'
        },
        reviews: [
            {
                reviewer: 'Linda',
                avatar: 'https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                comment: 'Great family home with plenty of space and a wonderful neighborhood.',
                rating: 5
            },
            {
                reviewer: 'Tom',
                avatar: 'https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                comment: 'The outdoor space is perfect for kids.',
                rating: 4
            }
        ]
    },
];
