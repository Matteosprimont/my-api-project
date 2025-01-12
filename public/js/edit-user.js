const userId = new URLSearchParams(window.location.search).get('id');

async function fetchUser() {
    const response = await fetch(`/users/${userId}`);
    const user = await response.json();

    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
}

async function editUser(event) {
    event.preventDefault();

    const id = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    window.location.href = '/users.html';
}

document.getElementById('edit-user-form').addEventListener('submit', editUser);

fetchUser();
