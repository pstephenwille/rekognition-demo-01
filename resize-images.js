const sharp = require('sharp');
const {chdir, cwd} = require('process');
const fs = require('fs');
const PImage = require('pureimage');
const path = require('path');

const main = async () => {
    chdir('./suit-clubs')
    const images = await fs.readdirSync('.');

    pImageTesting(images)
}

const pImageTesting = (images) => {
    const testImage = images[0]
    PImage.decodeJPEGFromStream(fs.createReadStream(testImage))
        .then((img) => {
                console.log("size is", img.width, img.height);
                var img2 = PImage.make(50, 50);
                var c = img.getContext("2d");
                // c.drawLine({start: {x: 20, y: 42}, end: {x: 20, y: 90}})
                c.beginPath()
                c.moveTo(600, 100)
                c.lineTo(600, 500)
                c.lineTo(400, 500)
                c.lineTo(400, 100)
                c.lineWidth = 5;
                c.strokeStyle = 'rgb(112,255,112)'
                c.stroke()
                var pth = path.join('.', "resized_bird.jpg");
                PImage.encodeJPEGToStream(img, fs.createWriteStream(pth), 50).then(() => {
                    console.log("done writing");
                });
            },
        );
}
const skewImage = (images) => {
    const testImage = images[0];
    sharp(testImage)
        .affine([[1, 1], [0.1, 0.5]], {
            background: 'grey',
            interpolator: sharp.interpolators.nohalo
        })
        .toFile(`x-${testImage}`, function (err) {
            console.log(err)
        });

}
const renameImages = (images) => {
    images.map(image => {
        const newName = image.replace('[', '').replace(']', '')
        fs.rename(image, newName, (error) => {
            console.log('%c...error', 'color:gold', error)
        })
    })
}
const resizeImages = () => {
    images.map(image => {
        sharp(image)
            .resize(1000)
            .toFile(`../training-cards-resized/${image}`, function (err) {
                console.log(err)
            });
    })

}
main();
