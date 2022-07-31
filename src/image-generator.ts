import path from 'path';
import playwright from 'playwright';

type ImageData = {
    username: string;
    category: string;
};

export async function generate(data?: ImageData): Promise<Buffer> {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage({ viewport: { width: 600, height: 338 } });
    await page.goto(`file://${path.join(__dirname, 'badge-template/index.html')}`);
    if (data) {
        page.evaluate((args) => {
            const { username, category } = args;
            const spanUsername = document.querySelector('#username');
            const spanCategory = document.querySelector('#category');
            if (spanUsername) spanUsername.textContent = username;
            if (spanCategory) spanCategory.textContent = category;
        }, data);
    };
    const image = await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
    return image;
}