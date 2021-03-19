// Ejecución   -----------------------------------
$(document).ready(function() {
    $.ajax({
            url: "./activos.json",
            type: "GET",
            dataType: "json"
        })
        .done(function(resultado) { //caso correcto (callback)
            activos = resultado.activos
            crear_activos(activos)

            // Inicializo Animation on Scroll
            AOS.init();

            cambio_logo_hover()
            scroll_links_header()
            $('.boton-conoce-mas').click(crear_conoce_mas)
            $('#abrir-resumen').click(abrir_resumen)
            $('#cerrar-resumen').click(cerrar_resumen)
            $('.filtradores').click(filtrar_activos)
            $('.pregunta').click(ver_pregunta)
            $('#anotarse').click(almacenar_usuarios_newsletter)
        })
        .fail(function(xhr, status, error) { //caso incorrecto (callback)
            console.log(xhr)
            console.log(status)
            console.log(error)
        })
})