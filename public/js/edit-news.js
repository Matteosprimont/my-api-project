const newsId = new URLSearchParams(window.location.search).get('id');

async function fetchNews() {
    const response = await fetch(`/news/${newsId}`);
    const news = await response.json();

    document.getElementById('news-id').value = news.id;
    document.getElementById('title').value = news.title;
    document.getElementById('content').value = news.content;
    document.getElementById('image_url').value = news.image_url || '';
}

async function editNews(event) {
    event.preventDefault();

    const id = document.getElementById('news-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image_url = document.getElementById('image_url').value;

    await fetch(`/news/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image_url }),
    });

    window.location.href = '/news.html';
}

document.getElementById('edit-news-form').addEventListener('submit', function (event) {
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

    editNews(event);
});


fetchNews();
