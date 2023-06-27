import { invoke } from '@tauri-apps/api/tauri'
import { save, open } from '@tauri-apps/api/dialog';
import { Calculator } from './calculator';

export async function load_file(Calc: Calculator) {
	const filePath = await open({
		filters: [{
			name: 'DesmosFile',
			extensions: ['desmos']
		}]
	});

	if (filePath) {
		await invoke('load_file', {
			path: filePath
		}).then((state) => {
			if (typeof (state) === 'string') {
				console.log(JSON.parse(state));
				Calc.setState(JSON.parse(state));
			}
		}).catch((error) => console.error(error));
	}
}

export async function save_file(Calc: Calculator) {
	const filePath = await save({
		filters: [{
			name: 'DesmosFile',
			extensions: ['desmos']
		}]
	});

	if (filePath) {
		await invoke('save_file', {
			path: filePath,
			state: JSON.stringify(Calc.getState())
		}).catch((error) => console.error(error));
	}
}
