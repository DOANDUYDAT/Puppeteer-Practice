const puppeteer = require('puppeteer');



async function getDataFromPage(url) {
    // Mở trình duyệt mới và tới trang của thegioididong
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log('page loaded');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến phoneList
    const phoneList = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('ul.filter-cate > li:not(.feature)');
        titleLinks = [...titleLinks];
        let phoneList = titleLinks.map(link => {
            let name = link.querySelector('a > h3');
            let price = link.querySelector('a > .price > strong');
            let phone = {
                title: "",
                price: "",
            };
            if (name) {
                phone.title = name.innerHTML;
            }
            if (price) {
                phone.price = price.innerHTML;
            }

            return phone;
        });
        return phoneList;
    });
    await browser.close();
    return phoneList;
    // return true;
}

async function main() {
    const url = 'https://www.thegioididong.com/dtdd#o:1&i:5';
    const result = await getDataFromPage(url);
    console.log(result.length);
}

main();