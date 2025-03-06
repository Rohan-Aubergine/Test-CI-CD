import axios from 'axios';
import * as cheerio from 'cheerio';
// const url='https://www.investorgain.com/default.asp'

axios.get(url).then((response) => {
  const $ = cheerio.load(response.data);
  $('table').each((i, elem) => {
    console.log($(elem).text());
  });
  // const html=response.data
  // console.log(html);
});
