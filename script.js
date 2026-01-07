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
        return;
    }

    const gain = (investmentAmount * growthPercentage) / 100;
    document.getElementById('gainFromPercentage').textContent = '€ ' + gain.toFixed(2);
}

function calculateTargetPrice() {
    const investmentAmount = parseFloat(document.getElementById('investmentAmount4').value);
    const sharesOwned = parseFloat(document.getElementById('sharesOwned').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);

    if (isNaN(investmentAmount) || isNaN(sharesOwned) || sharesOwned <= 0 || investmentAmount <= 0) {
        document.getElementById('averagePrice').textContent = '—';
        document.getElementById('totalGain').textContent = '—';
        document.getElementById('gainPercentage').textContent = '—';
        return;
    }

    const averagePrice = investmentAmount / sharesOwned;
    document.getElementById('averagePrice').textContent = '€ ' + averagePrice.toFixed(2);

    if (isNaN(targetPrice) || targetPrice < 0) {
        document.getElementById('totalGain').textContent = '—';
        document.getElementById('gainPercentage').textContent = '—';
        return;
    }

    const targetValue = sharesOwned * targetPrice;
    const totalGain = targetValue - investmentAmount;
    const gainPercentage = (totalGain / investmentAmount) * 100;

    document.getElementById('totalGain').textContent = '€ ' + totalGain.toFixed(2);
    document.getElementById('gainPercentage').textContent = gainPercentage.toFixed(2) + ' %';
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

    document.getElementById('taxAmount').textContent = '€ ' + taxAmount.toFixed(2);
    document.getElementById('netProfit').textContent = '€ ' + netProfit.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
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
});
