function loadTable(){
    axios.get(`${API_BASE_URL}/Participante`, {
    headers: {'Content-Type': 'application/json'}})
    .then(response => {
        var resultado = JSON.parse(JSON.stringify(response.data));
        $('#tabla_participantes').DataTable({
            "order": [[1, "asc"]], 
            "processing": true,
            "scrollX": true,
            "data": resultado,     
            "columns": [
                { "data": "compania" }, 
                { "data": "cedula"   }, 
                { "data": "titulo"   }, 
                { "data": "nombre"   }, 
                { "data": "correo"   }, 
                { "data": "telefono" }  
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

