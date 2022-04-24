$(function () {

    var name = getCookie('name');
    if (name.length > 2) {
        $('#loginId').text('');
        $('#loginId').append(name);
        $('#exitId').removeAttr('hidden');
    }


});

$("#exitId").click(function () {
    deleteCookie();
    $('#exitId').attr('hidden');
    location.reload();

});

function deleteCookie() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}