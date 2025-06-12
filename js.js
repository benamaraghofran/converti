  const fromAmount = document.getElementById("fromAmount");
  const toAmount = document.getElementById("toAmount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  let currentInput = "";

  function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    fromAmount.value = currentInput;
  }

  function clearInput() {
    currentInput = "";
    fromAmount.value = "";
    toAmount.value = "";
  }

  async function convertCurrency() {
    const amount = parseFloat(currentInput);
    if (isNaN(amount)) {
      alert("Enter a valid number");
      return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.rates[to];
        toAmount.value = (amount * rate).toFixed(2);
      } else {
        alert("Failed to fetch exchange rate.");
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      alert("Could not fetch exchange rate. Check your internet connection.");
    }
  }
  document.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789.";
  if (allowedKeys.includes(e.key)) {
    appendNumber(e.key);
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    fromAmount.value = currentInput;
  } else if (e.key === "Enter") {
    convertCurrency();
  }
});