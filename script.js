const eventList = document.getElementById("eventList");
const eventForm = document.getElementById("eventForm");
const warningMessage = document.getElementById("warningMessage");
const searchInput = document.getElementById("searchInput");

let events = [
    {
        name: "Tech Conference",
        date: "2026-02-10",
        description: "Annual technology conference"
    },
    {
        name: "Music Night",
        date: "2025-12-01",
        description: "Live music event"
    }
];

function displayEvents(filteredEvents = events) {
    eventList.innerHTML = "";

    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    filteredEvents.forEach((event, index) => {
        const card = document.createElement("div");
        card.classList.add("event-card");

        const today = new Date().toISOString().split("T")[0];
        if (event.date < today) {
            card.classList.add("past");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
}

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value;

    if (!name || !date || !description) {
        warningMessage.textContent = "All fields are required!";
        return;
    }

    warningMessage.textContent = "";

    events.push({ name, date, description });
    eventForm.reset();
    displayEvents();
});

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchValue) ||
        event.date.includes(searchValue)
    );

    displayEvents(filtered);
});

displayEvents();
