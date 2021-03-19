/* HEADER */
function scroll_links_header() {
    $(".a-activos").click(function() {
        $('html, body').animate({
            scrollTop: $(".inversiones").offset().top
        }, 500)
    })
    $(".a-preguntas-frecuentes").click(function() {
        $('html, body').animate({
            scrollTop: $("#preguntas-frecuentes").offset().top
        }, 500)
    })
    $(".a-contacto").click(function() {
        $('html, body').animate({
            scrollTop: $("#contacto").offset().top
        }, 500)
    })
}

function cambio_logo_hover() {
    $('#logo').hover(function() {
        $('#logo img').attr('src', 'img/logo2.png')
    }, function() {
        $('#logo img').attr('src', 'img/logo.png')
    })
}

/* SECCION INVERSIONES */
function crear_activos(activos) {
    for (i = 0; i < activos.length; i++) {
        let nombre = activos[i].nombre
        let etiqueta = activos[i].etiqueta
        let descripcion = activos[i].descripcion
        let moneda = activos[i].moneda
        let porcentaje = activos[i].porcentaje
        let cuotaparte = activos[i].cuotaparte
        let riesgo = activos[i].riesgo
        let identificador = i

        let claseTermometro = 'fas fa-thermometer-quarter icono-termometro'
        if (riesgo == 'medio') {
            claseTermometro = 'fas fa-thermometer-three-quarters icono-termometro'
        } else if (riesgo == 'alto') {
            claseTermometro = 'fas fa-thermometer-full icono-termometro'
        }

        $('#productos').append(ComponenteActivo(identificador, riesgo, moneda, claseTermometro, nombre, etiqueta, descripcion, porcentaje, cuotaparte))
    }
}

function validar_solo_numeros(nombre_id) {
    $('#' + nombre_id).keypress(function(tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) {
            return false
        }
    })
}

function calcular_inversion(dinero_inicial, porcentaje_inversion, dias, meses, anios, reinvertir, cantidad_reinvertida) {

    let dinero_final = 0
    let ganancia = 0

    let ganancia_anual = dinero_inicial * (porcentaje_inversion / 100)
    let ganancia_mes = ganancia_anual / 12
    let ganancia_dia = ganancia_anual / 365

    let total_meses = anios * 12 + meses
    let total_anios = anios + meses / 12 + dias / 365

    for (i = 1; i <= total_meses; i++) {
        ganancia += ganancia_mes
        dinero_inicial += ganancia_mes
        if (reinvertir == true) {
            dinero_inicial += cantidad_reinvertida
        }
        ganancia_mes = dinero_inicial * (porcentaje_inversion / 100) / 12
    }
    dinero_final = dinero_inicial + ganancia_dia * dias
    ganancia += ganancia_dia * dias

    return [Number.parseFloat(ganancia).toFixed(2), Number.parseFloat(dinero_final).toFixed(2)]
}

function crear_conoce_mas(evento) {
    let numero = evento.target.parentNode.parentNode.id.split('-')[1]
    let etiqueta = activos[numero].etiqueta
    let porcentaje = activos[numero].porcentaje

    let contenedorConoceMas = $('#contenedor-conoce-mas')
    contenedorConoceMas.attr('class', 'contenedor-conoce-mas')
    contenedorConoceMas.append(ComponenteConoceMas(etiqueta, porcentaje))

    validar_solo_numeros('dinero-inicial')
    validar_solo_numeros('tiempo-anios')
    validar_solo_numeros('tiempo-meses')
    validar_solo_numeros('tiempo-dias')
    validar_solo_numeros('cantidad-reinvertida')

    $("#reinvertir").change(function() {
        $('#contenedor-reinversion').slideToggle(500)
    })

    $('#cerrar-conoce-mas').click(cerrar_conoce_mas)
    $('#calcular-ganancia').click(agregar_resultado_conoce_mas)

    $('#conoce-mas').slideToggle(1000)
}

function agregar_resultado_conoce_mas() {
    let dinero_inicial = parseInt($('#dinero-inicial').val())
    let porcentaje = parseInt($('#porcentaje-activo').val())
    let anios = parseInt($('#tiempo-anios').val())
    let meses = parseInt($('#tiempo-meses').val())
    let dias = parseInt($('#tiempo-dias').val())
    let reinvertir = false
    let cantidad_reinvertida = 0
    if ($('#reinvertir').val() == 'SI') {
        reinvertir = true
        cantidad_reinvertida = parseInt($('#cantidad-reinvertida').val())
    }

    // Si ningun valor está vacío entra en el if, sino muestra una alerta para que el usuario los complete
    if (dinero_inicial.toString() != 'NaN' && anios.toString() != 'NaN' && meses.toString() != 'NaN' && dias.toString() != 'NaN' && cantidad_reinvertida.toString() != 'NaN') {
        // Si es la primera vez que presiona 'calcular' entonces agrega los resultados, sino los reemplaza
        if ($('#ganancia-inversion')[0] == null) {

            let valores = calcular_inversion(dinero_inicial, porcentaje, dias, meses, anios, reinvertir, cantidad_reinvertida)
            let ganancia = valores[0]
            let dinero_final = valores[1]

            $('#formulario').append(ComponenteResultadoConoceMas(ganancia, dinero_final))

            $('#agregar-resumen').click(agregar_resumen)

            $('#conoce-mas-resultado').slideToggle(1000)

        } else {
            dinero_inicial = parseInt($('#dinero-inicial').val())
            porcentaje = parseInt($('#porcentaje-activo').val())
            anios = parseInt($('#tiempo-anios').val())
            meses = parseInt($('#tiempo-meses').val())
            dias = parseInt($('#tiempo-dias').val())
            reinvertir = false
            cantidad_reinvertida = 0
            if ($('#reinvertir').val() == 'SI') {
                reinvertir = true
                cantidad_reinvertida = parseInt($('#cantidad-reinvertida').val())
            }

            valores = calcular_inversion(dinero_inicial, porcentaje, dias, meses, anios, reinvertir, cantidad_reinvertida)
            ganancia = valores[0]
            dinero_final = valores[1]

            $('#ganancia-inversion').attr('value', ganancia)
            $('#dinero-final').attr('value', dinero_final)
        }
    } else {
        alertify.notify('Por favor, complete los campos en blanco', 'alerta')
    }
}

function cerrar_conoce_mas() {
    $('#contenedor-conoce-mas').removeAttr('class').empty()
}

function agregar_resumen() {

    // Creo un array vacío donde colocar el resumen
    let resumen = []

    // Compruebo si la clave "resumen" del storage no es null (vacía)
    if (localStorage.getItem("resumen") != null) {
        // Si no es null entonces a resumen le asigno el valor parseado de la clave "resumen" del storage
        resumen = JSON.parse(localStorage.getItem("resumen"))
    }

    let inversion = {
        'etiqueta': $('#nombre-activo').val(),
        'porcentaje': $('#porcentaje-activo').val(),
        'dinero_inicial': $('#dinero-inicial').val(),
        'anios': $('#tiempo-anios').val(),
        'meses': $('#tiempo-meses').val(),
        'dias': $('#tiempo-dias').val(),
        'cantidad_reinvertida': $('#cantidad-reinvertida').val(),
        'ganancia': $('#ganancia-inversion').val(),
        'dinero_final': $('#dinero-final').val()
    }

    // Agrego la inversion al array resumen
    resumen.push(inversion)

    // Convierto el resumen en string (el storage no admite objetos) y luego lo coloco en la clave "resumen" del localstorage
    localStorage.setItem("resumen", JSON.stringify(resumen))

    cerrar_conoce_mas()
}

function abrir_resumen(evento) {
    let resumenGuardado = JSON.parse(localStorage.getItem("resumen"))

    // Si el Resumen no es null (vacio) entonces por cada elemento asigno los valores que necesito a variables
    if (resumenGuardado != null && resumenGuardado.length > 0) {

        // Cambio el icono de abrir resumen por el de cerrar resumen
        $('#abrir-resumen').attr('style', 'display:none;')
        $('#cerrar-resumen').removeAttr('style')

        // Asigno la clase para el fondo del resumen y agrego la estructura del resumen
        $('#contenedor-resumen-inversiones').attr('class', 'contenedor-resumen-inversiones').append(ComponenteResumenHeader())

        // Variables que se usan en el footer de la tabla
        let totalInicial = 0
        let totalGanancia = 0
        let totalFinal = 0

        for (let i = 0; i < resumenGuardado.length; i++) {
            let etiquetaResumen = resumenGuardado[i].etiqueta
            let porcentajeResumen = resumenGuardado[i].porcentaje
            let dineroInicialResumen = resumenGuardado[i].dinero_inicial
            let aniosResumen = resumenGuardado[i].anios
            let mesesResumen = resumenGuardado[i].meses
            let diasResumen = resumenGuardado[i].dias
            let reinversionResumen = resumenGuardado[i].cantidad_reinvertida
            let gananciaResumen = resumenGuardado[i].ganancia
            let dineroFinalResumen = resumenGuardado[i].dinero_final

            totalInicial += parseInt(dineroInicialResumen)
            totalGanancia += parseFloat(gananciaResumen)
            totalFinal += parseFloat(dineroFinalResumen)

            // Agrego cada inversion guardada al tbody del resumen
            $('#contenido-tabla').append(ComponenteResumenBody(i + 1, etiquetaResumen, dineroInicialResumen, porcentajeResumen, aniosResumen, mesesResumen, diasResumen, reinversionResumen, gananciaResumen, dineroFinalResumen))
        }

        // Agrego el footer del resumen con los totales
        $('#contenido-resumen').append(ComponenteResumenFooter(totalInicial, totalGanancia.toFixed(2), totalFinal.toFixed(2)))

        $('.remover').click(remover_item_resumen)

        // Si se abre con el ícono entonces hace el deslizamiento, si se elimina un item entonces no
        if (evento == undefined) {
            $('#resumen-inversiones').slideToggle(0)
        } else {
            $('#resumen-inversiones').slideToggle(1000)
        }
    } else {
        alertify.notify('El resumen está vacío', 'error')
    }
}

function cerrar_resumen() {
    // Cambio el icono de cerrar resumen por el de abrir resumen
    $('#cerrar-resumen').attr('style', 'display:none;')
    $('#abrir-resumen').removeAttr('style')

    // Remuevo la clase para el fondo del resumen y  el contenido del resumen
    $('#contenedor-resumen-inversiones').removeAttr('class').empty()
}

function remover_item_resumen(evento) {
    let id_item = evento.target.parentNode.parentNode.id
    let numero_item = id_item.split('-')[1]
    let inversionesEnResumen = JSON.parse(localStorage.getItem("resumen"))

    // Remuevo el item seleccionado del html
    $('#' + id_item).remove()

    // Remuevo el item del localStorage
    inversionesEnResumen.splice(numero_item - 1, 1)

    // Mando el nuevo resumen con el item ya removido
    localStorage.setItem('resumen', JSON.stringify(inversionesEnResumen))

    cerrar_resumen()
    abrir_resumen()
}

function filtrar_activos(evento) {
    let nombre = evento.target.id
    if (nombre == 'check-bajo') {
        filtracion('r-bajo', 'no-visible-riesgo')
    } else if (nombre == 'check-medio') {
        filtracion('r-medio', 'no-visible-riesgo')
    } else if (nombre == 'check-alto') {
        filtracion('r-alto', 'no-visible-riesgo')
    } else if (nombre == 'check-dolar') {
        filtracion('moneda-USD', 'no-visible-moneda')
    } else if (nombre == 'check-peso') {
        filtracion('moneda-ARS', 'no-visible-moneda')
    }
}

function filtracion(nombre_clase, clase_visible) {
    // Por cada activo con el mismo nombre_clase entrara al for
    let activo_riesgo = $('.' + nombre_clase)
    for (i = 0; i < activo_riesgo.length; i++) {
        // Si el activo contiene la clase_visible entonces la remueve, sino la agrega
        clases = activo_riesgo[i].classList
        if (clases.contains(clase_visible)) {
            clases.remove(clase_visible)
        } else {
            clases.add(clase_visible)
        }
    }
}

/* SECCION PREGUNTAS FRECUENTES */
function ver_pregunta(evento) {
    let id_pregunta = evento.currentTarget.id
    let respuesta = $('#' + id_pregunta + '  p')
    let icono = $('#' + id_pregunta + ' i')
    respuesta.slideToggle(500)
    if (icono.attr('style') == undefined) {
        icono.attr('style', 'transform:rotate(-90deg)')
    } else {
        icono.removeAttr('style')
    }
}

/* NEWSLETTER */
function almacenar_usuarios_newsletter() {
    let usuario_nombre = $('#newsletter-nombre').val()
    let usuario_apellido = $('#newsletter-apellido').val()
    let usuario_mail = $('#newsletter-mail').val()
    if (usuario_nombre != '' && usuario_apellido != '' && usuario_mail != '') {
        if (validar_mail(usuario_mail)) {
            let usuarios = []
            if (localStorage.getItem("usuarios newsletter") != null) {
                usuarios = JSON.parse(localStorage.getItem("usuarios newsletter"))
            }
            let usuario = {
                'nombre': usuario_nombre,
                'apellido': usuario_apellido,
                'mail': usuario_mail
            }
            usuarios.push(usuario)
            localStorage.setItem("usuarios newsletter", JSON.stringify(usuarios))
            $('#newsletter-nombre').val('')
            $('#newsletter-apellido').val('')
            $('#newsletter-mail').val('')
            alertify.notify('Se ha suscripto con éxito', 'exito')
        } else {
            alertify.notify('Por favor, ingrese un mail válido', 'alerta')
        }
    } else {
        alertify.notify('Por favor, complete los campos en blanco', 'alerta')
    }
}

function validar_mail(mail) {
    if (mail.indexOf('@') != -1) {
        division = mail.split('@')
        if (division[1].indexOf('.') != -1) {
            return true
        }
    } else {
        return false
    }
}