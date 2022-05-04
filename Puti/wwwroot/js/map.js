ymaps.ready(function () {
    var allPoints;
    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://localhost:44300/Home/MapPoints',
        success: function (data) {
            allPoints = data;
        }
    });
    $('#mapJson').append(JSON.stringify(allPoints));
    createMap();
});

var clusterer;

function createMap() {
    $('#map').empty();
    var allPoints = JSON.parse($('#mapJson').text());
    var myMap = new ymaps.Map('map', {
        center: [59.934065, 30.313209],
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    }),

        clusterer = new ymaps.Clusterer({
           // Через кластеризатор можно указать только стили кластеров, стили для меток нужно назначать каждой метке отдельно.
           /* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml */
            preset: 'islands#invertedGreenClusterIcons', // 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false, //true, если надо кластеризовать только точки с одинаковыми координатами.
           // Опции кластеров указываем в кластеризаторе с префиксом "cluster".
           /* @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml */
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        );

    var geoObjects = [];

    allPoints.forEach(element => {

        var point = new ymaps.Placemark([element.latitude, element.longitude], {
            // hintContent: 'Собственный значок метки с контентом',
            balloonContentHeader: '<a style="color:#198754">' + element.name + '</a><br>' +
                '<span class="description">Адрес: ' + element.address + '</span>'+
                '<span class="description">Рейтинг: ' + element.rating + '</span>',
            balloonContentBody: '<img src="image/Point/' + element.typeWaste+'.png" height="56" width="50"> <br/> ',
            iconContent: element.rating
        },
         {
            iconLayout: 'default#imageWithContent', // Опции.Необходимо указать данный тип макета.
            iconImageHref: 'https://localhost:44300/image/Point/' + element.typeWaste + '.png',  // Своё изображение иконки метки.
            iconImageSize: [50, 56], // Размеры метки.
            iconImageOffset: [-25, -56], //// Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentLayout: MyIconContentLayout // Макет содержимого.
        });
        if ($('#CheckPointBtn').is(':checked')) {
            var classList = $('#mapFilters').attr('class').split(/\s+/);
            if (classList.every(elem => element.typeWaste.split('_').includes(elem))) {
                geoObjects.push(point);
            }
        } else {
            if (element.typeWaste.split('_').some(elem => $('#mapFilters').hasClass(elem))) {
                geoObjects.push(point);
            }

        }
    });
   /* clusterer.options.set({
         gridSize: 80,
         clusterDisableClickZoom: true
     }); */
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
}

$('#CheckPointBtn').on("change", function () {

    createMap();

});
$('.vid').on("click", function () {
    var elmId = $(this).attr("id").split('_')[1];
    if ($('#mapFilters').hasClass(elmId)) {
        $(this).addClass('vkl');
        $(this).removeClass('vykl');
        $('#mapFilters').removeClass(elmId);
    } else {
        $(this).addClass('vykl');
        $(this).removeClass('vkl');
        $('#mapFilters').addClass(elmId);
    }
    createMap();

});