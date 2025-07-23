
### npx playwright test nombreDelArchivo -g "Verify Login Page" --repeat-each 5

### Ejecutar todos los test
`npx playwright test`

### Para ejecutar por titulo del test -g o -grep
`npx playwright test -g "Verify Login Page"`
o
`npx playwright test --grep "Verify Login Page"`

### Para ejecutar los tests de un archivo

`npx playwright test LoginTests.spec.ts `

### Para ejecutar un test de un archivo por titulo del test 

`npx playwright test LoginTests.spec.ts --grep "Verify Login Page"`
o
`npx playwright test LoginTests.spec.ts --grep "Verify Login Page"`

### Para debugear
`npx playwright test -g "Verify Login Page" --debug`


### Mostar reporte
`npx playwright show-report`
