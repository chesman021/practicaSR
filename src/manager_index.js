$(document).ready(function() {
    // Definir las expresiones regulares
    const patronesValidacion = {
        'letras': {
            regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
            filtro: /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g
        },
        'telefono': {
            regex: /^\d{10}$/,
            filtro: /\D/g
        },
        'email': {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            filtro: null
        }
    };

    Filtros();

    function Filtros() {
        $('.form-control[data-regex]').on('input', function() {
            const $campo = $(this);
            const tipoRegex = $campo.data('regex');
            const config = patronesValidacion[tipoRegex];

            if (config && config.filtro) {
                const valorOriginal = $campo.val();
                const valorFiltrado = valorOriginal.replace(config.filtro, '');

                if (valorOriginal !== valorFiltrado) {
                    $campo.val(valorFiltrado);
                }

                const maxlength = $campo.data('maxlength');
                if (maxlength && valorFiltrado.length > maxlength) {
                    $campo.val(valorFiltrado.substring(0, maxlength));
                }
            }

            if (tipoRegex === 'telefono') {
                if ($campo.val().length > 10) {
                    $campo.val($campo.val().substring(0, 10));
                }
            }
        });
    }

});

$(document).ready(function () {
    $("#cedula").on('keyup', function() {
        var key = $(this).val();
        if (key.length >= 8) {
            axios.get(`${API_BASE_URL}/Cedula/${key}`, {
            headers: {'Content-Type': 'application/json'}})
            .then(response => {
                var resultado = JSON.parse(JSON.stringify(response.data));
                console.log(resultado)
                $('#contacto').val(`${resultado[0].nombre} ${resultado[0].apellidoPaterno} ${resultado[0].nombre}`)
                $('#titulo').val( resultado[0].profesion)
            })
            .catch(error => mensaje('Ups, ha ocurrido un error' + error, "danger"));
        }
    });

    $('#agregar').click(function () {
        const data = {
            compania: $('#compania').val(),
            cedula: $('#cedula').val(),
            nombre: $('#contacto').val(),
            titulo: $('#titulo').val(),
            correo: $('#correo').val(),
            telefono: $('#telefono').val()
            };
            
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';
            axios.post(`${API_BASE_URL}/Participante/create`, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}})
            .then(response => {
                var resultado = JSON.parse(JSON.stringify(response.data));
                if (resultado.estatus == true) {
                    ventana(resultado.data,resultado.message,"success")
                } else {
                    mensaje(resultado.message, "danger");
                }
            })
            .catch(error => mensaje('Ups, ha ocurrido un error' + error, "danger"));
        });

        $("#tabla").click(function(){
            location.href="registros.html"
        });
});


function validarFormulario() {
    let valido = true;
    $('.form-control[required]').each(function () {
        if ($(this).val().trim() === '') {
            valido = false;
            return false;
        }
    });

    if (!$('#aviso').is(':checked')) {
        valido = false;
    }

    $('#agregar').prop('disabled', !valido);
}

$(document).on('input change', '.form-control, #aviso', validarFormulario);


function mensaje(mensaje, tipo) {
    $("#cabeza").attr("class", "modal-header bg-" + tipo + " text-white");
    $("#messaje").html(mensaje);
    $("#mensajito").modal('show');
}

function ventana(item,mensaje, tipo) {
    $("#cabeza").attr("class", "modal-header bg-" + tipo + " text-white");
    $("#alerta").html(mensaje);
    $("#ventana").modal('show');
    $("#data").html(`
    <p class="fw-bold mb-1">${item.compania}</p>
    <p class="mb-1">${item.cedula}</p>
    <p class="mb-1">${item.nombre}</p>
    <p class="mb-1">${item.titulo}</p>
    <p class="mb-1">${item.correo}</p>
    <p class="mb-1">${item.telefono}</p>
    `);
}


function limpiar_campos(){
    $('#compania').val("");
    $('#cedula').val("");
    $('#contacto').val("");
    $('#titulo').val("");
    $('#correo').val("");
    $('#telefono').val("");
}