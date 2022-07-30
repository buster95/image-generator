import path from 'path';
import playwright from 'playwright';
import html2canvas from 'html2canvas';

export async function generate() {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage({ viewport: { width: 600, height: 338 } });
    await page.goto(`file://${path.join(__dirname, 'badge-template/index.html')}`);
    await page.evaluate(() => { })
    const image = await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
    return image;
}