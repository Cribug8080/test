
// 加载公共 HTML 片段
function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

(function addCss() {
    document.head.innerHTML += `
        <link rel="stylesheet" href="/test/index.css">
    `;
})()

// 在页面加载完成后调用
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/test/components/header.html').then(() => {
        document.getElementsByClassName(location.pathname)?.[0]?.classList.add('selected')
    });
    loadHTML('footer', '/test/components/footer.html');
});
