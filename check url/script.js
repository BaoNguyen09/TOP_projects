const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');

function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_csv(sheet, { header: 1}); // convert to 2D array
}

function writeExcel(results, outputFilePath) {
  const workbook = xlsx.utils.book_new();
  // const header = ["links", "nursing errors", "email errors", "404 errors"];
  // worksheet = [header];
  // const data = xlsx.utils.aoa_to_sheet(results); // convert 2D arr back to excel
  // worksheet.push(data);
  worksheet = xlsx.utils.aoa_to_sheet(results); // convert 2D arr back to excel
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Results');
  xlsx.writeFile(workbook, outputFilePath);
}

// Check all links for errors
async function checkLinksForErrors(websiteURL) {
  let errorLinks = [websiteURL];
  let emailErrors = "";
  let nursingErros = "";
  let pnfErrors = "";
  try {
    const response = await axios.get(websiteURL);
    const $ = cheerio.load(response.data);

    const links = $("#main main a"); // Get all the anchor tags within the main content
    console.log(`Found ${links.length} links on the page.`);

    for (let i = 0; i< links.length; i++) {
      let link = $(links[i]).attr('href');
      if (link === undefined) {
        console.log(link);
        continue;
      }

      if (link.startsWith("//")) { // for some special urls
        link = "https:" + link;
      } else if (link.startsWith("/")) { // for relative links
        link = "https://live-azs-nursing.pantheonsite.io" + link;
      }

      if (link.includes('www.nursing.arizona.edu')) { // for link from old page
        console.log(`Nursing error: ${link}`);
        nursingErros += `${link}\n`

        // continue to check if the link on test site exists
        link = link.replace("www.nursing.arizona.edu", "live-azs-nursing.pantheonsite.io");

        // Optionally, ensure the link starts with 'https://'
        if (!link.startsWith('https://')) {
          link = 'https://' + link;
        }
      }

      if (link.includes('@email.arizona.edu')) { // for old email address
        console.log(`Email error: ${link}`);
        emailErrors += `${link}\n`;
        continue;
      }

      // Skip if link is not valid or is an internal link/anchor
      if (!link || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
        console.log(`This is a special link: ${link}`);
        continue;
      };

      try {
        const res = await axios.get(link, {
          headers: { // use this to mimic a real browser to bypass 403 error by server
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
          }
        });
        if (res.status == 404) {
          pnfErrors += `${link}\n`;
          console.log(`404 error found at: ${link}`);
        }
      } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") {
          // errorLinks.push(link);
        }
        else console.log(`Error fetching link ${link}: ${e}`);
      }
    }
  } catch (e) {
    console.error(`Could not fetch the main page: ${e.message}`);
  }
  errorLinks.push(nursingErros, emailErrors, pnfErrors);
  return errorLinks;
}

// Run all the checks
(async function main() {

  const inputFilePath = './links.xlsx';
  const outputFilePath = './results.xlsx';
  results = [];

  // Step 1: read links from Excel
  let links = readExcel(inputFilePath);
  links = links.split("\n"); // split into array of string links

  // Step 2: check links
  for (link of links) {
    console.log(`Starting checks... ${link}`);
    const error1 = await checkLinksForErrors(link);
    results.push(error1);
  }
  console.log(results);

  // Step 3: write results to Excel
  writeExcel(results, outputFilePath);

  console.log("Finish!");
  
})();