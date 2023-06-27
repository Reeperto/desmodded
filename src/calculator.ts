// const default_state = JSON.parse(`{"version":10, "randomSeed":"6ae2062c32c1f74831a5d4f90b0b6b72","graph":{"viewport":{"xmin":-10,"ymin":-17.943465792707904,"xmax":10,"ymax":17.943465792707904}},"expressions":{"list":[{"type":"folder","id":"2","title":"Internals","hidden":true,"collapsed":true, "secret": true},{"type":"expression","id":"3","folderId":"2","color":"#2d70b3","latex":"\\\\Gamma\\\\left(x\\\\right)=\\\\left(x-1\\\\right)!"},{"type":"expression","id":"8","folderId":"2","color":"#c74440","latex":"\\\\zeta\\\\left(x\\\\right)=\\\\left\\\\{x>1:\\\\frac{1}{\\\\Gamma\\\\left(x\\\\right)}\\\\int_{0}^{\\\\infty}\\\\frac{t^{x-1}}{e^{t}-1}dt,2^{x}\\\\pi^{x-1}\\\\sin\\\\left(\\\\frac{\\\\pi x}{2}\\\\right)\\\\cdot\\\\frac{1}{\\\\left(1-2^{x}\\\\right)}\\\\int_{0}^{\\\\infty}\\\\frac{t^{-x}}{e^{t}+1}dt\\\\right\\\\}"}]}}`)

export type Calculator = {
	setState: (state: any) => {}
	getState: () => {}
};

export function setupCalculator() {
	var elt = document.getElementById('calculator');

	// @ts-ignore
	let calculator: Calculator = Desmos.GraphingCalculator(elt);
	// calculator.setState(default_state);

	return calculator;
}

