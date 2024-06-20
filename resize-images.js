const sharp = require('sharp');
const {chdir, cwd} = require('process');
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true})

const main = async () => {
    chdir('./dev-cards')
    const images = await fs.readdirSync('.');


    skewImage(images);
}

const skewImage = (images)=>{
    const testImage = images[0];
    gm(testImage)
        .flip()
        .magnify()
        .rotate('green', 45)
        .blur(7, 3)
        .crop(300, 300, 150, 130)
        .edge(3)
        .write(`x-test-${testImage}`, function (err) {
            if (!err) console.log('crazytown has arrived');
        })

}
const renameImages = (images) => {
    images.map( image => {
        const newName = image.replace('[', '').replace(']', '')
         fs.rename(image, newName, (error)=>{
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
