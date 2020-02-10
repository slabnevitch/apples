function initMap() {
	var footers = document.querySelectorAll('.footer-map'),
		footersLength = footers.length;

	for (var i = 0; i < footersLength; i++) {
		footerMap = new google.maps.Map(footers[i], {
			center: {lat: 49.994507, lng: 36.240500},
			zoom: 15,
			disableDefaultUI: true
		});
	}

}