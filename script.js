// const scriptURL = 'https://script.google.com/macros/s/AKfycbwKNpK0HKBIjl27xSRcXoyY6IbqQNn3IT23JwkA3wUrsz-ZCrLFz_m5FzdPU2nn0LEVhg/exec'; // ✅ এখানে Apps Script URL বসাও

// let videoList = [];

// function embedVideo() {
//   const link = document.getElementById('youtubeLink').value;
//   const videoId = extractYouTubeID(link);

//   if (videoId) {
//     if (videoList.includes(videoId)) {
//       alert("⚠️ এই ভিডিওটি ইতিমধ্যেই দেখানো হয়েছে!");
//     } else {
//       // Submit to Google Sheet
//       fetch(scriptURL, {
//         method: 'POST',
//         body: new URLSearchParams({
//           youtubeLink: link
//         })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (data.result === 'success') {
//           videoList.push(videoId);
//           displayVideos();
//           document.getElementById('youtubeLink').value = "";
//         } else {
//           alert("❌ সার্ভারে ত্রুটি: " + data.error);
//         }
//       });
//     }
//   } else {
//     alert("❌ সঠিক YouTube লিংক দিন!");
//   }
// }

// function extractYouTubeID(url) {
//   const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// }

// function displayVideos() {
//   const container = document.getElementById("videoContainer");
//   container.innerHTML = "";

//   videoList.forEach(id => {
//     const videoCard = document.createElement("div");
//     videoCard.className = "video-card";

//     videoCard.innerHTML = `
//       <div class="video-info">
//         <h3>ভিডিও আইডি: ${id}</h3>
//         <iframe src="https://www.youtube.com/embed/${id}" allowfullscreen loading="lazy"></iframe>
//       </div>
//     `;

//     container.appendChild(videoCard);
//   });
// }





// const scriptURL = 'https://script.google.com/macros/s/AKfycbw8yhcqwMTs_lOBrLbg06NYb9CnlE60NW92C8D7aURGeH7KBs1BeNEbdpgqm3a79Pn0jg/exec'; // 🔁 তোমার Apps Script URL বসাও
// const apiKey = 'AIzaSyDQlpeexWgLgeh9F7p7YsOOl70p6Vg6cMw'; // 🔁 এখানে তোমার YouTube API Key বসাও

// let videoList = [];

// function embedVideo() {
//   const link = document.getElementById('youtubeLink').value.trim();
//   const videoId = extractYouTubeID(link);

//   if (videoId) {
//     if (videoList.includes(videoId)) {
//       alert("⚠️ এই ভিডিওটি ইতিমধ্যেই দেখানো হয়েছে!");
//     } else {
//       // 1. Save link to Google Sheet
//       fetch(scriptURL, {
//         method: 'POST',
//         body: new URLSearchParams({ youtubeLink: link })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (data.result === 'success') {
//           videoList.push(videoId);
//           fetchAndDisplayVideo(videoId); // 2. Show Video with YouTube API
//           document.getElementById('youtubeLink').value = "";
//         } else {
//           alert("❌ সার্ভারে ত্রুটি: " + data.error);
//         }
//       })
//       .catch(err => {
//         console.error("❌ Google Sheet সেভ করতে সমস্যা:", err);
//         alert("⚠️ Google Sheet সেভ করতে সমস্যা হয়েছে!");
//       });
//     }
//   } else {
//     alert("❌ সঠিক YouTube লিংক দিন!");
//   }
// }

// // ✅ সব ধরণের YouTube লিংক সাপোর্ট করবে
// function extractYouTubeID(url) {
//   try {
//     const parsed = new URL(url);
//     const path = parsed.pathname;

//     if (parsed.hostname.includes("youtu.be")) {
//       return path.split("/")[1];
//     } else if (parsed.searchParams.has("v")) {
//       return parsed.searchParams.get("v");
//     } else if (path.includes("/embed/")) {
//       return path.split("/embed/")[1];
//     } else if (path.includes("/shorts/")) {
//       return path.split("/shorts/")[1];
//     }
//   } catch (e) {
//     return null;
//   }
//   return null;
// }

// // ✅ YouTube API দিয়ে ভিডিও দেখাবে + View, Like, Comment
// function fetchAndDisplayVideo(videoId) {
//   const apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

//   fetch(apiURL)
//     .then(res => res.json())
//     .then(data => {
//       if (!data.items || data.items.length === 0) {
//         alert("❌ ভিডিও পাওয়া যায়নি!");
//         return;
//       }

//       const video = data.items[0];
//       const title = video.snippet.title;
//       const views = video.statistics.viewCount;
//       const likes = video.statistics.likeCount || 0;
//       const comments = video.statistics.commentCount || 0;

//       const container = document.getElementById("videoContainer");

//       const videoCard = document.createElement("div");
//       videoCard.className = "video-card";

//       videoCard.innerHTML = `
//         <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
//         <div class="video-info">
//           <h3>${title}</h3>
//           <p>👁️ ভিউ: ${views} | 👍 লাইক: ${likes} | 💬 কমেন্ট: ${comments}</p>
//         </div>
//       `;

//       container.appendChild(videoCard);
//     })
//     .catch(err => {
//       console.error("❌ ভিডিও API লোড সমস্যা:", err);
//       alert("⚠️ ভিডিও তথ্য লোড করতে সমস্যা হয়েছে!");
//     });
// }




const scriptURL = 'https://script.google.com/macros/s/AKfycbz30xMOwIl38Fq9lH2k57hUNWT3W1P9vR3sUqcH2meWZYLne-hiFvjfOWNzGlajuInH/exec';  // এখানে তোমার Apps Script এর exec URL দিবে

// YouTube ভিডিও ID বের করার ফাংশন
function extractYouTubeID(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;

    if (parsed.hostname.includes("youtu.be")) {
      return path.split("/")[1];
    } else if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v");
    } else if (path.includes("/embed/")) {
      return path.split("/embed/")[1];
    } else if (path.includes("/shorts/")) {
      return path.split("/shorts/")[1];
    }
  } catch (e) {
    return null;
  }
  return null;
}

// ইউজার নতুন ভিডিও যোগ করলে Google Sheet-এ POST করবে
function embedVideo() {
  const link = document.getElementById('youtubeLink').value.trim();
  const videoId = extractYouTubeID(link);

  if (!videoId) {
    alert("❌ সঠিক YouTube লিংক দিন!");
    return;
  }

  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({ youtubeLink: link }),
  })
  .then(res => res.json())
  .then(data => {
    if(data.result === 'success') {
      alert("✅ ভিডিও সফলভাবে যোগ করা হয়েছে!");
      document.getElementById('youtubeLink').value = '';
      loadVideosFromSheet(); // আবার সব ভিডিও লোড করো
    } else if (data.error === 'Duplicate entry') {
      alert("⚠️ ভিডিওটি ইতিমধ্যেই যুক্ত আছে!");
    } else {
      alert("❌ ত্রুটি: " + (data.error || "অজানা"));
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("❌ Google Sheet-এ সংরক্ষণ করতে সমস্যা হয়েছে!");
  });
}

// Google Sheet থেকে ভিডিও ডেটা GET করে দেখাবে
function loadVideosFromSheet() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("videoContainer");
      container.innerHTML = "";

      // নতুন ভিডিও উপরের দিকে দেখাবে
      data.reverse().forEach(video => {
        const videoId = extractYouTubeID(video.youtubeLink);
        if (!videoId) return;

        const videoCard = document.createElement("div");
        videoCard.className = "video-card";

        videoCard.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
          <div class="video-info">
            <h3>${video.title}</h3>
            <p>👁️ ভিউ: ${video.viewCount} | 👍 লাইক: ${video.likeCount} | 💬 কমেন্ট: ${video.commentCount}</p>
          </div>
        `;

        container.appendChild(videoCard);
      });
    })
    .catch(err => {
      console.error("Google Sheet থেকে ডেটা আনতে সমস্যা:", err);
    });
}

// পেজ লোড হলে স্বয়ংক্রিয় ভিডিও লোড করবে
window.onload = loadVideosFromSheet;

