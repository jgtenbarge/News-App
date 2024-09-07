const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
       console.log(data); // Return the data
       displayNews();
    } catch (error) {
        console.error('There was an error!', error);
        throw error; // Throw the error to be caught by the caller
    }
}

fetchNews()
    .then(data => {
        displayNews(data.articles);
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });

    function displayNews(articles) {
      const newsDiv = document.querySelector('#news');
      
      // Loop through each article in the array
      for (const article of articles) {
          // Create a container for each article
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article'); // Optional: Add a class for styling purposes
  
          // Create and append the headline (title) to the articleDiv
          const title = document.createElement('h2');
          title.textContent = article.title;
          articleDiv.appendChild(title);
          
          // Create and append the description to the articleDiv
          const description = document.createElement('p');
          description.textContent = article.description;
          articleDiv.appendChild(description);
  
          // Create and append the image to the articleDiv, if available
          if (article.urlToImage) {
              const image = document.createElement('img');
              image.src = article.urlToImage;
              image.alt = article.title; // Optional: Set alt attribute for accessibility
              articleDiv.appendChild(image);
          }
  
          // Create and append a link to the full article to the articleDiv
          const link = document.createElement('a');
          link.textContent = "Read more";
          link.href = article.url;
          link.target = "_blank"; // Open the link in a new tab
          articleDiv.appendChild(link);
  
          // Append the articleDiv to the newsDiv
          newsDiv.appendChild(articleDiv);
      }
  }