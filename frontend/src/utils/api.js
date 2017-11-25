export function fetchCategories() {
    return fetchUrl('/categories')
        .then((res) => res.json())
        .then(({ categories }) => categories)
}

function fetchUrl(url) {
    const apiUrl = 'http://localhost:3001';

    return fetch(
        apiUrl + url,
        {
            headers: { 'Authorization': 'whereas-tact-uruguay-monument-fairly' }
        }
    )
}