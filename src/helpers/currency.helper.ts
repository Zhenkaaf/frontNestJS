/* export const formatToUSD = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	
}) */

export const formatToUSD = (amount) => {
	// Используем функцию toLocaleString для форматирования числа с разделителями
	const formattedAmount = amount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})

	// Убираем символ доллара из строки и возвращаем отформатированную строку
	return formattedAmount.substring(1) + ' $'
}
