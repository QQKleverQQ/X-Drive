const city = localStorage.getItem("selectedCity");

document.getElementById("city-header").innerText = `Cars in ${city || 'Selected City'}`;

fetch(`/api/vehicles?city=${encodeURIComponent(city)}`)
  .then(res => res.json())
  .then(cars => {
    const container = document.getElementById("cars-container");
    container.innerHTML = "";

    if (!cars.length) {
      container.innerHTML = "<p>No cars found</p>";
      return;
    }

    cars.forEach(c => {
      const card = document.createElement("div");
      card.className = "car-card";
      card.innerHTML = `
        <img src="assets/${c.imageUrl}" alt="${c.makeModel}">
        <div class="car-info">
          <span class="category-tag">${c.category}</span>
          <h3>${c.makeModel}</h3>
          <p class="location-text">${c.city.name}</p>
          <div class="price-box">
            <div>
              <span class="amount">$${c.price}</span>
              <span class="period">/ day</span>
            </div>
            <button class="rent-btn">Select</button>
          </div>
        </div>
      `;

      card.querySelector(".rent-btn").onclick = () => {
        localStorage.setItem("selectedVehicleId", c.id);

        const bookingData = {
          id: c.id,
          model: c.makeModel,
          pricePerDay: c.price,
          total: `$${c.price}`,
          image: `assets/${c.imageUrl}`,
          city: city 
        };
        
        localStorage.setItem("bookingData", JSON.stringify(bookingData));

        location.href = "booking.html";
      };

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error loading cars:", error);
    document.getElementById("cars-container").innerText = "Failed to load cars";
  });