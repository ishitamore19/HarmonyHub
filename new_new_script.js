// YouTube API Key
const apiKey = 'AIzaSyBO5CqZ6A4FWzWd1DCvJ_rcvWePxXLuDIA';

// NewsAPI Key
const newsApiKey = '597b9912580f47b0b61c5dc6733710b3';

// Search button click event
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-query').value;
    fetchYouTubeVideos(query);
    fetchRelatedArticles(query);
});

// Function to fetch YouTube videos
function fetchYouTubeVideos(query) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=5&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoContainer = document.getElementById('video-results');
            videoContainer.innerHTML = '';  // Clear previous results
            data.items.forEach(video => {
                const videoId = video.id.videoId;
                const videoTitle = video.snippet.title;
                const videoThumbnail = video.snippet.thumbnails.medium.url;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                // Create a new div for each video
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item');
                videoElement.innerHTML = `
                    <a href="${videoUrl}" target="_blank">
                        <img src="${videoThumbnail}" alt="${videoTitle}" class="thumbnail" />
                    </a>
                    <div class="video-title">
                        <a href="${videoUrl}" target="_blank">${videoTitle}</a>
                    </div>
                `;
                videoContainer.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
}

// Function to fetch related articles from NewsAPI
function fetchRelatedArticles(query) {
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`;

    fetch(newsApiUrl)
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles-results');
            articlesContainer.innerHTML = '';  // Clear previous results
            data.articles.forEach(article => {
                const articleTitle = article.title;
                const articleUrl = article.url;
                const articleDescription = article.description;
                const articleSource = article.source.name;

                // Create a new div for each article
                const articleElement = document.createElement('div');
                articleElement.classList.add('article-item');
                articleElement.innerHTML = `
                    <h4>${articleSource}</h4>
                    <a href="${articleUrl}" target="_blank">${articleTitle}</a>
                    <p>${articleDescription}</p>
                `;
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
}
