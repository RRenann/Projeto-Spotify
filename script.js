/*SCRIPT JS*/

const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm)) // Passa o termo de busca para a função
        .catch((error) => console.error('Erro na requisição:', error));
}

function displayResults(results, searchTerm) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove('hidden');

    // Limpa o conteúdo anterior
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    // Filtra os resultados manualmente (se a API não filtrar)
    const filteredResults = results.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredResults.length === 0) {
        gridContainer.innerHTML = '<p>Nenhum artista encontrado.</p>';
        return;
    }

    // Cria e adiciona elementos para cada artista encontrado
    filteredResults.forEach((artist) => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');

        const artistImage = document.createElement('img');
        artistImage.src = artist.urlImg;
        artistImage.alt = artist.name;
        artistImage.classList.add('artist-img');

        const playIcon = document.createElement('div');
        playIcon.classList.add('play');
        playIcon.innerHTML = '<span class="fa fa-solid fa-play"></span>';

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');

        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.innerText = artist.name;

        const artistCategory = document.createElement('span');
        artistCategory.classList.add('artist-categorie');
        artistCategory.innerText = 'Artista';

        // Monta a estrutura do card
        cardImg.appendChild(artistImage);
        cardImg.appendChild(playIcon);

        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);

        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);

        gridContainer.appendChild(artistCard);
    });
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});