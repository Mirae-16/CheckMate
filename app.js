const apiKey = "AIzaSyCdyHJ5CyOm8tpFomfcFCxBhrQg2-tkgq0";
const searchEngineId = "a7586576c58e641f2";

function search(queryText) {
    const query = queryText || document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "🔄 Searching...";

    fetch(
    `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
    )
    .then(res => res.json())
    .then(data => {
    resultsDiv.innerHTML = "";
    if (!data.items || data.items.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    data.items.forEach(item => {
        const box = document.createElement("div");
        box.className = "link-box";
        box.innerHTML = `
        <a href="${item.link}" target="_blank">${item.title}</a>
        <p>${item.snippet}</p>
        `;
        resultsDiv.appendChild(box);
    });
    })
    .catch(err => {
    resultsDiv.innerHTML = "<p>Error getting results. Try again.</p>";
    console.error(err);
    });
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript;
    document.getElementById("searchInput").value = spokenText;
    search(spokenText);
    };

    recognition.onerror = function() {
    alert("Voice search not supported on this browser.");
    };
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function quickSearch(topic) {
    document.getElementById("searchInput").value = topic;
    search(topic);
}