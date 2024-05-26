const scriptURL = 'https://script.google.com/macros/s/AKfycbwS_3GFUPaCjrbfGsNb2ebfaU1lXE0XTun8RG5BSTd4MvkJ5ly3_geqTNxO8s5tXCOl/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})