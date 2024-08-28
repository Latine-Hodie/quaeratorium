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

const tileContainer = document.querySelector("#news-tiles .tile-container");
const numTiles = 6; // Number of tiles to create

// Create empty tiles
for (let i = 0; i < numTiles; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.innerHTML = `
    <img src="placeholder.jpg" alt="Placeholder">
    <h3>Placeholder Title</h3>
    <p>Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  `;
  tileContainer.appendChild(tile);
}

newsFeeds.forEach(feedUrl => {
  fetch(feedUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const items = xmlDoc.querySelectorAll('item');

      // Update existing tiles with RSS data
      for (let i = 0; i < items.length && i < numTiles; i++) {
        const item = items[i];
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        let image = item.querySelector('media:content[url]');
        image = image ? image.getAttribute('url') : ''; 

        tileContainer.children[i].innerHTML = `
          <a href="${link}">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
          </a>
        `;
      }
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

// Do the same for "New Uploads" section
const newUploadsContainer = document.querySelector("#new-uploads .tile-container");

for (let i = 0; i < numTiles; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.innerHTML = `
    <img src="placeholder.jpg" alt="Placeholder">
    <h3>Placeholder Title</h3>
    <p>Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  `;
  newUploadsContainer.appendChild(tile);
}
