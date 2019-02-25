const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const { parse } = require("url");
module.exports = function(req, res) {
  const {
    query: { stats }
  } = parse(req.url, true);
  (async () => {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    });
    const page = await browser.newPage();
    const url = `https://photo-pieces.now.sh/screenshot?stats=${stats}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    const image = await page.screenshot({ fullPage: true });
    res.end(image);
  })();
};
