$("#InpButt").click(function () {
    var email = $('#InpEmail').val();
    var password = $('#InpPassword').val();
	jQuery.ajax({
		url: "https://localhost:44300/Home/LoginPost",
		type: "POST",
		data: JSON.stringify({ Email: email, Password: password }),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function () {
			window.location.replace("https://localhost:44300/Home/Index");
		},
		error: function () {
			window.location.replace("https://localhost:44300/Home/Index");
		},
	});
});

$("#RegButt").click(function () {
	$('.fraza').text('');
	var name = $('#NewName').val();
	var email = $('#NewEmail').val();
	var password = $('#NewPassword').val();
	var password2 = $('#NewPassword2').val();
	var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
	if (name == '') $('.fraza').append('<p>Не введено имя пользователя</p>');
	if (!(email.match(pattern))) $('.fraza').append('<p>Неверно введена почта</p>');
	if ((password.length < 4) || (password2.length < 4)) $('.fraza').append('<p>Пароль не может быть меньше 4 символов</p>');
	if (password2 != password) $('.fraza').append('<p>Пароли не совпадают</p>');
	if ($('.fraza').length < 5) {
		jQuery.ajax({
			url: "https://localhost:44300/Home/RegistrationPost",
			type: "POST",
			data: JSON.stringify({ Name: name, Email: email, Password: password }),
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
	}

});

$('body').on('click', '.password-control', function () {
	if ($('#NewPassword').attr('type') == 'password') {
		$(this).addClass('view1');
		$('#NewPassword').attr('type', 'text');
	} else {
		$(this).removeClass('view1');
		$('#NewPassword').attr('type', 'password');
	}
	return false;
});

$('body').on('click', '.password-control1', function () {
	if ($('#NewPassword2').attr('type') == 'password') {
		$(this).addClass('view');
		$('#NewPassword2').attr('type', 'text');
	} else {
		$(this).removeClass('view');
		$('#NewPassword2').attr('type', 'password');
	}
	return false;
});


$('body').on('click', '.password-control', function () {
	if ($('#InpPassword').attr('type') == 'password') {
		$(this).addClass('view');
		$('#InpPassword').attr('type', 'text');
	} else {
		$(this).removeClass('view');
		$('#InpPassword').attr('type', 'password');
	}
	return false;
});