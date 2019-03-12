const inputField = document.getElementById('search')
const results = document.getElementById('results')
const textResult = document.getElementById('text-result')

const goWiki = (word) => {
  fetch("https://cors-anywhere.herokuapp.com/" + `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cdescription%7Ciwlinks&iwurl=1&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=300&pilimit=10&wbptterms=description&gpssearch=${word}&gpslimit=20`)
    .then(response => response.json())
    .then(data => data.query ? insertData(data.query.pages) : console.log('...'))
    // .then(data => console.log(data))
}

const fetchContent = (word) => {
  fetch("https://cors-anywhere.herokuapp.com/" + `https://fr.wikipedia.org/w/api.php?action=parse&page=${word}&format=json`)
  .then(response => response.json())
  .then(data => insertText(data))
}

const search = () => {
  const word = inputField.value
  goWiki(word)
}

const selectBtns = () => {
  const btns = document.querySelectorAll('.see-btn')
  btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      fetchContent(`${event.target.outerHTML.split('data="')[1].split('"')[0].replace(/\s/, '_')}`)
    })
  })
}

inputField.addEventListener('change', (event) => {
  results.innerHTML = ''
  search();
})

//////// INSERT DATA FUNCTION //////////

const insertData = (data) => {
  textResult.innerHTML = ''
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
          <button data="${data[i].title}" class="see-btn button">See...</button>
        </div>
      </div>
    </div>
  </div>`;
      results.insertAdjacentHTML('beforeend', result)
    }
  }
  selectBtns();
};

const insertText = (data) => {
  // console.log(data.parse.wikitext['*'])
  results.innerHTML = ''
  textResult.innerHTML = data.parse.text['*']
}
