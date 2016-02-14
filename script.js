$('.dropdown-menu').children().children().click(function() {
	var title = $(this).children().attr('title');
	$('#imgService').attr('src', $('img[title="' + title + '"]').attr('src'));
	$('#btnService').val(title);
});
$('#btnRetrieve').click(function() {
	$('#divResult').removeClass('hidden');
	$('#divResult').addClass('text-center').html('<img src="ajax-loader.gif">');

	$.ajax({
		url: "https://keybase.io/_/api/1.0/user/lookup.json?"
				+ $('#btnService').val()
				+ "=" + $('#inputAccount').val()
				+ "&fields=cryptocurrency_addresses",
		method: "GET",
		dataType: "json"
	}).done(function( obj ) {
		if (obj.them && obj.them !== null && obj.them.length > 0)
		{
			var cca = obj.them[0].cryptocurrency_addresses;
			if (cca.bitcoin)
			{
				$('#divResult').html(cca.bitcoin[0].address);
			}
			else
			{					
				$('#divResult').html('No BTC address found.');
			}
		}
		else
		{
			$('#divResult').html('No BTC address found.');
		}
	}).fail(function( jqXHR, textStatus ) {
		$('#divResult').html('Request failed: ' + textStatus);
	});
});