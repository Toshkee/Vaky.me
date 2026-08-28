import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 800 }
});

await page.goto('http://localhost:3000/#kontakt');
await page.waitForLoadState('networkidle');

// Fill the first input (link field)
await page.fill('input[name="link"]', 'example.com');
// Fill the second input (contact field) - this should trigger the check mark
await page.fill('input[name="contact"]', 'test@example.com');

// Wait a moment for the check mark to appear
await page.waitForTimeout(300);

// Take a screenshot
await page.screenshot({ path: '/tmp/mobile-contact.jpg' });
console.log('Screenshot saved to /tmp/mobile-contact.jpg');

// Get the status message element
const statusMsg = await page.locator('p[role="status"]').first();
const statusBox = await statusMsg.boundingBox();
console.log('Status message bounding box:', statusBox);

// Get the check icon element (it's a span with a CheckIcon inside)
const checkIcon = await page.locator('span.px-card').first();
const checkBox = await checkIcon.boundingBox();
console.log('Check icon bounding box:', checkBox);

if (checkBox && statusBox) {
  // Check for overlap
  const checkTop = checkBox.y;
  const checkBottom = checkBox.y + checkBox.height;
  const statusTop = statusBox.y;
  const statusBottom = statusBox.y + statusBox.height;
  
  console.log(`\nCheck bubble Y range: ${checkTop.toFixed(1)} - ${checkBottom.toFixed(1)}`);
  console.log(`Status message Y range: ${statusTop.toFixed(1)} - ${statusBottom.toFixed(1)}`);
  
  // Check if they overlap vertically
  if (checkTop < statusBottom && checkBottom > statusTop) {
    console.log('\n*** OVERLAP DETECTED ***');
    console.log('The check bubble overlaps with the status message text!');
    console.log(`Overlap range: ${Math.max(checkTop, statusTop).toFixed(1)} - ${Math.min(checkBottom, statusBottom).toFixed(1)}`);
  } else {
    console.log('\nNo vertical overlap detected');
  }
}

await browser.close();
