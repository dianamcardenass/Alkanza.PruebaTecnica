
var historico = {
    init: function() {
        debugger;
        historico.GetData();
    },
    GetData: function() {
        $.ajax({
            url: urlGetHstorico,
            type: "GET",
            success: function (data) {

                dataHistorico.append('<table class="mytable" />');
                dataHistorico.append('<tr><th>Fecha</th><th>Latitud puntoInicial</th><th>Longitud puntoInicial</th><th>Calculo Desbalance</th></tr>');

                data.forEach(function (historico, index) {
                    dataHistorico.append('<tr><td>' + historico.Fecha + '</td>' + '<td>' + historico.LatitudPuntoInicial + '</td>' + '<td>' + historico.LongirudPuntoInicial + '</td>' + '<td>' + historico.calculoDesbalance + '</td>' + '</tr>');
                });

            },
            error: function (error, ex) {
                alert('There was some error performing the AJAX call!');
            }
        });
    }
}

historico.init();