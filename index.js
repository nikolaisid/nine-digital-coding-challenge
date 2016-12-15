var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(err, req, res, next) {
	if (err instanceof SyntaxError) {
		res.status(400).json( {
			error: 'Could not decode request: JSON parsing failed'
		}).send();
	}
});

app.post('/', function(req, res) {
		var data = req.body;
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
		res.json({'response': response})).send();
});

app.listen(process.env.PORT || 5000);

function IsValidJSON(data) {
	try {
		JSON.parse(data);
	} catch (error) {
		return false;
	}
	return true;
}