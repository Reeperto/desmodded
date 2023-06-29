export type Calculator = {
	setState: (state: any) => {}
	getState: () => {}
};

export function setupCalculator() {
	var elt = document.getElementById('calculator');

	// @ts-ignore
	let calculator: Calculator = Desmos.GraphingCalculator(elt);

	return calculator;
}

