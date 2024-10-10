const axios = require('axios');
const cheerio = require('cheerio');

const websiteURL = "https://live-azs-nursing.pantheonsite.io/resources/research";

// 1. Check all links for 404 errors
async function checkLinksForErrors() {
  let errorLinks = [];
  try {
    const response = await axios.get(websiteURL);
    const $ = cheerio.load(response.data);

    const links = $('a'); // Get all the anchor tags
    console.log(`Found ${links.length} links on the page.`);

    for (let i = 0; i< links.length; i++) {
      let link = $(links[i]).attr('href');
      // console.log(link);
      if (link.startsWith("/")) {
        link = "https://live-azs-nursing.pantheonsite.io" + link;
      }
      if (link.includes('www.nursing.arizona.edu')) {
        console.log(`Nursing error: ${link}`);
      }
      if (link.includes('@email.arizona.edu')) {
        console.log(`Email error: ${link}`);
      }

      // Skip if link is not valid or is an internal link/anchor
      if (!link || link.startsWith('#') || link.startsWith('mailto:')) {
        console.log(`This is a special link: ${link}`);
      };

      try {
        const res = await axios.get(link);
        if (res.status == 404) {
          errorLinks.push(link);
          // console.log(`404 error found at: ${link}`);
        }
      } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") {
          errorLinks.push(link);
        } else if (e == "AxiosError: Unsupported protocol mailto: ") {
          errorLinks.push(link);
        }
        else console.log(`Error fetching link ${link}: ${e}`);
      }
    }
  } catch (e) {
    console.error(`Could not fetch the main page: ${e.message}`);
  }
  return errorLinks;
}

// 2. Check if there's a link from the domain: www.nursing.arizona.edu
async function checkForSpecificDomain() {
  let errorLinks = [];
  try {
      const response = await axios.get(websiteURL);
      const $ = cheerio.load(response.data);

      const links = $('a');
      const domainToFind = 'www.nursing.arizona.edu';
      let foundLink = false;

      links.each((i, link) => {
          const href = $(link).attr('href');
          if (href && href.includes(domainToFind)) {
              errorLinks.push(href);
              console.log(`Link found from domain ${domainToFind}: ${href}`);
              foundLink = true;
          }
      });

      if (!foundLink) {
          console.log(`No link from the domain ${domainToFind} was found.`);
      }
  } catch (error) {
      console.error(`Error checking domain links: ${error.message}`);
  }
  return errorLinks;
}

// 3. Check if any email matches the pattern: @email.arizona.edu
async function checkForEmailPattern() {
  let errorLinks = [];
  try {
      const response = await axios.get(websiteURL);
      const $ = cheerio.load(response.data);

      const bodyText = $('body').text(); // Get all text from the body
      const emailPattern = /[a-zA-Z0-9._%+-]+@email\.arizona\.edu/g;
      const emails = bodyText.match(emailPattern);

      if (emails) {
          errorLinks.push(emails);
          console.log(`Email(s) found: ${emails.join(', ')}`);
      } else {
          console.log("No emails matching the pattern @email.arizona.edu found.");
      }
  } catch (error) {
      console.error(`Error checking for emails: ${error.message}`);
  }
  return errorLinks;
}

function displayContent(error1) {
  // let show1 = document.querySelector(".404_error");
  // let show2 = document.querySelector(".email_error");
  // let show3 = document.querySelector(".nursing_error");
  console.log("---------------------------------------------------------------");
  console.log("Links with 404 Error");
  error1.forEach((link) => {
    console.log(link);
  })

  // console.log("Links with Email Error");
  // error2.forEach((link) => {
  //   console.log(link);
  // })

  // console.log("Links with nursing Error");
  // error3.forEach((link) => {
  //   console.log(link);
  // })
}



// Run all the checks
(async function runChecks() {
  console.log("Starting checks...");
  const error1 = await checkLinksForErrors();
  // const error2 = await checkForSpecificDomain();
  // const error3 = await checkForEmailPattern();
  displayContent(error1);
})();

// const fetch = require('node-fetch');

// function extractURL() {
//     const relativeLinks = Array.from(document.querySelectorAll("a"))
//         .map(link => link.getAttribute('href'))
//         .filter(href => href.startsWith('/sites'));
//     console.log(relativeLinks);
//     return relativeLinks;
// }

// function checkLink(url) {
//     fetch(url)
//       .then(response => {
//         if (response.ok) {
//           console.log('Link is working:');
//         } else if (response.status === 404) {
//           console.log('Link not found (404):\n', url);
//         } else {
//           console.log('Other error:', response.status, url);
//         }
//       })
//       .catch(error => {
//         console.error('Error checking link:', error, url);
//       });
//   }

//   async function checkLink1(url) {
//     try {
//         const response = await fetch(url);
//         const result = response.status === 200
//             ? `Page exists: ${url}\n`
//             : `Page not found (status ${response.status}): ${url}\n`;
//         console.log(result);
//         fs.appendFileSync(logFile, result);
//     } catch (error) {
//         const errorResult = `Error fetching ${url}: ${error.message}\n`;
//         console.error(errorResult);
//         fs.appendFileSync(logFile, errorResult);
//     }
// }

// async function checkAllLinks() {
//     fs.writeFileSync(logFile, ''); // Clear previous log
//     const promises = links.map(link => checkLink(`${rootURL}${link}`));
//     await Promise.all(promises);
// }
  
// let rootURL = 'https://live-azs-nursing.pantheonsite.io';
// //   checkLink(`${rootURL}/sites/default/files/2024-2025%20Part-Time%20DfgNP%20PMHNP%20Program%20of%20Study.pdf`);

// let links = extractURL();
// for (let link of links) {
//     console.log(`Checking URL: ${rootURL}${link}`);
//     checkLink(`${rootURL}${link}`);
// }