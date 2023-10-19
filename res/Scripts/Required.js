    document.addEventListener("DOMContentLoaded", function() {
        const icons = document.querySelectorAll(".icon");
        const iframe = document.querySelector(".content-frame");
        const spinner = document.querySelector(".spinner");
        const loadingBar = document.querySelector(".loading-bar");

        icons.forEach(icon => {
            icon.addEventListener("click", function() {
                const serviceUrl = this.getAttribute("data-url");
                spinner.style.display = 'block';
                spinner.style.opacity = '1';
                loadingBar.style.display = 'block';
                loadingBar.style.opacity = '1';

                iframe.onload = function() {
                    setTimeout(() => {
                        spinner.style.opacity = '0';
                        loadingBar.style.opacity = '0';
                        setTimeout(() => {
                            spinner.style.display = 'none';
                            loadingBar.style.display = 'none';
                        }, 500);
                    }, 1000);
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
