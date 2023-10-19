    const editorModeCheckbox = document.getElementById('editorMode');
    if (editorModeCheckbox) {
        editorModeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                var ele = document.getElementsByClassName('icon');
                    for (var i = 0; i < ele.length; i++ ) {
                        ele[i].style.pointerEvents = "none";
                    }
                var ele = document.getElementsByClassName('icon-actions');
                    for (var i = 0; i < ele.length; i++ ) {
                        ele[i].style.pointerEvents = "auto";
                    }
                var ele = document.getElementsByClassName('icon-actions');
                    for (var i = 0; i < ele.length; i++ ) {
                        ele[i].style.display = "inline-flex";
                    }
                document.getElementById('add-service').style.pointerEvents = "auto";
                document.getElementById('add-service').style.display = "block";
            } else {
                location.reload()
            }
        });
    }

    document.getElementById('editorBtn').addEventListener('click', function() {
        document.getElementById('editorPopup').style.display = 'block';
        openTab(null, 'Icons');
    });

    function openTab(evt, tabName) {
        const iframe = document.querySelector('.editor-frame');

        if (tabName === 'Icons') {
            iframe.src = "/Editor/Icons.html";
        } else if (tabName === 'Nginx') {
            iframe.src = "/Editor/Nginx.html";
        } else if (tabName === 'Edit') {
            iframe.src = "/Editor/Icons.Edit.html";
        }



        if (evt) {
            const tablinks = document.getElementsByClassName("tablinks");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            evt.currentTarget.className += " active";
        }
    }
