const inputField = document.getElementById('search')
const results = document.getElementById('results')

const goWiki = (word) => {
  fetch("https://cors-anywhere.herokuapp.com/" + `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cdescription%7Ciwlinks&iwurl=1&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=300&pilimit=10&wbptterms=description&gpssearch=${word}&gpslimit=10`)
    .then(response => response.json())
    .then(data => data.query ? insertData(data.query.pages) : console.log('...'))
    // .then(data => console.log(data))
}

const search = () => {
  const word = inputField.value
  goWiki(word)
}

inputField.addEventListener('input', (event) => {
  results.innerHTML = ''
  search();
})

//////// INSERT DATA FUNCTION //////////

const insertData = (data) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].thumbnail) {
      const result = `
  <div class="column is-one-quarter">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${data[i].thumbnail.source}" alt="Placeholder image">
        </figure>
      </div>

      <div class="card-content">
        <div class="media">

          <div class="media-content">
            <p class="title is-4">${data[i].title ? data[i].title : '...'}</p>
          </div>
        </div>

        <div class="content">
          ${data[i].terms ? data[i].terms.description[0] : '...'}
          <a href="${data[i].title ? 'https://fr.wikipedia.org/wiki/' + data[i].title.replace(/\s/, '_') : '#'}">Go Wiki</a>
          <br>
        </div>
      </div>
    </div>
  </div>`;
      results.insertAdjacentHTML('beforeend', result)
    }
  }
};
