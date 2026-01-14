const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('Starting PDF generation...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlUrl = `file://${htmlPath}`;

  console.log(`Loading: ${htmlUrl}`);
  await page.goto(htmlUrl, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Generate PDF
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'umbrella7-one-pager.pdf');

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  console.log(`PDF generated: ${outputPath}`);

  await browser.close();
  console.log('Done!');
}

generatePDF().catch(console.error);
