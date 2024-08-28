//script.js
function search() {
  const searchTerm = document.getElementById("search-bar").value;
  const searchEngine = document.getElementById("search-engine").value;
  window.location.href = searchEngine + searchTerm;
}

// Event listener for Enter key press
document.getElementById('search-bar').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    search();
  }
});

// Fetch RSS feeds and display news tiles
const newsFeeds = [
  "https://feeds.npr.org/1001/rss.xml",  // NPR News
  "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", // New York Times
  "https://www.bbc.com/news/rss/newshome.xml", // BBC News
  "https://feeds.reuters.com/reuters/worldNews", // Reuters
  "https://news.google.com/rss/search?q=technology&hl=en&gl=US&ceid=US:en" // Google News (Technology)
];

newsFeeds.forEach(feedUrl => {
  fetch(feedUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const items = xmlDoc.querySelectorAll('item');
      items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        let image = item.querySelector('media:content[url]');
        image = image ? image.getAttribute('url') : ''; // Default to empty if no image

        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = `
          <a href="${link}">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
          </a>
        `;
        document.querySelector("#news-tiles .tile-container").appendChild(tile);
      });
    })
    .catch(error => {
      console.error(`Error fetching ${feedUrl}:`, error);
      // Display an error message for the user
      const errorMessage = document.createElement("p");
      errorMessage.textContent = `Error loading feed: ${feedUrl}`;
      errorMessage.style.color = "red";
      document.querySelector("#news-tiles .tile-container").appendChild(errorMessage);
    });
});

// Fetch and display new uploads (logic depends on the source)