const puppeteer = require('puppeteer');
const downloader = require('image-downloader');
const fs = require('fs');

async function getImageFromPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const srcURLs = await page.evaluate(() => {
        let imageLinks = document.querySelectorAll('span.wallpapers__canvas > img');
        imageLinks = [...imageLinks];
        let srcURLs = imageLinks.map(link => link.getAttribute('src'));
        return srcURLs;
    });
    console.log(srcURLs);

    await browser.close();
    return srcURLs;
}


async function main() {
    // create folder if it not exist
    const imageSaveFolder = "./image";
    if (!fs.existsSync(imageSaveFolder)) {
        fs.mkdirSync(imageSaveFolder);
    }

    const url = "https://wallpaperscraft.com/catalog/nature/1920x1080";
    const images = await getImageFromPage(url);
    

    images.forEach(image => downloader.image({
        url: image,
        dest: imageSaveFolder
    })
        .then(({ filename, image }) => {
            console.log('File saved to', filename)
        })
        .catch((err) => {
            console.error(err)
        }));


}

main();