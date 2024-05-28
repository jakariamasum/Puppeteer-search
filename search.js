const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const searchQuery = "OpenAI";

  await page.goto("https://www.google.com");
  await page.type("input[name=q]", searchQuery);
  await page.keyboard.press("Enter");
  await page.waitForSelector("h3");

  const results = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("h3"));
    return links.map((link) => link.innerText);
  });

  console.log("Search results for:", searchQuery);
  results.forEach((result, index) => {
    console.log(`${index + 1}: ${result}`);
  });

  await browser.close();
})();
