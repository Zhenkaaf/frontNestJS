export const formatDate = (dateStr: string): string => {
	const date = new Date(dateStr)

	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}

	const formattedDate = date.toLocaleDateString('en-US', options)
	const [month, day, year] = formattedDate.split(' ')

	return `${day} ${month} ${year}`.replace(',', '')
}
