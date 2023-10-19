    window.onclick = function(event) {
        const popup = document.getElementById('editorPopup');
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    };
    window.addEventListener('DOMContentLoaded', (event) => {
        const iframe = document.getElementById('content-frame');

        iframe.contentWindow.document.getElementById('iconForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const response = await fetch('/API/AddIcon', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.message === "Icon added successfully") {
                alert(result.message);
                setTimeout(() => {
                    location.reload();
                }, 500);
            } else {
                alert("Error adding icon.");
            }
        });
    });
    async function deleteService(service) {
        try {
            const response = await fetch(`/API/DeleteService?s=${service}`, {
                method: 'POST',
            });
            if (response.ok) {
                location.reload();
            } else {
                console.error('Failed to delete service:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
    }

}
function editService(iconUri) {
    const iconElement = document.querySelector(`.icon[data-url="${iconUri}"]`);
    if (!iconElement) return;
    const iconUrl = iconElement.getAttribute('data-icon-url');
    const name = iconElement.getAttribute('data-name');
    const url = iconElement.getAttribute('data-url');
    document.getElementById('editorPopup').style.display = 'block';
    openTab(null, 'Edit');
    const iframe = document.querySelector('.editor-frame');
    iframe.onload = function() {
        if (iframe.src.endsWith("/Editor/Icons.html")) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.getElementById('iconURL').value = iconUrl;
            iframeDoc.getElementById('serviceName').value = name;
            iframeDoc.getElementById('accessURI').value = url;
        }
    };
}