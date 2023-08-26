
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, email, password })
    });

    
    const data = await response.json();
    if (data.success) {
        window.location.href = '/login.html';
    } else {
        console.log(data.error);
    }
});


document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value;

   
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid, password })
    });

    
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/dashboard.html';
    } else {
        
        console.log(data.error);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        fetch('/api/getUserName', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                usernameElement.innerText = data.username;
            } else {
                
                localStorage.removeItem('accessToken');
                window.location.href = '/login.html';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            
        });
    }
        else {
       
        window.location.href = '/login.html';
    }
});
