
async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const userList = document.getElementById('users');

    userList.innerHTML = ''; 
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}

async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert('Gebruiker toegevoegd!');
        fetchUsers(); 
    } else {
        alert('Er is een fout opgetreden bij het toevoegen.');
    }

    document.getElementById('user-form').reset(); 
}

document.getElementById('user-form').addEventListener('submit', addUser);


fetchUsers();
