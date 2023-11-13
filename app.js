document.addEventListener('DOMContentLoaded', () => {
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');

  // Fetch and populate currency options
  fetch('https://open.er-api.com/v6/latest')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.rates);
      currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching currencies:', error));
});

function convertCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;

  // Fetch real-time exchange rates
  fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = `<p>${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}</p>`;
    })
    .catch(error => console.error('Error fetching exchange rates:', error));
}