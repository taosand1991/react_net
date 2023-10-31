export const currencyFormatter = (price: string | number | undefined) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(Number(price));
};
