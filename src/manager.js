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

    aplicarFiltrosEnTiempoReal();

    function aplicarFiltrosEnTiempoReal() {
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

                // Validar longitud máxima si existe
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

$("#continuar").click(function() {

});
