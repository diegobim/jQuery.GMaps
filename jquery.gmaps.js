(function($){
	var geocoder = new google.maps.Geocoder();
	
	$("#address").autocomplete({
		minLength: 2,
		source: function(request,response) {
			geocoder.geocode(
				{ address: request.term },
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						response( $.map( results, function( item ) {
							console.log(item);
							return {
								label: item.formatted_address,
								value: item.formatted_address,
								location: item.geometry.location
							}
						}));
					} else {
						response({
							label: "(nenhum endereço localizado)",
							value: "(nenhum endereço localizado)"
						});
					}
				}
			);
		},
		select: function( event, ui ) {
			console.log(ui.item);
		}
		// ,open: function() {
			// $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		// },
		// close: function() {
			// $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		// }
	});
})(jQuery);