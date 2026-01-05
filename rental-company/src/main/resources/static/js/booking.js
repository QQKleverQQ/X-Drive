document.addEventListener("DOMContentLoaded", async () => {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const pickupDate = localStorage.getItem("pickupDate");
  const returnDate = localStorage.getItem("returnDate");
  const pickupTime = localStorage.getItem("pickupTime");

  if (!selectedVehicleId) {
    window.location.href = "/offers.html";
    return;
  }

  try {
    const res = await fetch("/api/vehicles");
    const vehicles = await res.json();
    const vehicle = vehicles.find(v => String(v.id) === String(selectedVehicleId));
    if (!vehicle) {
      document.getElementById("booking-container").innerText = "Selected vehicle not found.";
      return;
    }

    document.getElementById("booking-title").innerText = `${vehicle.makeModel} or similar`;
    const basePrice = Number(vehicle.price) || 0;

    const storedPickup = localStorage.getItem("pickupDate");
    const storedReturn = localStorage.getItem("returnDate");
    let days = 1;
    if (storedPickup && storedReturn) {
      const d1 = new Date(storedPickup);
      const d2 = new Date(storedReturn);
      const diffMs = d2 - d1;
      if (diffMs >= 0) {
        days = Math.max(1, Math.ceil(diffMs / (1000*60*60*24)));
      }
    }

    const bookingData = {
      days,
      basePricePerDay: basePrice,
      insurance: {
        max: { name: "Maximum deductible", price: 0 },
        zero: { name: "Zero deductible", price: 21 }
      },
      addons: {
        additionalDriver: { name: "Additional driver", price: 5 },
        navigation: { name: "Navigation system", price: 15 },
        tireProtection: { name: "Tire & windshield protection", price: 5 }
      }
    };

    let selectedInsurance = "max";
    let selectedAddons = [];

    function calculateTotal() {
      let daily = bookingData.basePricePerDay;
      daily += bookingData.insurance[selectedInsurance].price;
      selectedAddons.forEach(a => daily += bookingData.addons[a].price);
      const total = daily * bookingData.days;
      document.getElementById("pricePerDay").innerText = `$${daily.toFixed(2)} / day`;
      document.getElementById("totalPrice").innerText = `$${total.toFixed(2)}`;
    }

    calculateTotal();

    document.querySelectorAll("input[name='insurance']").forEach(radio => {
      radio.addEventListener("change", e => {
        selectedInsurance = e.target.value;
        calculateTotal();
      });
    });

    document.querySelectorAll(".addon").forEach(cb => {
      cb.addEventListener("change", e => {
        const val = e.target.value;
        if (e.target.checked) selectedAddons.push(val);
        else selectedAddons = selectedAddons.filter(x => x !== val);
        calculateTotal();
      });
    });

    const bookingCarImg = document.getElementById("booking-car");
    bookingCarImg.src = `assets/${vehicle.imageUrl}`; 


  } catch (err) {
    console.error(err);
    document.getElementById("booking-container").innerText = "Failed to load booking data.";
  }
});