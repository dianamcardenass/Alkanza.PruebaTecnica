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

                mapModule.PintarPuntos(markersLocations);

                var indiceDesbalance = mapModule.CalcularDesbalanceDistancia();
                lblIndiceDesbalance.text("Indice desbalanceo: " + indiceDesbalance);

                mapModule.SaveHistorico(indiceDesbalance);
            },
            error: function (error, ex) {
                alert('There was some error performing the AJAX call!');
            }
        });
    },
    CalcularDesbalanceDistancia: function () {
        let sum2 = 0;

        debugger;
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
            
            let distancia = mapModule.CalcularDistanciaKM(puntoReferencia.latitud, puntoReferencia.longitud, punto.lat, punto.lng);
            punto.distancia = distancia;

            //console.log("distancia a " + centroM.Nombre);
            //console.log(distancia + " km");

            if (parseFloat(distancia) <= (radio)) {
                puntosDistanciasBalanceados.push(punto);
            }
            else {
                puntosDistanciasDesbalanceados.push(punto);
            }
        });
    },
    CalcularDistanciaKM : function (lat1, lon1, lat2, lon2) {
        //formula Haversine
        debugger;
        rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(3); //Retorna tres decimales
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