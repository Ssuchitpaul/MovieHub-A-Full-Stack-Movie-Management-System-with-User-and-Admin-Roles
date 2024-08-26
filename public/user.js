
// Retrieve email from localStorage
const email = localStorage.getItem('email');

if (email) {
    fetch(`http://localhost:8080/find/${email}`)
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array and you need the first element
            const user = data[0];

            // Store userId and username in localStorage
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);

            // Display the user information
            document.getElementById('user-info').innerText = `Logged in as: ${user.username}`;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById('user-info').innerText = 'Error fetching user data';
        });
} else {
    document.getElementById('user-info').innerText = 'No user logged in';
}

// Initialize variables
let userid = localStorage.getItem('userId');
let username = localStorage.getItem('username');
console.log(userid, username);

// You can access `userid` and `username` here or in other functions
function someOtherFunction() {
    console.log(`User ID: ${userid}`);
    console.log(`Username: ${username}`);
}

document.getElementById('favmov').addEventListener('click', () => {
    const favDiv = document.getElementById('f');

    if (favDiv.style.display === 'none' || favDiv.style.display === '') {
        favDiv.style.display = 'block'; // Show the div
    } else {
        favDiv.style.display = 'none'; // Hide the div
    }
});

document.getElementById('addMovieButton').addEventListener('click', () => {
    const favDiv = document.getElementById('movieFormContainer');
    editingId = null;
    if (favDiv.style.display === 'none' || favDiv.style.display === '') {
        document.getElementById('movieForm').reset();
        favDiv.style.display = 'block'; // Show the div
    } else {
        favDiv.style.display = 'none'; // Hide the div
    }
});

let editingId = null;

// Fetch movies data from the server and populate the UI
fetch('http://localhost:8080/movies')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('con');
        data.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('card');
            let userid = localStorage.getItem('userId');
            movieItem.innerHTML = `
                <img src="${movie.poster_image}" alt="${movie.title} Poster" style="max-width: 100%; height: auto; border-radius: 8px;">
                <h2>ID: ${movie.id}</h2>
                <h2>Title: ${movie.title}</h2>
                <h2>Director: ${movie.director}</h2>
                <h2>Genre: ${movie.genre}</h2>
                <h2>Release Year: ${movie.release_year}</h2>
                <h2>Duration: ${movie.duration_minutes} mins</h2>
                <h2>Rating: ${movie.rating}</h2>
                <h2>Box Office: $${movie.box_office_total}</h2>
                ${userid ? `<button onclick="addtofav(${userid}, ${movie.id}, '${movie.title}')">Add To Fav</button>` : ''}
                 ${userid ? `<button onclick="requestmovie(${userid}, ${movie.id}, '${movie.title}')">request</button>` : ''}

            `;
            container.appendChild(movieItem);
        });
    })
    .catch(error => {
        console.error('Error fetching movies:', error);
    });

// Handle form submission for both adding and editing
document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const movieData = {
        id: document.getElementById('id').value,
        title: document.getElementById('title').value,
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        release_year: parseInt(document.getElementById('release_year').value),
        duration_minutes: parseInt(document.getElementById('duration_minutes').value),
        rating: parseFloat(document.getElementById('rating').value),
        poster_image: document.getElementById('poster_image').value,
        box_office_total: parseFloat(document.getElementById('box_office_total').value)
    };

    const url = editingId ? `http://localhost:8080/movies/${editingId}` : 'http://localhost:8080/movies';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Reload the page to reflect changes
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to handle editing a movie
function editMovie(id) {
    editingId = id;

    // Fetch the specific movie data and populate the form
    fetch(`http://localhost:8080/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('id').value = movie.id;
            document.getElementById('title').value = movie.title;
            document.getElementById('director').value = movie.director;
            document.getElementById('genre').value = movie.genre;
            document.getElementById('release_year').value = movie.release_year;
            document.getElementById('duration_minutes').value = movie.duration_minutes;
            document.getElementById('rating').value = movie.rating;
            document.getElementById('poster_image').value = movie.poster_image;
            document.getElementById('box_office_total').value = movie.box_office_total;

            // Show the form
            document.getElementById('movieFormContainer').style.display = 'block';
        })
        .catch(error => console.error('Error fetching movie data:', error));
}

function deleteMovie(id) {
    const confirmation = confirm("Are you sure you want to delete this movie?");
    if (confirmation) {
        fetch(`http://localhost:8080/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Movie deleted successfully.");
                location.reload(); // Reload the page to reflect the changes
            } else {
                alert("Failed to delete the movie.");
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function addtofav(userid, mid, m) {
    // Create the favoriteMovie object
    const favoriteMovie = {
        userid: userid,
        movieid: mid,
        movie: m
    };

    // Send the request to add the movie to favorites
    fetch('http://localhost:8080/movies/fav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favoriteMovie),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add to favorites');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred while adding the movie to favorites. Please try again.');
    });
}

fetch(`http://localhost:8080/fav/${userid}`)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('f');
        container.innerHTML = ''; // Clear the container before adding new items
        data.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('card');
            movieItem.innerHTML = `
                <h2>${movie.movie}</h2>
            `;
            container.appendChild(movieItem);
        });
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred while fetching favorite movies.');
    });

function deleteFavoriteMovie(id) {
    fetch(`http://localhost:8080/fav/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete favorite movie.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Reload the page to reflect changes
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred while deleting the movie from favorites. Please try again.');
    });
}

let existingMovieIds = [];

// Fetch existing movie IDs when the page loads
fetch('http://localhost:8080/movies')
    .then(response => response.json())
    .then(data => {
        existingMovieIds = data.map(movie => movie.id);
    })
    .catch(error => {
        console.error('Error fetching existing movie IDs:', error);
    });

// Add real-time validation for ID input
document.getElementById('id').addEventListener('input', function() {
    clearError('id-error'); // Clear previous error messages for the ID field

    const id = parseInt(this.value);

    // Check if the ID already exists and show an error message
    if (existingMovieIds.includes(id)) {
        displayError('id-error', 'ID already exists. Please choose a different ID.');
    }
});

// Handle form submission with validation
document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear any previous error messages
    clearErrors();

    // Validate form inputs, including duplicate ID check
    if (!validateForm()) {
        return;
    }

    const movieData = {
        id: parseInt(document.getElementById('id').value),
        title: document.getElementById('title').value,
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        release_year: parseInt(document.getElementById('release_year').value),
        duration_minutes: parseInt(document.getElementById('duration_minutes').value),
        rating: parseFloat(document.getElementById('rating').value),
        poster_image: document.getElementById('poster_image').value,
        box_office_total: parseFloat(document.getElementById('box_office_total').value)
    };

    const url = editingId ? `http://localhost:8080/movies/${editingId}` : 'http://localhost:8080/movies';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Reload the page to reflect changes
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to validate the form, including duplicate ID check
function validateForm() {
    let isValid = true;

    const id = parseInt(document.getElementById('id').value);
    
    // Check if the ID is a duplicate
    if (!editingId && existingMovieIds.includes(id)) {
        displayError('id-error', 'ID already exists. Please choose a different ID.');
        isValid = false;
    }

    // Other validation logic (same as before)
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const genre = document.getElementById('genre').value;
    const releaseYear = parseInt(document.getElementById('release_year').value);
    const duration = parseInt(document.getElementById('duration_minutes').value);
    const rating = parseFloat(document.getElementById('rating').value);
    const poster = document.getElementById('poster_image').value;
    const boxOffice = parseFloat(document.getElementById('box_office_total').value);

    if (!title) {
        displayError('title-error', 'Title is required');
        isValid = false;
    }

    if (!director) {
        displayError('director-error', 'Director is required');
        isValid = false;
    }

    if (!genre) {
        displayError('genre-error', 'Genre is required');
        isValid = false;
    }

    if (!releaseYear || releaseYear < 1888 || releaseYear > 2024) {
        displayError('release_year-error', 'Release year must be between 1888 and 2024');
        isValid = false;
    }

    if (!duration || duration <= 0) {
        displayError('duration_minutes-error', 'Duration must be a positive number');
        isValid = false;
    }

    if (!rating || rating < 0 || rating > 10) {
        displayError('rating-error', 'Rating must be between 0 and 10');
        isValid = false;
    }

    if (!poster) {
        displayError('poster_image-error', 'Poster image URL is required');
        isValid = false;
    }

    if (!boxOffice || boxOffice < 0) {
        displayError('box_office_total-error', 'Box office total must be a positive number');
        isValid = false;
    }

    return isValid;
}

// Function to display error messages
function displayError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = elementId;
        errorElement.className = 'error-message';
        const inputElement = document.getElementById(elementId.replace('-error', ''));
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
    errorElement.textContent = message;
}

// Function to clear a specific error message
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.remove();
    }
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((error) => {
        error.remove();
    });
}

function requestmovie(userid, mid, m)
{
            // Sample data to be sent in the POST request
        const requestData = {
            userid: userid,           // User ID
            movieid: mid,        // Movie ID
            movie: m,  // Movie Name
            status: "Pending"    // Status of the request
        };
        
        // Send POST request to the API
        fetch('http://localhost:8080/req', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)  // Convert JavaScript object to JSON string
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to submit request.');
            }
            return response.json();  // Parse JSON response
        })
        .then(data => {
            console.log('Success:', data);  // Log success response
            alert('Request submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error.message);  // Log error
            alert('An error occurred while submitting the request.');
        });
  
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the user ID from local storage or elsewhere
    const userId = localStorage.getItem('userId');

    if (userId) {
        fetch(`http://localhost:8080/req/${userId}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#approved-movies-table tbody');
                tableBody.innerHTML = ''; // Clear any existing rows

                data.forEach(movie => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${movie.userid}</td>
                        <td>${movie.movieid}</td>
                        <td>${movie.status}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching approved movies:', error);
            });
    } else {
        console.error('User ID not found in local storage');
    }
});

document.getElementById('out').addEventListener('click',()=>
    {
        window.location.href = 'index.html';

    });

