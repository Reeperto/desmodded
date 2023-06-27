import { invoke } from '@tauri-apps/api/tauri'
import { save, open } from '@tauri-apps/api/dialog';

const re = /\\backslash /g;

var elt = document.getElementById('calculator');

// @ts-ignore
var calculator = Desmos.GraphingCalculator(elt);

function latexify() {
    let id = calculator.selectedExpressionId;
    let exprs = calculator.getExpressions();

    for (let i = 0; i < exprs.length; i++) {
        let expr = exprs[i];

        if (expr.id == id) {
            calculator.setExpression({
                id: id,
                latex: expr.latex.replaceAll(re, "\\")
            });
        }
    }
}

async function load_file() {
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
                calculator.setState(JSON.parse(state));
            }
        }).catch((error) => console.error(error));
    }
}

async function save_file() {
    const filePath = await save({
        filters: [{
            name: 'DesmosFile',
            extensions: ['desmos']
        }]
    });

    if (filePath) {
        await invoke('save_file', {
            path: filePath,
            state: JSON.stringify(calculator.getState())
        }).catch((error) => console.error(error));
    }
}

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
        latexify();
    }

    if (event.code == 'F5') {
        save_file();
    }

    if (event.code == 'F6') {
        load_file();
    }
});
