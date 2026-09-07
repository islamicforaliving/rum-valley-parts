const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePDF() {
  const htmlPath = path.join(__dirname, 'client-summary.html');
  const pdfPath = path.join(__dirname, 'Rum-Valley-Parts-Project-Summary.pdf');
  
  // Read the markdown file
  const mdContent = fs.readFileSync(path.join(__dirname, 'CLIENT-SUMMARY.md'), 'utf8');
  
  // Simple markdown to HTML converter
  let html = mdContent
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^\|(.+)\|$/gm, (match, content) => `<td>${content}</td>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #1a1a2e; border-bottom: 3px solid #ff6b35; padding-bottom: 10px; font-size: 28px; }
    h2 { color: #1a1a2e; margin-top: 30px; font-size: 22px; }
    h3 { color: #333; font-size: 18px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-size: 14px; }
    strong { color: #ff6b35; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin: 5px 0; }
    table { border-collapse: collapse; width: 100%; margin: 15px 0; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #1a1a2e; color: white; }
    tr:nth-child(even) { background: #f9f9f9; }
    .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .contact { background: #e8f4f8; padding: 15px; border-radius: 5px; margin-top: 30px; }
  </style>
</head>
<body>
  ${html}
</body>
</html>
  `;
  
  // Write HTML
  fs.writeFileSync(htmlPath, html);
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set content
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' }
  });
  
  await browser.close();
  console.log('PDF generated:', pdfPath);
}

generatePDF().catch(console.error);

