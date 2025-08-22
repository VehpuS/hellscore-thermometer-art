export const currencies = [
    { value: 'ILS', label: 'ILS - Israeli New Shekel', symbol: '₪' },
    { value: 'USD', label: 'USD - United States Dollar', symbol: '$' },
    { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
    { value: 'JPY', label: 'JPY - Japanese Yen', symbol: '¥' },
    { value: 'GBP', label: 'GBP - British Pound Sterling', symbol: '£' },
    { value: 'AUD', label: 'AUD - Australian Dollar', symbol: '$' },
    { value: 'CAD', label: 'CAD - Canadian Dollar', symbol: '$' },
    { value: 'CHF', label: 'CHF - Swiss Franc', symbol: 'CHF' },
    { value: 'CNY', label: 'CNY - Chinese Yuan', symbol: '¥' },
    { value: 'SEK', label: 'SEK - Swedish Krona', symbol: 'kr' },
    { value: 'NZD', label: 'NZD - New Zealand Dollar', symbol: '$' },
    { value: 'MXN', label: 'MXN - Mexican Peso', symbol: '$' },
    { value: 'SGD', label: 'SGD - Singapore Dollar', symbol: '$' },
    { value: 'HKD', label: 'HKD - Hong Kong Dollar', symbol: '$' },
    { value: 'NOK', label: 'NOK - Norwegian Krone', symbol: 'kr' },
    { value: 'KRW', label: 'KRW - South Korean Won', symbol: '₩' },
    { value: 'TRY', label: 'TRY - Turkish Lira', symbol: '₺' },
    { value: 'RUB', label: 'RUB - Russian Ruble', symbol: '₽' },
    { value: 'INR', label: 'INR - Indian Rupee', symbol: '₹' },
    { value: 'BRL', label: 'BRL - Brazilian Real', symbol: 'R$' },
    { value: 'ZAR', label: 'ZAR - South African Rand', symbol: 'R' },
    { value: 'custom', label: 'Custom Currency', symbol: '' }
];

export const getCurrencySymbol = (currencyCode) => {
    if (!currencyCode || currencyCode === 'custom') return '';
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.symbol : currencyCode;
};

export const formatCurrency = (amount, design) => {
    const { currency, custom_currency_symbol, currency_position } = design;
    const value = (amount || 0).toLocaleString();

    if (currency === 'custom') {
        const symbol = custom_currency_symbol || '';
        return currency_position === 'right' ? `${value}${symbol}` : `${symbol}${value}`;
    } else {
        const symbol = getCurrencySymbol(currency);
        // Standard currencies are positioned on the left for simplicity.
        return `${symbol}${value}`;
    }
};