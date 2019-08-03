const Jimp = require("jimp"),
    fs = require('fs'),
    request = require('request'), 
    dir = './resources/';
var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

download('https://www.google.com/images/srpr/logo3w.png', dir + 'google.png', function () {
    console.log('done');
});


var legends = fs.readFileSync('./listPharses.txt').toString().split("\n");
var listLegends = [];
for (i in legends) {
    listLegends.push(legends[i]);
}



fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        var image = './resources/' + file;
        var widthImage;
        var heightImage;

        var loadImage;
        Jimp.read(image)
            .then(function (image) {
                widthImage = image.bitmap.width / 2;
                heightImage = image.bitmap.height / 2;

                loadImage = image;
                return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            })
            .then(function (font) {
                image = image.split('/');

                //var sizeLegend = listLegends[Math.floor(Math.random() * listLegends.length)].length;
                var position = widthImage / 2 + 50;

                loadImage.print(font, position, heightImage, listLegends[Math.floor(Math.random() * listLegends.length)])
                    .resize(500, 500)
                    .quality(100)
                    .write('./output/' + image[2]);

            })
            .catch(function (err) {
                console.error(err);
            });

    });
});


