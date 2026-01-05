const citySelect = document.getElementById("city-select");
const heroCar = document.getElementById("heroCar");
const heroTitle = document.getElementById("heroTitle");
const modal = document.getElementById("adModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal .close");

const pickupDateInput = document.getElementById("pickup-date");
const pickupTimeInput = document.getElementById("pickup-time");
const returnDateInput = document.getElementById("return-date");
const returnTimeInput = document.getElementById("return-time");


function setupDateTimeLimits() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    pickupDateInput.setAttribute('min', today);
    returnDateInput.setAttribute('min', today);

    pickupDateInput.addEventListener('input', () => {
        returnDateInput.setAttribute('min', pickupDateInput.value);
        if (returnDateInput.value < pickupDateInput.value) {
            returnDateInput.value = pickupDateInput.value;
        }
    });
}

function isTimeInPast(dateInput, timeInput) {
    const now = new Date();
    const selectedDate = new Date(dateInput.value);
    
    if (dateInput.value === now.toISOString().split('T')[0]) {
        const [hours, minutes] = timeInput.value.split(':');
        selectedDate.setHours(parseInt(hours), parseInt(minutes), 0);
        return selectedDate < now;
    }
    return false;
}

setupDateTimeLimits();

document.querySelectorAll(".ad-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modalImg.src = card.dataset.img;
        modal.style.display = "block";
    });
});

if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

const carMap = {
    "New York": { img: "/assets/car-ny.png", text: "Premium cars in New York" },
    "Tel Aviv": { img: "/assets/car-il.png", text: "Drive Tel Aviv in style" },
    "Moscow": { img: "/assets/car-ru.png", text: "Executive cars in Moscow" },
    "Vienna": { img: "/assets/car-au.png", text: "Luxury rides in Vienna" }
};

citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    if (!city || !carMap[city]) return;
    heroCar.style.opacity = 0;
    setTimeout(() => {
        heroCar.src = carMap[city].img;
        heroTitle.textContent = carMap[city].text;
        heroCar.style.opacity = 1;
    }, 300);
});

document.getElementById("search-btn").onclick = () => {
    const city = citySelect.value;
    const pDate = pickupDateInput.value;
    const pTime = pickupTimeInput.value;
    const rDate = returnDateInput.value;
    const rTime = returnTimeInput.value;

    if (!city) return alert("Select city");
    if (!pDate || !pTime || !rDate || !rTime) return alert("Please fill in all date and time fields");

    const startDateTime = new Date(`${pDate}T${pTime}`);
    const endDateTime = new Date(`${rDate}T${rTime}`);
    const now = new Date();

    if (startDateTime < now) {
        return alert("Pickup time cannot be in the past!");
    }

    if (endDateTime <= startDateTime) {
        return alert("Return time must be at least 1 hour after pickup time!");
    }

    localStorage.setItem("selectedCity", city);
    localStorage.setItem("pickupDate", pDate);
    localStorage.setItem("pickupTime", pTime);
    localStorage.setItem("returnDate", rDate);
    localStorage.setItem("returnTime", rTime);

    location.href = "offers.html";
};