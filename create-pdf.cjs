const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePDF() {
  const htmlPath = path.join(__dirname, 'deployment-guide.html');
  const pdfPath = path.join(__dirname, 'Deployment-Guide-Rum-Valley-Parts.pdf');
  
  // Read the HTML file
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Launch browser with headless mode
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set content
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
  });
  
  await browser.close();
  console.log('PDF generated:', pdfPath);
}

generatePDF().catch(console.error);
