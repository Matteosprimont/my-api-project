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

document.getElementById('edit-news-form').addEventListener('submit', editNews);

fetchNews();
