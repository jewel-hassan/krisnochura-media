const sheetURL = "https://script.google.com/macros/s/AKfycbwUVMaYnHuzMSeOqNrbC34vTdtzlwzfjyq3FGNT0IACe7W6CMSMh99ds5t_HHi6PPTxOg/exec"; // তোমার Apps Script Web App URL বসাও
const apiKey = "AIzaSyDQlpeexWgLgeh9F7p7YsOOl70p6Vg6cMw"; // তোমার YouTube API Key

// ইউটিউব ভিডিও ID বের করার ফাংশন
function extractYouTubeID(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Google Sheet এ নতুন ভিডিও যোগ করার ফাংশন
async function embedVideo() {
  const link = document.getElementById('youtubeLink').value.trim();
  const videoId = extractYouTubeID(link);

  if (!videoId) {
    alert("❌ সঠিক YouTube লিংক দিন!");
    return;
  }

  try {
    const res = await fetch(sheetURL, {
      method: 'POST',
      body: new URLSearchParams({ youtubeLink: link }),
    });
    const data = await res.json();

    if (data.result === 'success') {
      alert("ভিডিও সফলভাবে যোগ করা হয়েছে!");
      loadVideos();
      document.getElementById('youtubeLink').value = "";
    } else {
      alert("❌ ত্রুটি: " + data.error);
    }
  } catch (error) {
    alert("❌ Google Sheet সেভ করতে সমস্যা হয়েছে।");
    console.error(error);
  }
}

// YouTube API থেকে ভিডিও স্ট্যাটস নিয়ে আসা
async function fetchYouTubeStats(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.items || json.items.length === 0) return null;

  const video = json.items[0];
  return {
    title: video.snippet.title,
    viewCount: video.statistics.viewCount,
    likeCount: video.statistics.likeCount || 0,
    commentCount: video.statistics.commentCount || 0,
  };
}

// Google Sheet থেকে ভিডিও লিস্ট লোড করা ও দেখানো
async function loadVideos() {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "ভিডিও লোড হচ্ছে...";

  try {
    const res = await fetch(sheetURL);
    const videos = await res.json();

    container.innerHTML = "";

    for (const video of videos) {
      const videoId = extractYouTubeID(video.youtubeLink);
      if (!videoId) continue;

      const stats = await fetchYouTubeStats(videoId);
      if (!stats) continue;

      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
        <div class="video-info">
          <h3>${stats.title}</h3>
          <p>👁️ View: ${stats.viewCount}</p>
          <p>👍 Like: ${stats.likeCount}</p>
          <p>💬 Comment: ${stats.commentCount}</p>
        </div>
      `;
      container.appendChild(card);
    }
  } catch (err) {
    container.innerHTML = "❌ ভিডিও লোড করতে সমস্যা হয়েছে";
    console.error(err);
  }
}

window.onload = loadVideos;
