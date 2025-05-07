// const socket = io();


// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(
//         (position) => {
//             const {latitude, longitude} = position.coords;
//             socket.emit("send-location", {latitude, longitude});
//         },
//         (error) => {
//             console.error(error);
//         },
//         {
//             enableHighAccuracy: true,
//             maximumAge: 0,
//             timeout: 5000
//         }
//     );
// }

// //L.map("map").setView([0, 0], 16);
// const map = L.map("map").setView([0, 0], 16);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution: "Sheriyans coding school"
// }).addTo(map);

// //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// const markers = {};

// socket.on("receive-location", (data) => {
//     const {id,latitude, longitude} = data;
//     map.setView([latitude, longitude]);
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }
// });

// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });

const socket = io();
const markers = {}; // Store multiple people's markers

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Sheriyans coding school"
}).addTo(map);

// Handling multiple users
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (markers[id]) {
        // Update marker position if already exists
        markers[id].setLatLng([latitude, longitude],16);
    } else {
        // Create a new marker for a new user
        markers[id] = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`User ${id}`).openPopup();
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        // Remove the marker from the map
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});


// const socket = io();
// const markers = {}; // Store multiple objects' markers

// const map = L.map("map").setView([20.5937, 78.9629], 5); // Centered on India

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Sheriyans coding school"
// }).addTo(map);

// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;

//     if (markers[id]) {
//         // Update marker position if it already exists
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         // Create a new marker for a new object
//         markers[id] = L.marker([latitude, longitude]).addTo(map)
//             .bindPopup(`Object ${id}`).openPopup();
//     }
// });

// // Remove markers when objects disconnect
// socket.on("object-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });
