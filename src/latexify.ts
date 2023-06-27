function latexify(calculator: any) {
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
