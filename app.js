var Jimp = require("jimp");
const fs = require('fs');

var legends = ['Dorgas', 'ET chapado', 'Doido'];

var legend;

const dir = './resources/';

fs.readdir(dir, (err, files) => {
    files.forEach(file => {
        var image = './resources/' + file;
        var widthImage;
        var heightImage;

        var loadImage;
        Jimp.read(image)
            .then(function (image) {
                widthImage = image.bitmap.width / 2 - 100;
                heightImage = image.bitmap.height / 2;

                loadImage = image;
                return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            })
            .then(function (font) {
                image = image.split('/');

                loadImage.print(font, widthImage, heightImage, legends[Math.floor(Math.random() * legends.length)])
                    .write('./output/' + image[2])
                    .resize(500, 500)
                    .quality(100);
            })
            .catch(function (err) {
                console.error(err);
            });

    });
});


