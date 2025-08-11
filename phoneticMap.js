// phoneticMap.js
const phoneticMap = {
  "ami": "আমি",
  "tumi": "তুমি",
  "tomi":"তুমি",
  "tor": "তোর",
  "amar": "আমার",
  "khala": "খালা",
  "valo": "ভালো",
  "kichu": "কিছু",
  "kichu nai": "কিছু নাই",
  "kemon": "কেমন",
  "ase": "আছে",
  "na": "না",
  "valo asi": "ভালো আছি",
  "valo achi": "ভালো আছি"
  // চাইলে আরও শব্দ যুক্ত করো
};

function phoneticToBangla(input) {
  let result = input.toLowerCase();

  // বড় শব্দ আগে রূপান্তর করো (যাতে "tor" আগে না হয়, "tor khala" বাদ পড়ে না)
  const sortedKeys = Object.keys(phoneticMap).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    const bangla = phoneticMap[key];
    const regex = new RegExp(`\\b${key}\\b`, 'gi'); // পুরো শব্দ হিসেবে মিল
    result = result.replace(regex, bangla);
  });

  return result;
}
