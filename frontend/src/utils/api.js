export function fetchCategories() {
    return fetchUrl('/categories')
        .then((res) => res.json())
        .then(({ categories }) => categories)
}

export function fetchPosts() {
    return fetchUrl('/posts')
        .then((res) => res.json())
}

export function fetchComments(postId) {
    return fetchUrl('/posts/' + postId + '/comments')
        .then((res) => res.json())
}

export function createPost(post) {
    return fetchUrl('/posts', 'POST', post)
        .then((res) => res.json());
}

export function deletePost(postId) {
    return fetchUrl('/posts/' + postId, 'DELETE')
        .then((res) => res.json());
}

export function votePost(postId, vote) {
    return fetchUrl('/posts/' + postId, 'POST', { option: vote })
        .then((res) => res.json());
}

export function voteComment(commentId, vote) {
    return fetchUrl('/comments/' + commentId, 'POST', { option: vote })
        .then((res) => res.json());
}

function fetchUrl(url, method, body) {
    const apiUrl = 'http://localhost:3001';
    const options = {
        headers: { 'Authorization': 'whereas-candy-uruguay-monument-fairly-gogo' },
        method: 'GET'
    };

    if (method) options.method = method;

    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return fetch(
        apiUrl + url,
        options
    )
}