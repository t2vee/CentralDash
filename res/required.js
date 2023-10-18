document.addEventListener("DOMContentLoaded", function() {
    const icons = document.querySelectorAll(".icon");
    const iframe = document.querySelector(".content-frame");
    const spinner = document.querySelector(".spinner");
    const loadingBar = document.querySelector(".loading-bar");

    icons.forEach(icon => {
        icon.addEventListener("click", function() {
            const serviceUrl = this.getAttribute("data-url");

            // Show spinner and start loading bar
            spinner.style.display = 'block';
            spinner.style.opacity = '1';  // Ensure it's fully visible
            loadingBar.style.display = 'block';
            loadingBar.style.opacity = '1';  // Ensure it's fully visible

            iframe.onload = function() {
                // Introduce a delay before hiding the spinner
                setTimeout(() => {
                    spinner.style.opacity = '0';
                    loadingBar.style.opacity = '0';

                    // After the fade-out effect, hide them from display
                    setTimeout(() => {
                        spinner.style.display = 'none';
                        loadingBar.style.display = 'none';
                    }, 500);  // Match the transition duration from the CSS
                }, 1000);  // 1-second delay for spinner
            };

            iframe.src = serviceUrl;
            simulateLoadingBar();
        });
    });

    function simulateLoadingBar() {
        let width = 0;
        let interval = setInterval(function() {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width += 5;
            loadingBar.style.width = width + '%';
        }, 300);
    }
});

document.getElementById('editorBtn').addEventListener('click', function() {
    document.getElementById('editorPopup').style.display = 'block';
    openTab(null, 'Icons'); // default tab content
});

function openTab(evt, tabName) {
    const iframe = document.querySelector('.editor-frame');

    if (tabName === 'Icons') {
        iframe.src = "/Editor/Icons.html";  // Set this to your FastAPI route
    } else if (tabName === 'Nginx') {
        iframe.src = "/Editor/Nginx.html";  // Set this to your FastAPI route
    }

    if (evt) {
        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
    }
}

window.onclick = function(event) {
    const popup = document.getElementById('editorPopup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};
