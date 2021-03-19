function ComponenteActivo(identificador, riesgo, moneda, claseTermometro, nombre, etiqueta, descripcion, porcentaje, cuotaparte) {
    return `
    <div id="activo-${identificador}" class="card r-${riesgo} moneda-${moneda}">
        <i class="${claseTermometro}" aria-hidden="true"></i>
        <h4 class="card-header">${nombre} <span>(${etiqueta})</span></h4>
        <div class="card-body">
            <h5 class="card-title">${descripcion}</h5>
            <p class="moneda">${moneda}</p>
            <p class="card-text">Anual</p>
            <p class="porcentaje-anual"><i class="fas fa-arrow-up" aria-hidden="true"></i>${porcentaje}%</p>
            <p class="card-text">Valor de cuotaparte</p>
            <p class="valor-cuotaparte">${cuotaparte}</p>
            <button class="btn btn-primary boton-conoce-mas">Conocé mas</button>
        </div>
    </div>
    `
}

function ComponenteConoceMas(etiqueta, porcentaje) {
    return `
    <div class="conoce-mas" id="conoce-mas">
        <i class="fas fa-times" id="cerrar-conoce-mas" aria-hidden="true"></i>
        <div class="formulario" id="formulario">
            <label for="nombre-activo">Activo</label>
            <input class="form-control" id="nombre-activo" type="text" value="${etiqueta}" aria-label="Disabled input" disabled="">
            <label for="dinero-inicial">Inversion Inicial</label>
            <input type="number" min="0" id="dinero-inicial">
            <label for="porcentaje-activo">Porcentaje</label>
            <input class="form-control" id="porcentaje-activo" type="number" value="${porcentaje}" aria-label="Disabled input" disabled="">
            <p>Especifique el tiempo de su inversion:</p>
            <ul>
                <li>
                    <label for="tiempo-anios">Años</label>
                    <input type="number" min="0" id="tiempo-anios">
                    </li>
                <li>
                    <label for="tiempo-meses">Meses</label>
                    <input type="number" min="0" id="tiempo-meses">
                </li>
                <li>
                    <label for="tiempo-dias">Dias</label>
                    <input type="number" min="0" id="tiempo-dias">
                </li>
            </ul>
            <label for="reinvertir">¿Invierte mas dinero al finalizar cada mes?</label>
            <select class="form-select" aria-label="Default select" id="reinvertir">
                <option value="SI">SI</option>
                <option selected="" value="NO">NO</option>
            </select>
            <div id="contenedor-reinversion" style="display: none;">
                <label for="cantidad-reinvertida">Ingrese cantidad extra a invertir cada fin de mes:</label>
                <input type="number" min="0" id="cantidad-reinvertida">
            </div>
            <button id="calcular-ganancia">Calcular</button>
        </div>
    </div>
    `
}

function ComponenteResultadoConoceMas(ganancia, dinero_final) {
    return `
    <div id="conoce-mas-resultado">
        <label for="ganancia-inversion">Ganancia</label>
        <input class="form-control" id="ganancia-inversion" type="number" value="${ganancia}" aria-label="Disabled input" disabled="">
        <label for="dinero-final">Dinero final</label>
        <input class="form-control" id="dinero-final" type="number" value="${dinero_final}" aria-label="Disabled input" disabled="">
        <button id="agregar-resumen">Agregar al resumen</button>
    </div>
    `
}

function ComponenteResumenHeader() {
    return `
    <div class="resumen-inversiones" id="resumen-inversiones">
        <h3>Resumen</h3>
        <table class="table" id="contenido-resumen">
            <thead>
                <tr>
                    <th scope="column"></th>
                    <th scope="column">Nombre</th>
                    <th scope="column">Dinero Inicial</th>
                    <th scope="column">%</th>
                    <th scope="column">Años</th>
                    <th scope="column">Meses</th>
                    <th scope="column">Dias</th>
                    <th scope="column">Reinversión</th>
                    <th scope="column">Ganancia</th>
                    <th scope="column">Dinero Final</th>
                    <th scope="column"></th>
                </tr>
            </thead>
            <tbody id="contenido-tabla">
            </tbody>
        </table>
    </div>
    `
}

function ComponenteResumenBody(identificador, etiqueta, dinero_inicial, porcentaje, anios, meses, dias, cantidad_reinvertida, ganancia, dinero_final) {
    return `
    <tr id="inversion-${identificador}">
        <th scope="row">${identificador}</th>
        <td>${etiqueta}</td>
        <td class="texto-derecha">${dinero_inicial}</td>
        <td>${porcentaje}</td>
        <td>${anios}</td>
        <td>${meses}</td>
        <td>${dias}</td>
        <td>${cantidad_reinvertida}</td>
        <td class="texto-derecha">${ganancia}</td>
        <td class="texto-derecha">${dinero_final}</td>
        <td><i class="fas fa-window-close remover" id="remover" aria-hidden="true"></i></td>
    </tr>
    `
}

function ComponenteResumenFooter(totalInicial, totalGanancia, totalFinal) {
    return `
    <tfoot>
        <tr>
            <td></td>
            <td>Total</td>
            <td class="texto-derecha">${totalInicial}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="texto-derecha">${totalGanancia}</td>
            <td class="texto-derecha">${totalFinal}</td>
            <td></td>
        </tr>
    </tfoot>
    `
}