var Jimp = require("jimp");
const fs = require('fs');

var legends = fs.readFileSync('./listPharses.txt').toString().split("\n");
var listLegends = [];
for (i in legends) {
    listLegends.push(legends[i]);
}

const dir = './resources/';

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

                var sizeLegend = listLegends[Math.floor(Math.random() * listLegends.length)].length;
                var position = widthImage - sizeLegend / 100;

                loadImage.print(font, position, heightImage, listLegends[Math.floor(Math.random() * listLegends.length)])
                    .write('./output/' + image[2])
                    .resize(500, 500)
                    .quality(100);
            })
            .catch(function (err) {
                console.error(err);
            });

    });
});


