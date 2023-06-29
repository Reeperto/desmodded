import { load_file, save_file } from './graph_file';
import { listen } from '@tauri-apps/api/event'
import { register } from '@tauri-apps/api/globalShortcut';
import { setupCalculator } from './calculator';

let Calc = setupCalculator();

register('CommandOrControl+s', () => {
	save_file(Calc);
})

register('CommandOrControl+o', () => {
	load_file(Calc);
})


listen('file_management', (event) => {
	switch (event.payload) {
		case 'save':
			save_file(Calc);
			break;
		case 'load':
			load_file(Calc);
			break;
	}
})

const autocmds = 'alpha beta sqrt theta Theta phi Phi pi Pi tau nthroot cbrt sum prod int ans percent infinity infty gamma Gamma delta Delta epsilon epsiv zeta eta kappa lambda Lambda mu xi Xi rho sigma Sigma chi Chi psi Psi omega Omega digamma iota nu upsilon Upsilon square mid parallel nparallel perp times div approx'.split(" ");

function RegisterAutocommands() {
	let fields = document.querySelectorAll('.dcg-mq-editable-field');
	fields.forEach(field => {
		// @ts-ignore
		const opt = field._mqMathFieldInstance.__options;
		for (let i = 0; i < autocmds.length; ++i) {
			opt.autoCommands[autocmds[i]] = 1;
			opt.handlers.fns.enter = () => RegisterAutocommands();
			opt.handlers.fns.upOutOf = () => RegisterAutocommands();
			opt.handlers.fns.downOutOf = () => RegisterAutocommands();
		}
	})
}

RegisterAutocommands()
