let limit = 5;
let offset = 0;

async function fetchNews() {
    const response = await fetch(`/news?limit=${limit}&offset=${offset}`);
    const newsList = await response.json();
    renderNewsList(newsList);
}

async function searchNews(event) {
    event.preventDefault();

    const title = document.getElementById('search-title').value.trim();
    if (!title) {
        fetchNews();
        return;
    }

    try {
        const response = await fetch(`/news/search?title=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van resultaten.');
        }

        const newsList = await response.json();
        renderNewsList(newsList);
    } catch (error) {
        console.error('Fout bij zoeken:', error);
        const newsContainer = document.getElementById('news');
        newsContainer.innerHTML = '<li>Er is een fout opgetreden bij het zoeken.</li>';
    }
}

function renderNewsList(newsList) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '';

    if (newsList.length === 0) {
        newsContainer.innerHTML = '<li>Geen resultaten gevonden.</li>';
        return;
    }

    newsList.forEach(news => {
        const li = document.createElement('li');
        li.textContent = `${news.title}: ${news.content}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijderen';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteNews(news.id));

        const editButton = document.createElement('button');
        editButton.textContent = 'Bewerken';
        editButton.style.marginLeft = '10px';
        editButton.addEventListener('click', () => {
            window.location.href = `/edit-news.html?id=${news.id}`;
        });

        li.appendChild(deleteButton);
        li.appendChild(editButton);
        newsContainer.appendChild(li);
    });

    document.getElementById('previous').disabled = offset === 0;
    document.getElementById('next').disabled = newsList.length < limit;
}

async function addNews(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image_url = document.getElementById('image_url').value.trim();

    if (!title || !content) {
        alert('Titel en inhoud zijn verplicht.');
        return;
    }

    if (title.length < 5) {
        alert('Titel moet minstens 5 karakters bevatten.');
        return;
    }

    if (content.length < 10) {
        alert('Inhoud moet minstens 10 karakters bevatten.');
        return;
    }

    if (image_url && !/^(https?:\/\/[^\s]+)$/.test(image_url)) {
        alert('Afbeeldings-URL is ongeldig.');
        return;
    }

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

async function deleteNews(id) {
    await fetch(`/news/${id}`, {
        method: 'DELETE',
    });

    fetchNews(); 
}

document.getElementById('next').addEventListener('click', () => {
    offset += limit;
    fetchNews();
});

document.getElementById('previous').addEventListener('click', () => {
    if (offset > 0) {
        offset -= limit;
        fetchNews();
    }
});

document.getElementById('news-form').addEventListener('submit', addNews);
document.getElementById('search-news-form').addEventListener('submit', searchNews);

fetchNews();
