var express = require('express');
var app = express();

app.post('/', function(request, response) {	
	var data = JSON.parse(request, function(err) {
		if (err) {
			response.send(JSON.stringify({
				'error': 'Could not decode request: JSON parsing failed'
			}));
		}
		else {
			var response = new Array();
			for (var i = 0; i < data['take']; i++) {
				var show = data['payload'][i];
				if (show['drm'] == true && show['episodeCount'] > 0) {
					response.push({
						'image': show['image']['showImage'],
						'slug': show['slug'],
						'title': show['title']
					});
				}
			}
			response.end(JSON.stringify({'response': response}));
		}
	}
});

var server = app.listen(8081, function() {});