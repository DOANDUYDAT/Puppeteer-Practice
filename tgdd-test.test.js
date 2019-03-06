let puppeteer = require('puppeteer');
let browser = null;
let page = null;

describe('The gioi di dong test', () => {

    // Code này được chạy khi bắt đầu chạy unit test
    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 720
        });

        // Mặc định, timeout của jest là 5s. 
        // Vì web load có thể lâu nên ta tăng lên thành 60s.
        jest.setTimeout(60000);
    });

    // Đóng trình duyệt sau khi đã chạy xong các test case
    afterAll(async () => {
        await browser.close();
    });

    // Trước khi chạy mỗi test case, vào trang chủ của lazada
    beforeEach(async () => {
        await page.goto('https://www.thegioididong.com/');
    });


    test('Search smartphone asus', async () => {
        expect.assertions(1);
        try {
            const searchBox = await page.$('#search-keyword');
            await searchBox.type('smartphone asus');
            await searchBox.press('Enter');

            await page.waitForNavigation();
            const products = await page.$$('li.cat42');
            expect(products.length).toBe(12);
        } catch (error) {
            console.log(error);
        }
    });
})