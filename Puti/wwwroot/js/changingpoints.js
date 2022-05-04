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
        $('#newstr').append('<tr><td name=id>'
            + item.id + '</td><td  style="width:500px;"><input name=name style="border: aliceblue; width: 100%" value="'
            + item.name + '"></td><td style="width:100px;"><input name=typewaste style="border: aliceblue; width: 100%" value="'
            + item.typeWaste + '"></td style="width:150px;"><td><input name=lat style="border: aliceblue; width: 100%" value="'
            + item.latitude + '"></td><td style="width:150px;"><input name=long style="border: aliceblue; width: 100%" value="'
            + item.longitude + '"></td><td style="width:400px;"><input name=adress style="border: aliceblue; width: 100%" value="'
            + item.address + '"></td><td style="width:60px;"><input name=rating style="border: aliceblue; width: 100%" value="'
            + item.rating + '"></td><td><input type="checkbox" id="deletebox_'+item.id+'"></td></tr>');
    });
}



$("#tablesearch").on("input",function () {

    var text = $(this).val();
    $('#newstr tr').each(function (index,elem) {
        var adress = $(this).find('input[name=adress]').val();

        if (adress.includes(text)) {
            elem.removeAttribute('hidden');
        } else {
           elem.setAttribute('hidden','hidden');
        }
    });

});

$("#butn_delete").click(function () {
    let arr = [];
    $('#newstr tr').each(function () {
        var checkbox = $(this).find('input[type=checkbox]');
        //var val = checkbox.val();
        if (checkbox.prop('checked')) {
            var id = checkbox.attr('id').split('_')[1];
            arr.push(Number( id));
        }
    });

    jQuery.ajax({
        url: "https://localhost:44300/Home/DeletePoint",
        type: "POST",
        data: JSON.stringify(arr),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            window.location.replace("https://localhost:44300/Home/Login");
        },
        error: function () {
            window.location.replace("https://localhost:44300/Home/Login");
        },
    });
    window.location.replace("https://localhost:44300/Home/Login");

});


$("#butn_edit").click(function () {
    var arr = [];

    $('#newstr tr').each(function () {
        var checkbox = $(this).find('input[type=checkbox]');
        

        if (checkbox.prop('checked')) {

            var id = $(this).find('[name=id]').text();
            var name = $(this).find('[name=name]').val();
            var typewaste = $(this).find('[name=typewaste]').val();
            var lat = $(this).find('[name=lat]').val();
            var long = $(this).find('[name=long]').val();
            var adress = $(this).find('[name=adress]').val();
            var rating = $(this).find('[name=rating]').val();

            var obj = {
                Id: Number(id),
                Name: name,
                TypeWaste: typewaste,
                Latitude: parseFloat(lat),
                Longitude: parseFloat(long),
                Address: adress,
                Rating: rating
            };
            arr.push(obj);
        }
    });

    jQuery.ajax({
        url: "https://localhost:44300/Home/UpdatePoint",
        type: "POST",
        data: JSON.stringify(arr),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            window.location.replace("https://localhost:44300/Home/Login");
        },
        error: function () {
            window.location.replace("https://localhost:44300/Home/Login");
        },
    });
    window.location.replace("https://localhost:44300/Home/Login");

});