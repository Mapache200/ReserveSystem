<script>
        $(document).ready(function() {
            $('#addForm').submit(function(event) {
                event.preventDefault();
                var nombres = $('#nombres').val();
                var apellidos = $('#apellidos').val();
                var telefono = $('#telefono').val();
                var bus = $('#bus').val();
                var ruta = $('#ruta').val();
                var costo = $('#costo').val();
                // Add more form field validation here
                if (nombres && apellidos) {
                    // Form is valid, submit it
                    $(this).submit();
                } else {
                    alert('Please fill in all required fields');
                }
            })
        });
        $(document).ready(function() {
            $('#addRouteForm').submit(function(event) {
                event.preventDefault();
                var origin = $('#origin').val();
                var destination = $('#destination').val();
                var departureDate = $('#departureDate').val();
                var departureTime = $('#departureTime').val();
                var conductorName = $('#conductorName').val();

                if (origin === '' || destination === '' || departureDate === '' || departureTime === '' || conductorName === '') {
                    alert('Por favor, complete todos los campos');
                    return false;
                }

                // Add route logic here
                // ...
            })
        });

        $(document).ready(function() {
            $('#addConductorForm').submit(function(event) {
                event.preventDefault();
                var nombre = $('#nombre').val();
                var apellido = $('#apellido').val();
                var edad = $('#edad').val();
                var telefono = $('#telefono').val();
                var licencia = $('#licencia').val();
                var fechaVencimiento = $('#fechaVencimiento').val();

                if (nombre === '' || apellido === '' || edad === '' || telefono === '' || licencia === '' || fechaVencimiento === '') {
                    alert('Por favor, complete todos los campos');
                    return false;
                }

                // Add additional validation logic as needed

                // Submit the form
                $(this).submit();
            })
        });

        $(document).ready(function() {
            $('#add-bus-form').submit(function(event) {
                event.preventDefault();
                var placa = $('#placa').val();
                var modelo = $('#modelo').val();
                var capacidad = $('#capacidad').val();
                var hora_salida = $('#hora_salida').val();
                var estado = $('#estado').val();

                if (placa === '' || modelo === '' || capacidad === '' || hora_salida === '' || estado === '') {
                    alert('Por favor, complete todos los campos');
                    return false;
                }

                // Add bus logic here
                console.log('Bus added successfully!');
                return true;
            })
        });
</script>
