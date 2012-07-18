(function($){
	var $map_canvas = $("#map_canvas"),
		geocoder = new google.maps.Geocoder(),
		map = new google.maps.Map($map_canvas[0], {
		     	zoom: 16,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		}),
		marker = new google.maps.Marker({ map: map });
	
	$("#address").autocomplete({
		delay: 500,
		source: function(request,response) {
			geocoder.geocode(
				{ address: request.term },
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						response( $.map( results, function( item ) {
							var address = item.formatted_address,
								lat = item.geometry.location.Za,
								lng = item.geometry.location.$a;
								
							return {
								label: address,
								value: address,
								latLng: new google.maps.LatLng(lat, lng)
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
			map.setCenter(ui.item.latLng);
			marker.setPosition(ui.item.latLng);
			marker.setTitle(ui.item.label);
			
			$map_canvas.css("left", "0");
		},
		open: function() {
			$map_canvas.css("left", "-100000");
		}
	});
})(jQuery);