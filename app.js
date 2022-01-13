$(document).ready(() => {

    const domumentos = {
        id: '',
        name: '',
    }
    let edit = false;
    let deudaDora = 3000000;
    let deudaMama = 1400000;
    //Mostrar las cuotas al iniciar la app
    mostrarCuotas('cuota');
    mostrarCuotas('cuotaMama');
    mostrarCuotas('salud');

    function mostrarCuotas(tipo) {
        edit = false;
        let url = '';
        if (tipo === 'cuota') {
            url = 'mostrarCuotas.php';
        } else if (tipo === 'cuotaMama') {
            url = 'mostrarCuotas2.php';
        } else if (tipo === 'salud') {
            url = 'mostrarCuotas3.php';
        }
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                let cuotas = JSON.parse(res);
                let template = '';
                cuotas.forEach(cuota => {
                    let precio = Intl.NumberFormat().format(cuota.valor);
                    template += `
                    <tr cuotaId = ${cuota.cuotaId}>
                        <td>
                            <a href = "#" class = "idCuota">
                                ${cuota.fecha}
                            </a>
                        </td>
                        <td>
                            <a href = "#" class = "idCuota">
                                ${cuota.descripcion}
                            </a>
                        </td>
                        <td>
                            <a href = "#" class = "idCuota">
                                $ ${precio}
                            </a>
                        </td>
                        <td>
                            <button class="borrar-cuota btn btn-outline-danger" style="font-weight:bold">
                                X
                            </button>
                        </td>
                    </tr>
                    `
                });
                if (tipo === 'cuota') {
                    $('#cuotas').html(template);
                } else if (tipo === 'cuotaMama') {
                    $('#cuotas2').html(template);
                } else if (tipo === 'salud') {
                    $('#cuotas3').html(template);
                }
                totalPrestamo('cuota');
                totalPrestamo('cuotaMama');
                totalPrestamo('salud');
            }
        })
    }

    function totalPrestamo(tipo) {
        let url = '';
        let deuda = '';
        if (tipo === 'cuota') {
            url = 'mostrarCuotas.php';
            deuda = deudaDora;
        } else if (tipo === 'cuotaMama') {
            url = 'mostrarCuotas2.php';
            deuda = deudaMama;
        } else if (tipo === 'salud') {
            url = 'mostrarCuotas3.php';
        }
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                let cuotas = JSON.parse(res);
                let totalAux = 0;
                cuotas.forEach(cuota => {
                    totalAux = parseInt(totalAux) + parseInt(cuota.valor);
                });
                let total = parseInt(deuda) - parseInt(totalAux);
                if (tipo === 'cuota') {
                    $('#totalPrestamo').html('Debo: $' + Intl.NumberFormat().format(total));
                } else if (tipo === 'cuotaMama') {
                    $('#totalMama').html('Debo: $' + Intl.NumberFormat().format(total));
                }
            }
        })
    }

    $('#cuotaForm').submit((e) => {
        const cuota = {
            fecha: $('#fecha').val(),
            descripcion: $('#descripcion').val(),
            valor: $('#valor').val(),
            cuotaId: $('#cuotaId').val(),
            tipoPrestamo: $('#tipoPrestamo').val()
        };
        let url = edit === false ? 'agregarCuota.php' : 'editarCuota.php';
        $.post(url, cuota, (res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cuota agregada.',
                showConfirmButton: false,
                timer: 1800
            });
            mostrarCuotas(cuota.tipoPrestamo);
            $('#cuotaForm').trigger('reset');
        });
        e.preventDefault();
    });

    $(document).on('click', '.borrar-cuota', function () {
        if (confirm('¿ Quieres eliminar esta cuota ?')) {
            let element = $(this)[0].parentElement.parentElement;
            let cuotaId = $(element).attr('cuotaId');
            let tipo = $(this)[0].parentElement.parentElement.parentElement;
            let tipoId = $(tipo).attr('id');
            $.post('borrarCuota.php', { cuotaId, tipoId }, (res) => {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Cuota eliminada.',
                    showConfirmButton: false,
                    timer: 1800});
                mostrarCuotas('cuota');
                mostrarCuotas('cuotaMama');
                mostrarCuotas('salud');
            })
        }
    })

    $(document).on('click', '.idCuota', function () {
        let prestamo = '';
        let element = $(this)[0].parentElement.parentElement;
        let cuotaId = $(element).attr('cuotaId');
        let tipo = $(this)[0].parentElement.parentElement.parentElement;
        let tipoId = $(tipo).attr('id');
        if (tipoId === 'cuotas') {
            prestamo = 'cuota';
        } else if (tipoId === 'cuotas2') {
            prestamo = 'cuotaMama';
        } else if (tipoId === 'cuotas3') {
            prestamo = 'salud';
        }
        $.post('mostrarCuota.php', { cuotaId, tipoId }, (res) => {
            let cuota = JSON.parse(res);
            $('#cuotaId').val(cuota.cuotaId);
            $('#fecha').val(cuota.fecha);
            $('#descripcion').val(cuota.descripcion);
            $('#valor').val(cuota.valor);
            $('#tipoPrestamo').val(prestamo);
            edit = true;
        })
    })

});