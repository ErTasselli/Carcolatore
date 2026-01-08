const EXCHANGE_RATE = 1.08; // 1 EUR = 1.08 USD
let currentCurrency = 'EUR';

function getCurrencySymbol() {
    return currentCurrency === 'EUR' ? '€' : '$';
}

function updateCurrencyLabels() {
    const symbol = getCurrencySymbol();
    const labels = document.querySelectorAll('.currency-label');
    labels.forEach(label => {
        const text = label.textContent;
        if (text.includes('€') || text.includes('$')) {
            label.textContent = text.replace(/[€$]/g, symbol);
        }
    });
}

function calculateSharesAffordable() {
    const capital = parseFloat(document.getElementById('capital').value);
    const pricePerShare = parseFloat(document.getElementById('pricePerShare').value);

    if (isNaN(capital) || isNaN(pricePerShare) || capital < 0 || pricePerShare <= 0) {
        document.getElementById('sharesAffordable').textContent = '—';
        return;
    }

    const sharesAffordable = Math.floor(capital / pricePerShare);
    document.getElementById('sharesAffordable').textContent = sharesAffordable + ' azioni';
}

function calculateDesiredPercentage() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount2').value);
    const desiredGain = parseFloat(document.getElementById('desiredGain').value);

    if (isNaN(investmentAmount) || isNaN(desiredGain) || investmentAmount <= 0) {
        document.getElementById('desiredPercentage').textContent = '—';
        return;
    }

    const percentage = (desiredGain / investmentAmount) * 100;
    document.getElementById('desiredPercentage').textContent = percentage.toFixed(2) + ' %';
}

function calculateGainFromPercentage() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount3').value);
    const growthPercentage = parseFloat(document.getElementById('growthPercentage').value);

    if (isNaN(investmentAmount) || isNaN(growthPercentage) || investmentAmount <= 0) {
        document.getElementById('gainFromPercentage').textContent = '—';
        document.getElementById('gainFromPercentageNet').textContent = '—';
        return;
    }

    const gain = (investmentAmount * growthPercentage) / 100;
    const taxRate = 0.26;
    const taxAmount = gain * taxRate;
    const netGain = gain - taxAmount;

    const symbol = getCurrencySymbol();
    document.getElementById('gainFromPercentage').textContent = symbol + ' ' + gain.toFixed(2);
    document.getElementById('gainFromPercentageNet').textContent = symbol + ' ' + netGain.toFixed(2);
}

function calculateTargetPrice() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount4').value);
    const sharesOwned = parseFloat(document.getElementById('sharesOwned').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);

    if (isNaN(investmentAmount) || isNaN(sharesOwned) || sharesOwned <= 0 || investmentAmount <= 0) {
        document.getElementById('averagePrice').textContent = '—';
        document.getElementById('totalGain').textContent = '—';
        document.getElementById('gainPercentage').textContent = '—';
        document.getElementById('totalGainNet').textContent = '—';
        return;
    }

    const averagePrice = investmentAmount / sharesOwned;
    const symbol = getCurrencySymbol();
    document.getElementById('averagePrice').textContent = symbol + ' ' + averagePrice.toFixed(2);

    if (isNaN(targetPrice) || targetPrice < 0) {
        document.getElementById('totalGain').textContent = '—';
        document.getElementById('gainPercentage').textContent = '—';
        document.getElementById('totalGainNet').textContent = '—';
        return;
    }

    const targetValue = sharesOwned * targetPrice;
    const totalGain = targetValue - investmentAmount;
    const gainPercentage = (totalGain / investmentAmount) * 100;

    const taxRate = 0.26;
    const taxAmount = totalGain * taxRate;
    const netGain = totalGain - taxAmount;

    document.getElementById('totalGain').textContent = symbol + ' ' + totalGain.toFixed(2);
    document.getElementById('gainPercentage').textContent = gainPercentage.toFixed(2) + ' %';
    document.getElementById('totalGainNet').textContent = symbol + ' ' + netGain.toFixed(2);
}

function calculateTaxes() {
    const grossProfit = parseFloat(document.getElementById('grossProfit').value);

    if (isNaN(grossProfit) || grossProfit < 0) {
        document.getElementById('taxAmount').textContent = '—';
        document.getElementById('netProfit').textContent = '—';
        return;
    }

    const taxRate = 0.26;
    const taxAmount = grossProfit * taxRate;
    const netProfit = grossProfit - taxAmount;

    const symbol = getCurrencySymbol();
    document.getElementById('taxAmount').textContent = symbol + ' ' + taxAmount.toFixed(2);
    document.getElementById('netProfit').textContent = symbol + ' ' + netProfit.toFixed(2);
}

function calculateSimulation() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount6').value);
    const sharesOwned = parseFloat(document.getElementById('sharesOwned6').value);
    const currentPrice = parseFloat(document.getElementById('currentPrice').value);
    const targetPercentage = parseFloat(document.getElementById('targetPercentage').value);

    const symbol = getCurrencySymbol();

    // Calcolo percentuale realizzata
    if (isNaN(investmentAmount) || isNaN(sharesOwned) || isNaN(currentPrice) || 
        investmentAmount <= 0 || sharesOwned <= 0 || currentPrice < 0) {
        document.getElementById('currentPercentage').textContent = '—';
        document.getElementById('priceForTarget').textContent = '—';
        return;
    }

    const currentValue = sharesOwned * currentPrice;
    const currentGain = currentValue - investmentAmount;
    const currentPercentageValue = (currentGain / investmentAmount) * 100;

    document.getElementById('currentPercentage').textContent = currentPercentageValue.toFixed(2) + ' %';

    // Calcolo prezzo target per percentuale obiettivo
    if (isNaN(targetPercentage)) {
        document.getElementById('priceForTarget').textContent = '—';
        return;
    }

    const targetValue = investmentAmount * (1 + (targetPercentage / 100));
    const targetPrice = targetValue / sharesOwned;

    document.getElementById('priceForTarget').textContent = symbol + ' ' + targetPrice.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener per il cambio di valuta
    document.getElementById('currency').addEventListener('change', function() {
        currentCurrency = this.value;
        updateCurrencyLabels();
        // Ricalcola tutto quando cambia la valuta
        calculateSharesAffordable();
        calculateDesiredPercentage();
        calculateGainFromPercentage();
        calculateTargetPrice();
        calculateTaxes();
        calculateSimulation();
    });

    document.getElementById('capital').addEventListener('input', calculateSharesAffordable);
    document.getElementById('pricePerShare').addEventListener('input', calculateSharesAffordable);

    document.getElementById('investmentAmount2').addEventListener('input', calculateDesiredPercentage);
    document.getElementById('desiredGain').addEventListener('input', calculateDesiredPercentage);

    document.getElementById('investmentAmount3').addEventListener('input', calculateGainFromPercentage);
    document.getElementById('growthPercentage').addEventListener('input', calculateGainFromPercentage);

    document.getElementById('investmentAmount4').addEventListener('input', calculateTargetPrice);
    document.getElementById('sharesOwned').addEventListener('input', calculateTargetPrice);
    document.getElementById('targetPrice').addEventListener('input', calculateTargetPrice);

    document.getElementById('grossProfit').addEventListener('input', calculateTaxes);

    document.getElementById('investmentAmount6').addEventListener('input', calculateSimulation);
    document.getElementById('sharesOwned6').addEventListener('input', calculateSimulation);
    document.getElementById('currentPrice').addEventListener('input', calculateSimulation);
    document.getElementById('targetPercentage').addEventListener('input', calculateSimulation);

    // Inizializza le etichette di valuta
    updateCurrencyLabels();
});
