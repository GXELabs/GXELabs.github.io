document.addEventListener('DOMContentLoaded', function() {
    fetch('/articles')
        .then(response => response.json())
        .then(articles => {
            const articlesDiv = document.getElementById('articles');
            articles.forEach((article, index) => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <img src="${article.image}" alt="${article.title}">
                    <a href="${article.file}" download>Download File</a>
                    ${window.location.pathname === '/admin' ? `<button onclick="editArticle(${index})">Edit</button>` : ''}
                `;
                articlesDiv.appendChild(articleElement);
            });
        });
});

function editArticle(index) {
    const article = articles[index];
    document.querySelector('input[name="title"]').value = article.title;
    document.querySelector('textarea[name="description"]').value = article.description;
    document.querySelector('form').action = `/admin/edit/${index}`;
}
