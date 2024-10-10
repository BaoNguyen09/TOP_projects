const axios = require('axios');
const cheerio = require('cheerio');

const websiteURLs = [
  'https://live-azs-nursing.pantheonsite.io/phd-admissions',
  'https://live-azs-nursing.pantheonsite.io/resources/uahs-room-scheduling',
  'https://live-azs-nursing.pantheonsite.io/predicting-adequate-response-to-oxytocin-estudio',
  'https://live-azs-nursing.pantheonsite.io/resources/research-human-subjects-templates',
  'https://live-azs-nursing.pantheonsite.io/mothers-babies-es',
  'https://live-azs-nursing.pantheonsite.io/mothers-babies',
  'https://live-azs-nursing.pantheonsite.io/resources/space-facilities',
  'https://live-azs-nursing.pantheonsite.io/research',
  'https://live-azs-nursing.pantheonsite.io/policies/exam-guidelines-nhe-faculty',
];


// 1. Check all links for 404 errors
async function checkLinksForErrors(websiteURL) {
  let errorLinks = [];
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
      // console.log(link);
      if (link.startsWith("/")) { // for relative links
        link = "https://live-azs-nursing.pantheonsite.io" + link;
      }
      if (link.includes('www.nursing.arizona.edu')) { // for link from old page
        console.log(`Nursing error: ${link}`);
        link = link.replace("www.nursing.arizona.edu", "live-azs-nursing.pantheonsite.io");
        // Optionally, ensure the link starts with 'https://'
        if (!link.startsWith('https://')) {
          link = 'https://' + link;
        }
      }
      if (link.includes('@email.arizona.edu')) { // for old email address
        console.log(`Email error: ${link}`);
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
          errorLinks.push(link);
          // console.log(`404 error found at: ${link}`);
        }
      } catch (e) {
        if (e == "AxiosError: Request failed with status code 404") {
          errorLinks.push(link);
        } // else if (e == "AxiosError: Unsupported protocol mailto: ") {
        //   errorLinks.push(link);
        // }
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
  
  for (link of websiteURLs) {
    console.log(`Starting checks... ${link}`);
    const error1 = await checkLinksForErrors(link);
    displayContent(error1);
    console.log("");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
  }
  
})();