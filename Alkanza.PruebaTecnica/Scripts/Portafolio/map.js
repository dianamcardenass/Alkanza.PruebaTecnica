var puntoReferencia = {
    latitud: 0,
    longitud: 0
};

var markersLocations = [];
var puntosDistanciasDesbalanceados = [];
var puntosDistanciasBalanceados = [];


function initMap() {
    var uluru = { lat: 4.754676327467939, lng: -74.04502473583926 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: uluru,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);

    puntoReferencia.latitud = latLng.lat();
    puntoReferencia.longitud = latLng.lng()
}

var mapModule = {
    init: function() {
        IdButton.click(function () {
            let radio = txtRadio.val();
            if (radio != "" && !isNaN(radio) && radio > 0) {
                mapModule.Calcular();
            }
            else {
                alert("enter a valid number");
            }
        });
    },
    Calcular: function () {
        $.ajax({
            url: urlGetAll,
            type: "GET",
            success: function (data) {
               mapModule.ObtenerPuntosRadio(data, txtRadio.val());
                
                markersLocations.push({
                    id: 111,
                    lat: puntoReferencia.latitud,
                    lng: puntoReferencia.longitud,
                    title: "Punto Inicial",
                    description: "<h1 style='background-color:aquamarine'>Punto Inicial</h1>"
                });

                data.forEach(function (centroM, index) {
                    markersLocations.push({
                        id: centroM.Id,
                        lat: centroM.latitud,
                        lng: centroM.longitud,
                        title: centroM.Nombre,
                        address: centroM.Direccion,
                        description: "<h1 style='background-color:aquamarine'>" + centroM.Nombre + "</h1>"
                    });
                });

                debugger;
                mapModule.PintarPuntos(markersLocations);

                var indiceDesbalance = mapModule.CalcularDesbalanceDistancia();
                lblIndiceDesbalance.text("Indice desbalanceo: " + indiceDesbalance);

                debugger;
                mapModule.SaveHistorico(indiceDesbalance);
            },
            error: function (error, ex) {
                alert('There was some error performing the AJAX call!');
            }
        });
    },
    CalcularDesbalanceDistancia: function () {
        let sum2 = 0;

        puntosDistanciasBalanceados.forEach(function (dist1, index) {
            let sum1 = 0;
            puntosDistanciasDesbalanceados.forEach(function (dist2, index) {
                sum1 = Math.abs((dist1.distancia - dist2.distancia)) + sum1;
            });

            sum2 = sum2 + sum1;
            sum1 = 0;
        });

        return sum2;
    },
    ObtenerPuntosRadio: function (data, radio) {  
        data.forEach(function (centroM, index) {
            let punto = {
                lat: centroM.latitud,
                lng: centroM.longitud, 
                distancia : 0
            };
            
            let distancia = mapModule.CalcularDistancia(punto, puntoReferencia);
            punto.distancia = distancia

            if (distancia <= radio) {
                puntosDistanciasBalanceados.push(punto);
            }
            else {
                puntosDistanciasDesbalanceados.push(punto);
            }
        });
    },
    CalcularDistancia: function (punto1, punto2) {
        let lat = punto1.lat - punto2.latitud;
        let lng = punto1.lng - punto2.longitud;

        let total1 = Math.pow(lat,2) * Math.pow((10000/90), 2);
        let total2 = Math.pow(lng,2) * Math.pow((40000/36), 2);

        let sum = total1 + total2;
        let raiz = Math.sqrt(sum);

        return raiz;
    },
    PintarPuntos: function (markersLocations) {
        var lat_lng = new Array();

        var uluru = { lat: markersLocations[0].lat, lng: markersLocations[0].lng };
        var mapOptions = {
            center: uluru,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        map.addListener('click', function (e) {
            placeMarkerAndPanTo(e.latLng, map);
        });

        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();

        for (i = 0; i < markersLocations.length; i++) {
            var dataCL = markersLocations[i]

            var myLatlng = new google.maps.LatLng(dataCL.lat, dataCL.lng);
            lat_lng.push(myLatlng);

            var colorRelleno = '#C70039';
            var colorBorde = '#581845';
            var colorTexto = "white";

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: dataCL.title,
                label: { text: i.toString(), color: colorTexto },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10, //tamaño
                    strokeColor: colorBorde, //color del borde
                    strokeWeight: 2, //grosor del borde
                    fillColor: colorRelleno, //color de relleno
                    fillOpacity: 1// opacidad del relleno
                }
            });

            latlngbounds.extend(marker.position);
            (function (marker, dataCL) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(dataCL.description);
                    infoWindow.open(map, marker);
                });
            })(marker, dataCL);
        }

        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);

        var path = new google.maps.MVCArray();
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var poly = new google.maps.Polyline({ map: map, strokeColor: "#4986E7" });

    },
    SaveHistorico: function (indiceDesbalance) {

        var historico = {
            LatitudPuntoInicial: puntoReferencia.latitud,
            LongirudPuntoInicial: puntoReferencia.longitud,
            calculoDesbalance: indiceDesbalance
        };

        $.ajax({
            url: urlSaveHistorico,
            type: "POST",
            data: historico,
            success: function () {
                alert("historico creado");
            },
            error: function (error, ex) {
                alert('There was some error performing the AJAX call!');
            }
        });
    }
}

mapModule.init();