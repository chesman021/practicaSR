function loadTable(){
    axios.get(`${API_BASE_URL}/Participante`, {
    headers: {'Content-Type': 'application/json'}})
    .then(response => {
        var resultado = JSON.parse(JSON.stringify(response.data));
        $('#tabla_participantes').DataTable({
            "order": [[1, "asc"]], // Ordenar por Cédula o el índice que prefieras
            "processing": true,
            "scrollX": true,
            "data": resultado,     // Pasamos el array de objetos directamente
            "columns": [
                { "data": "compania" }, // Mapea la propiedad 'compania' del JSON
                { "data": "cedula"   }, // Mapea 'cedula'
                { "data": "titulo"   }, // Mapea 'titulo'
                { "data": "nombre"   }, // Mapea 'nombre'
                { "data": "correo"   }, // Mapea 'correo'
                { "data": "telefono" }  // Mapea 'telefono'
            ],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json" // Opcional: Traducir a español
            }
        });
    })
    .catch(error => mensaje('Ups, ha ocurrido un error' + error, "danger"));

}
$(document).ready(function() {
    loadTable();
});
