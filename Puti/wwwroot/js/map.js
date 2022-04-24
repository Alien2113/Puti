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

    var myMap = new ymaps.Map('map', {
        center: [59.934065, 30.313209],
        zoom: 13
    }, {
        searchControlProvider: 'yandex#search'
    }),
        
 // Создаём макет содержимого.
 MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
 '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
  ),

       

        myPlacemarkWithContent = new ymaps.Placemark([59.934065, 30.313209], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            
            iconLayout: 'default#imageWithContent', // Опции.Необходимо указать данный тип макета.
            iconImageHref: 'https://localhost:44300/image/Point/1.png',  // Своё изображение иконки метки.
            iconImageSize: [50, 56], // Размеры метки.
            iconImageOffset: [-24, -24], //// Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentLayout: MyIconContentLayout // Макет содержимого.
        });

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

        myMap.geoObjects.add(point);
    }
    );

   
});

$('.rtrt').on('click', '.password-control', function () {

    var id = 5;

});
