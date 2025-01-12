async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const userList = document.getElementById('users');

    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');

        li.textContent = `${user.name} (${user.email})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijderen';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteUser(user.id));

        const editButton = document.createElement('button');
        editButton.textContent = 'Bewerken';
        editButton.style.marginLeft = '10px';
        editButton.addEventListener('click', () => {
            window.location.href = `/editUser.html?id=${user.id}`;
        });

        li.appendChild(deleteButton);
        li.appendChild(editButton); 
        userList.appendChild(li);
    });
}


async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    fetchUsers(); 
    document.getElementById('user-form').reset(); 
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, {
        method: 'DELETE'
    });

    fetchUsers(); 
}

document.getElementById('user-form').addEventListener('submit', addUser);

fetchUsers();
