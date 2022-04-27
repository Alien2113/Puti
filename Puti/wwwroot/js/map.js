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
    $('#mapJson').append(JSON.stringify( allPoints));

    createMap();

   
});

function createMap() {
    $('#map').empty();
    var allPoints = JSON.parse($('#mapJson').text());
    var myMap = new ymaps.Map('map', {
        center: [59.934065, 30.313209],
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        );

    allPoints.forEach(element => {

        var point = new ymaps.Placemark([element.latitude, element.longitude], {
            // hintContent: 'Собственный значок метки с контентом',
            balloonContent: element.name,
            iconContent: element.rating
        }, {

            iconLayout: 'default#imageWithContent', // Опции.Необходимо указать данный тип макета.
            iconImageHref: 'https://localhost:44300/image/Point/' + element.typeWaste + '.png',  // Своё изображение иконки метки.
            iconImageSize: [50, 56], // Размеры метки.
            iconImageOffset: [-24, -24], //// Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentLayout: MyIconContentLayout // Макет содержимого.
        });
        if ($('#CheckPointBtn').is(':checked')) {
            var classList = $('#mapFilters').attr('class').split(/\s+/);
            if (classList.every(elem => element.typeWaste.split('_').includes(elem))) {
                myMap.geoObjects.add(point);
            }

            
        } else {
            if (element.typeWaste.split('_').some(elem => $('#mapFilters').hasClass(elem))) {
                myMap.geoObjects.add(point);
            }

        }
    }
    );
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
