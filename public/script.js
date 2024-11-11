// public/script.js
async function convert() {
    const url = document.getElementById('url').value;
    const formatType = document.getElementById('format').value;
    const status = document.getElementById('status');

    if (!url) {
        status.innerText = "Please enter a valid YouTube URL.";
        return;
    }

    status.innerText = "Processing...";

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, formatType }),
        });

        const data = await response.json();
        if (response.ok) {
            status.innerText = data.message;
        } else {
            status.innerText = `Error: ${data.error}`;
        }
    } catch (error) {
        status.innerText = "An error occurred. Please try again.";
    }
}
