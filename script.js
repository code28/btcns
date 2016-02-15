$('.dropdown-menu').children().children().click(function() {
	var title = $(this).children().attr('title');
	$('#imgService').attr('src', $('img[title="' + title + '"]').attr('src'));
	$('#btnService').val(title);
});
$('#btnRetrieve').click(function() {
	$('#divResult').removeClass('hidden').html('<img src="ajax-loader.gif">');

	$.ajax({
		url: "https://keybase.io/_/api/1.0/user/lookup.json?"
				+ $('#btnService').val()
				+ "=" + $('#inputAccount').val()
				+ "&fields=cryptocurrency_addresses,basics,profile,pictures,proofs_summary",
		method: "GET",
		dataType: "json"
	}).done(function( obj ) {
		if (obj.them && obj.them.length > 0 && obj.them[0] !== null)
		{
			var user = obj.them[0];
			var bc = user.cryptocurrency_addresses.bitcoin;
			var coinbase = user.proofs_summary.by_proof_type.coinbase;
			if (bc || coinbase)
			{
				var result = '<div class="row">';
				if (user.pictures.primary)
				{
					result += '<div class="col-md-4"><img src="' + user.pictures.primary.url + '" class="img-circle"></div>';
				}
				result += '<div class="col-md-offset-1777 col-md-8 text-left">'
							+ '<h3>' + user.profile.full_name + ' (' + user.basics.username_cased + ')</h3>';
				if (bc)
				{
					result += 'BTC address: <a href="bitcoin:' + bc[0].address + '">' + bc[0].address + '</a><br>';
				}
				if (coinbase)
				{
					result += 'Coinbase Account: <a href="' + coinbase[0].service_url + '">' + coinbase[0].nametag + '</a>';
				}
				result += '</div></div>';
				$('#divResult').html(result);
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