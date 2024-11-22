const API_BASE_URL = 'https://snipster.onrender.com/api/url';

// DOM Elements
const shortenForm = document.getElementById('shortenForm');
const originalUrlInput = document.getElementById('originalUrl');
const shortUrlSection = document.getElementById('shortenedUrl');
const shortUrlLink = document.getElementById('shortUrl');
const analyticsSection = document.getElementById('analytics');
const clickCountText = document.getElementById('clickCount');
const originalLinkText = document.getElementById('originalLink');

// Shorten URL Event
shortenForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const originalUrl = originalUrlInput.value;

  try {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();

    if (response.ok) {
      // Display Shortened URL
      shortUrlLink.href = `${window.location.origin}/${data.shortCode}`;
      shortUrlLink.textContent = `${window.location.origin}/${data.shortCode}`;
      shortUrlSection.classList.remove('hidden');

      // Reset Form
      originalUrlInput.value = '';

      // Fetch Analytics
      fetchAnalytics(data.shortCode);
    } else {
      alert(data.error || 'Failed to shorten URL');
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
  }
});

// Fetch Analytics
async function fetchAnalytics(shortCode) {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/${shortCode}`);
    const data = await response.json();

    if (response.ok) {
      analyticsSection.classList.remove('hidden');
      clickCountText.textContent = `Click Count: ${data.clickCount}`;
      originalLinkText.textContent = `Original URL: ${data.originalUrl}`;
    } else {
      alert(data.error || 'Failed to fetch analytics');
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
  }
}
