// Import required libraries
import { faker } from '@faker-js/faker';
// const {faker} = require('@faker-js/faker'); // For generating random names and dates

// Function to generate a random date within a range
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


// Function to generate IPO data
export function generateIPOData(count) {
    const ipoData = [];
    for (let i = 0; i < count; i++) {
        const Ipo=generateIpoObject()
        ipoData.push(Ipo);
    }

return ipoData

}


function generateIpoObject() {
  const today = new Date(); // Current date for comparisons

  // Generate an IPO opening date in the last week of December 2024
  const ipoOpenDate = new Date(2024, 11, 25 + Math.floor(Math.random() * 7)); // Between Dec 25 and Dec 31

  // Generate IPO closing date 3 days after the IPO open date
  const ipoCloseDate = new Date(ipoOpenDate);
  ipoCloseDate.setDate(ipoOpenDate.getDate() + 3);

  // Generate listing date 3 days after the IPO close date
  const listingDate = new Date(ipoCloseDate);
  listingDate.setDate(ipoCloseDate.getDate() + 3);

  // Determine status and isListed based on today's date
  let status;
  let isListed = false;

  if (today > listingDate) {
      status = 'Listed';
      isListed = true;
  } else if (today >= ipoOpenDate && today <= ipoCloseDate) {
      status = 'Open';
  } else if (today > ipoCloseDate && today < listingDate) {
      status = 'Closed';
  } else if (today < ipoOpenDate) {
      status = 'Upcoming';
  }

  // Generate random GMP value (positive or negative)
  const randomSign = Math.random() < 0.5 ? -1 : 1;
  const gmpValue = randomSign * (10 + Math.random() * 90); // Random value between -100 and 100

  // Generate price band start and end values
  const priceBandStart = 100 + Math.random() * 50; // Random value between 100 and 150
  const priceBandEnd = 150 + Math.random() * 50;   // Random value between 150 and 200

  // Calculate the estimated listing price and percentage
  const estimatedPrice = (gmpValue + priceBandEnd).toFixed(2);
  const estimatedListingPercent = ((gmpValue / priceBandEnd) * 100).toFixed(2);

  return {
      title: faker.company.name(), // Generate a random company name using faker
      ipoOpenDate: ipoOpenDate.toISOString(),
      ipoCloseDate: ipoCloseDate.toISOString(),
      listingDate: listingDate.toISOString(),
      priceBandStart: priceBandStart.toFixed(2),
      priceBandEnd: priceBandEnd.toFixed(2),
      status,
      isListed,
      listingPrice: isListed ? `₹${(100 + Math.random() * 100).toFixed(2)}` : null, // Random listing price
      greyMarket: {
          gmpDate: new Date(today.getTime() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString(), // Random recent date
          gmp: `₹${gmpValue.toFixed(2)}`,
          estimatedListingPrice: `₹${estimatedPrice} (${estimatedListingPercent}%)`,
          lastUpdated: new Date(today.getTime() - Math.floor(Math.random() * 24) * 60 * 60 * 1000).toISOString(), // Random recent time
      },
  };
}





