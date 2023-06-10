const apiKey = 'b39e02fc14128e27cf68fde6eefe4379'; 

// Fetch the movie data
async function fetchMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
}

// Display the movie data on the webpage
function displayMovies(movies) {
  const moviesList = document.getElementById('movies-list');

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imageElement = document.createElement('img');
    imageElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieElement.appendChild(imageElement);

    const detailsElement = document.createElement('div');
    detailsElement.classList.add('movie-details');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('movie-title');
    titleElement.textContent = movie.title;
    detailsElement.appendChild(titleElement);

    const releaseDateElement = document.createElement('p');
    releaseDateElement.classList.add('movie-release-date');
    releaseDateElement.textContent = `Release Date: ${movie.release_date}`;
    detailsElement.appendChild(releaseDateElement);

    const ratingElement = document.createElement('span');
    ratingElement.classList.add('movie-rating');
    ratingElement.textContent = movie.vote_average;
    detailsElement.appendChild(ratingElement);

    // const overviewElement = document.createElement('p');
    // overviewElement.classList.add('movie-overview');
    // overviewElement.textContent = movie.overview;
    // detailsElement.appendChild(overviewElement);

    movieElement.appendChild(detailsElement);
    moviesList.appendChild(movieElement);

    // Event listener for displaying movie details on click
    movieElement.addEventListener('click', () => {
        openMovieDetailsModal(movie.id);
    });
  });
}


// Open movie details modal
function openMovieDetailsModal(movieId) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const movieRecommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`;
  
    fetch(movieDetailsUrl)
      .then((response) => response.json())
      .then((data) => {
        modalTitleElement.textContent = data.title;
        modalOverviewElement.textContent = data.overview;
        modalReleaseDateElement.textContent = `Release Date: ${data.release_date}`;
        modalRuntimeElement.textContent = `Runtime: ${data.runtime} minutes`;
        modalGenresElement.textContent = `Genres: ${data.genres.map((genre) => genre.name).join(', ')}`;
  
        // Fetch and display movie recommendations
        fetch(movieRecommendationsUrl)
          .then((response) => response.json())
          .then((recommendations) => {
            displayMovieRecommendations(recommendations.results);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  
    movieDetailsModal.style.display = 'block';
  }
  
  // Close movie details modal
  function closeMovieDetailsModal() {
    movieDetailsModal.style.display = 'none';
    movieRecommendations.innerHTML = '';
  }
  
  // Event listener for closing the movie details modal
  document.getElementById('closeModal').addEventListener('click', closeMovieDetailsModal);



// Fetch and display the movies
fetchMovies()
  .then(movies => displayMovies(movies))
  .catch(error => console.log(error));