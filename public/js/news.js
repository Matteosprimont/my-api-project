async function fetchNews() {
    const response = await fetch('/news');
    const newsList = await response.json();
    const newsContainer = document.getElementById('news');

    newsContainer.innerHTML = '';

    newsList.forEach(news => {
        const li = document.createElement('li');
        li.textContent = `${news.title}: ${news.content}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijderen';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteNews(news.id));

        li.appendChild(deleteButton);
        newsContainer.appendChild(li);
    });
}

async function addNews(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image_url = document.getElementById('image_url').value;

    await fetch('/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image_url }),
    });

    fetchNews(); 
    document.getElementById('news-form').reset(); 
}

document.getElementById('news-form').addEventListener('submit', addNews);

fetchNews();
