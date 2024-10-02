const fetch = require('node-fetch');

function extractURL() {
    const relativeLinks = Array.from(document.querySelectorAll("a"))
        .map(link => link.getAttribute('href'))
        .filter(href => href.startsWith('/sites'));
    console.log(relativeLinks);
    return relativeLinks;
}

function checkLink(url) {
    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log('Link is working:');
        } else if (response.status === 404) {
          console.log('Link not found (404):\n', url);
        } else {
          console.log('Other error:', response.status, url);
        }
      })
      .catch(error => {
        console.error('Error checking link:', error, url);
      });
  }

  async function checkLink1(url) {
    try {
        const response = await fetch(url);
        const result = response.status === 200
            ? `Page exists: ${url}\n`
            : `Page not found (status ${response.status}): ${url}\n`;
        console.log(result);
        fs.appendFileSync(logFile, result);
    } catch (error) {
        const errorResult = `Error fetching ${url}: ${error.message}\n`;
        console.error(errorResult);
        fs.appendFileSync(logFile, errorResult);
    }
}

async function checkAllLinks() {
    fs.writeFileSync(logFile, ''); // Clear previous log
    const promises = links.map(link => checkLink(`${rootURL}${link}`));
    await Promise.all(promises);
}
  
let rootURL = 'https://live-azs-nursing.pantheonsite.io';
//   checkLink(`${rootURL}/sites/default/files/2024-2025%20Part-Time%20DfgNP%20PMHNP%20Program%20of%20Study.pdf`);

let links = extractURL();
for (let link of links) {
    console.log(`Checking URL: ${rootURL}${link}`);
    checkLink(`${rootURL}${link}`);
}