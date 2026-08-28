import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 1200 }  // Taller to capture the full form
});

await page.goto('http://localhost:3000/#kontakt');
await page.waitForLoadState('networkidle');

// Fill the first input (link field)
await page.fill('input[name="link"]', 'example.com');
// Fill the second input (contact field) - this should trigger the check mark
await page.fill('input[name="contact"]', 'test@example.com');

// Wait a moment for the check mark to appear
await page.waitForTimeout(300);

// Scroll to show the entire form and the status message
await page.evaluate(() => {
  const form = document.querySelector('form');
  if (form) {
    // Scroll to the form's bottom buttons area to see the status message
    form.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }
});

await page.waitForTimeout(200);

// Take a full page screenshot
await page.screenshot({ path: '/tmp/mobile-contact-full.jpg', fullPage: false });
console.log('Screenshot saved');

// Get exact positions
const checkIcon = await page.locator('span.px-card').first();
const statusMsg = await page.locator('p[role="status"]').first();

const checkBox = await checkIcon.boundingBox();
const statusBox = await statusMsg.boundingBox();

console.log('Check bubble:', checkBox);
console.log('Status message:', statusBox);

// Also get the text content
const statusText = await statusMsg.textContent();
console.log('Status text:', statusText);

await browser.close();
