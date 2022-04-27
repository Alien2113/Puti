$(function () {

    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://localhost:44300/Home/MapPoints',
        success: function (data) {
            gettableelement(data);
        }

    });
});

function gettableelement(elements) {
    elements.forEach(function (item) {
        $('#newstr').append('<tr><td>'
            + item.id + '</td><td style="width:500px;"><input style="border: aliceblue; width: 100%" value="'
            + item.name + '"></td><td style="width:100px;"><input style="border: aliceblue; width: 100%" value="'
            + item.typeWaste + '"></td style="width:150px;"><td><input style="border: aliceblue; width: 100%" value="'
            + item.latitude + '"></td><td style="width:150px;"><input style="border: aliceblue; width: 100%" value="'
            + item.longitude + '"></td><td style="width:400px;"><input style="border: aliceblue; width: 100%" value="'
            + item.address + '"></td><td style="width:60px;"><input style="border: aliceblue; width: 100%" value="'
            + item.rating + '"></td></tr>');
    });
    
}
