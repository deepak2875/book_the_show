// script.js

// Replace with your unique CRUDCRUD API URL
const apiUrl = "http://localhost:5000/api/bookings";

document.addEventListener("DOMContentLoaded", fetchBookings);

const addBookingButton = document.getElementById("addBooking");
addBookingButton.addEventListener("click", addBooking);

const findSlotButton = document.getElementById("findSlot");
findSlotButton.addEventListener("click", findSlot);

async function fetchBookings() {
    try {
        const response = await fetch(apiUrl);
        const bookings = await response.json();
        bookings.forEach(displayBooking);
        updateTotalBooked();
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

async function addBooking() {
    const userName = document.getElementById("userName").value.trim();
    const seatNumber = document.getElementById("seatNumber").value.trim();

    if (userName && seatNumber) {
        const booking = { userName, seatNumber };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(booking),
            });
            const newBooking = await response.json();
            displayBooking(newBooking);
            updateTotalBooked();
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    } else {
        alert("Please enter both user name and seat number.");
    }
}

function displayBooking(booking) {
    const bookingList = document.getElementById("bookingList");
    const li = document.createElement("li");
    li.id = booking._id;
    li.innerHTML = `
        ${booking.userName} - Seat ${booking.seatNumber}
        <div>
            <button onclick="editBooking('${booking._id}')">Edit</button>
            <button onclick="deleteBooking('${booking._id}')">Delete</button>
        </div>
    `;
    bookingList.appendChild(li);
}

async function deleteBooking(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        document.getElementById(id).remove();
        updateTotalBooked();
    } catch (error) {
        console.error("Error deleting booking:", error);
    }
}

async function editBooking(id) {
    const userName = prompt("Enter new user name:");
    const seatNumber = prompt("Enter new seat number:");

    if (userName && seatNumber) {
        const updatedBooking = { userName, seatNumber };

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBooking),
            });
            document.getElementById(id).innerHTML = `
                ${updatedBooking.userName} - Seat ${updatedBooking.seatNumber}
                <div>
                    <button onclick="editBooking('${id}')">Edit</button>
                    <button onclick="deleteBooking('${id}')">Delete</button>
                </div>
            `;
        } catch (error) {
            console.error("Error editing booking:", error);
        }
    }
}

function updateTotalBooked() {
    const totalBooked = document.getElementById("bookingList").children.length;
    document.getElementById("totalBooked").textContent = totalBooked;
}

async function findSlot() {
    const seatNumber = document.getElementById("findSeatNumber").value.trim();
    if (seatNumber) {
        try {
            const response = await fetch(apiUrl);
            const bookings = await response.json();
            const seatFound = bookings.some(booking => booking.seatNumber === seatNumber);
            document.getElementById("slotResult").textContent = seatFound ? "Booked" : "Available";
        } catch (error) {
            console.error("Error finding seat:", error);
        }
    } else {
        alert("Please enter a seat number to find.");
    }
}
