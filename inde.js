const axios = require("axios");

function isUrlValid(url) {
  // Basic URL validation (you can use more advanced validation if needed)
  return url.startsWith("http://") || url.startsWith("https://");
}

async function fetchDataFromUrl(url) {
  try {
    const response = await axios.get(url);
    return response.data.numbers;
  } catch (error) {
    console.error("Error fetching data from URL:", url);
    return [];
  }
}

async function fetchAndMergeData(urls) {
  const validUrls = urls.filter(isUrlValid);
  const promises = validUrls.map(fetchDataFromUrl);

  try {
    const responses = await Promise.all(promises);
    const mergedNumbers = [...new Set(responses.flat())].sort((a, b) => a - b);
    return { numbers: mergedNumbers };
  } catch (error) {
    console.error("Error fetching data from URLs:", error);
    throw new Error("Failed to fetch data from URLs");
  }
}


const urls = [
  "http://20.244.56.144/numbers/primes",
  "http://abc.com/fibo"
];

fetchAndMergeData(urls)
  .then(result => console.log(result))
  .catch(error => console.error(error));