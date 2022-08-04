function renderResponse(response) {
  // busca elemento na lista HMTL
  const list = document.getElementById("films-list");
  list.innerHTML = "";
  response.forEach((film) => {
    // faz interação no array dos filmes
    // percorrendo cada elemento

    //cria as div's dos filmes
    const filmCard = document.createElement("div");
    // introduz a imagem no filmCard
    filmCard.style.backgroundImage = `url(${film.image_url})`;
    // estiliza o filmCard
    filmCard.className = "film-card";
    filmCard.onclick = function () {
      // função ao clicar no filmCard

      // Busca o modal no HMTL
      const modal = document.getElementById("modal");
      // deixa visible
      modal.style.visibility = "visible";

      // busca o modal-content no HMTL
      const modalContent = document.getElementById("modal-content");
      // limpa o conteúdo do modal
      modalContent.innerHTML = "";

      // incrementa o title no modal
      const filmTitle = document.createTextNode(film.title);

      // Pega as propriedades do H1
      const filmTitleElement = document.createElement("h1");
      // Adiciona no filmTitle o conteudo do filmTitleElement
      filmTitleElement.appendChild(filmTitle);
      // adicona no modal o filmTitleElement com filho (modal-content)
      modalContent.appendChild(filmTitleElement);

      const filmSubTitle = document.createTextNode(film.subtitle);
      const filmeSubTitleElement = document.createElement("h3");
      filmeSubTitleElement.appendChild(filmSubTitle);
      modalContent.appendChild(filmeSubTitleElement);

      const filmDescription = document.createTextNode(film.description);
      const filmDescritptionElement = document.createElement("p");
      filmDescritptionElement.appendChild(filmDescription);
      modalContent.appendChild(filmDescritptionElement);
    };
    list.appendChild(filmCard);
  });
}

window.onload = function () {
  // buscando os filmes
  fetch("https://sevencoders-starwars-wiki.herokuapp.com/films")
    .then(async (data) => {
      // transforma o resultado para Json
      const response = await data.json();
      renderResponse(response);
    })
    .catch((error) => {
      console.log(error);
      alert("Erro ao carregar os filmes");
    });
};

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function onSearch() {
  const searchValue = document.getElementById("search-input").value;
  searchValue.innerHTML = "";

  fetch(
    searchValue.length === 0
      ? "https://sevencoders-starwars-wiki.herokuapp.com/films"
      : `https://sevencoders-starwars-wiki.herokuapp.com/search?query=${searchValue}`
  )
    .then(async (data) => {
      const response = await data.json();
      //console.log({ response });
      renderResponse(response);
    })
    .catch((error) => {
      console.log(error);
      alert("Erro na pesquisa");
    });
}
