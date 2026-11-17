const billingOptions = document.querySelectorAll('input[name="billing-interval"]');
const planCards = document.querySelectorAll(".plan-card");
const selectionStatus = document.querySelector(".selection-status");

function updatePrices(interval) {
  planCards.forEach((card) => {
    const monthlyPrice = Number(card.dataset.monthly);
    const annualPrice = Number(card.dataset.annual);
    const price = interval === "annual" ? annualPrice : monthlyPrice;
    const priceValue = card.querySelector(".price-value");
    const pricePeriod = card.querySelector(".price-period");
    const billingNote = card.querySelector(".billing-note");
    const savingsNote = card.querySelector(".savings-note");

    priceValue.textContent = price;
    pricePeriod.textContent = "/ month";

    if (interval === "annual") {
      const annualTotal = annualPrice * 12;
      const annualSavings = (monthlyPrice * 12) - annualTotal;
      billingNote.textContent = `Billed $${annualTotal} yearly`;
      savingsNote.textContent = `Save $${annualSavings} per year`;
      savingsNote.hidden = false;
    } else {
      billingNote.textContent = "Billed monthly";
      savingsNote.hidden = true;
    }
  });
}

billingOptions.forEach((option) => {
  option.addEventListener("change", (event) => {
    updatePrices(event.target.value);
  });
});

document.querySelectorAll(".plan-cta").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCard = button.closest(".plan-card");
    const planName = selectedCard.querySelector("h2").textContent;

    document.querySelectorAll(".plan-card").forEach((card) => {
      const planButton = card.querySelector(".plan-cta");
      const isSelected = card === selectedCard;

      card.classList.toggle("selected", isSelected);
      planButton.setAttribute("aria-pressed", String(isSelected));
    });

    selectionStatus.textContent = `${planName} plan selected.`;
  });
});