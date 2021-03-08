// Ejecución   -----------------------------------
$(document).ready(function() {
    $.ajax({
            url: "./activos.json",
            type: "GET",
            dataType: "json"
        })
        .done(function(resultado) { //caso correcto (callback)
            activos = resultado.activos

            // Crea los activos
            crear_activos(activos)

            // Inicializo Animation on Scroll
            AOS.init();

            // Aplico el desplazamiento de los links del header
            scroll_inicio()

            // Traer diferente info dependiendo del activo del que se quiera saber mas
            $('.boton-conoce-mas').click(crear_conoce_mas)

            // Evento para abrir el resumen
            $('#abrir-resumen').click(abrir_resumen)

            // Asigna el evento para filtrar los activos
            $('.filtradores').click(filtrar_activos)

            // Muestra o esconde el contenido de las preguntas frecuentes
            $('.pregunta').click(ver_pregunta)
        })
        .fail(function(xhr, status, error) { //caso incorrecto (callback)
            console.log(xhr)
            console.log(status)
            console.log(error)
        })
})