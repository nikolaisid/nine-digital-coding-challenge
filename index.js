var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(request, response) {	
	var data = JSON.parse(request.body, function(err) {
		if (err) {
			response.status(400).json( {
				error: 'Could not decode request: JSON parsing failed'
			}).send();
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
			response.send(JSON.stringify({'response': response}));
		}
	});
});

app.listen(process.env.PORT || 5000);