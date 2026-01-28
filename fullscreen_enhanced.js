/**
 * Enhanced Fullscreen for PDF Annotator - Trinity Lab
 * Simplified version without AMD compilation
 * @author Piotr Fr 2025
 */

(function() {
    'use strict';
    
    console.log('TL Fullscreen Enhanced loaded (simple version)');
    
    // Czekamy aż DOM będzie gotowy
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFullscreen);
    } else {
        initFullscreen();
    }
    
    function initFullscreen() {
        var isFullscreen = false;
        var pdfContainer = document.querySelector('#annotationcontainer, .pdf-container, #pdfContainer');
        
        if (!pdfContainer) {
            console.log('PDF container not found');
            return;
        }
        
        // Znajdź lub stwórz przycisk fullscreen
        var fullscreenBtn = document.querySelector('#toggle_fullscreen, .fullscreen-button, [title*="fullscreen"]');
        
        if (!fullscreenBtn) {
            // Stwórz nowy przycisk
            var toolbar = document.querySelector('.pdfannotator-toolbar, .mod-pdfannotator-toolbar, #page-mod-pdfannotator-view .commands');
            if (toolbar) {
                fullscreenBtn = document.createElement('button');
                fullscreenBtn.id = 'tl-fullscreen-btn';
                fullscreenBtn.className = 'btn btn-secondary';
                fullscreenBtn.innerHTML = '<i class="fa fa-expand"></i> Pełny ekran';
                fullscreenBtn.title = 'Pełny ekran (ESC aby wyjść)';
                toolbar.appendChild(fullscreenBtn);
            } else {
                console.log('Toolbar not found');
                return;
            }
        }
        
        // Funkcja włączania fullscreen
        function enterFullscreen() {
            var elem = document.documentElement;
            
            // HTML5 Fullscreen API
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            
            // Ukryj wszystko poza PDF
            document.body.classList.add('tl-pdf-fullscreen');
            
            var elementsToHide = document.querySelectorAll('#page-header, #page-footer, .breadcrumb, nav, .navbar, #block-region-side-pre, #block-region-side-post, .commentscontainer, #commentscontainer, .rightcolumn');
            elementsToHide.forEach(function(el) {
                el.style.display = 'none';
            });
            
            // Rozciągnij PDF
            pdfContainer.classList.add('tl-fullscreen-active');
            
            // Dodaj przycisk zamykający
            if (!document.getElementById('tl-exit-fullscreen')) {
                var exitBtn = document.createElement('button');
                exitBtn.id = 'tl-exit-fullscreen';
                exitBtn.innerHTML = '<i class="fa fa-times"></i>';
                exitBtn.title = 'Zamknij pełny ekran (ESC)';
                exitBtn.onclick = exitFullscreen;
                pdfContainer.appendChild(exitBtn);
            }
            
            isFullscreen = true;
        }
        
        // Funkcja wyłączania fullscreen
        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            // Przywróć widoczność
            document.body.classList.remove('tl-pdf-fullscreen');
            
            var elementsToShow = document.querySelectorAll('#page-header, #page-footer, .breadcrumb, nav, .navbar, #block-region-side-pre, #block-region-side-post, .commentscontainer, #commentscontainer, .rightcolumn');
            elementsToShow.forEach(function(el) {
                el.style.display = '';
            });
            
            pdfContainer.classList.remove('tl-fullscreen-active');
            
            var exitBtn = document.getElementById('tl-exit-fullscreen');
            if (exitBtn) {
                exitBtn.remove();
            }
            
            isFullscreen = false;
        }
        
        // Kliknięcie w przycisk fullscreen
        fullscreenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isFullscreen) {
                enterFullscreen();
            } else {
                exitFullscreen();
            }
        });
        
        // Obsługa ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isFullscreen) {
                exitFullscreen();
            }
        });
        
        // Wykryj wyjście z fullscreen (F11)
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && 
                !document.mozFullScreenElement && !document.msFullscreenElement) {
                if (isFullscreen) {
                    exitFullscreen();
                }
            }
        }
    }
})();
```

5. **Przewiń na dół strony**

6. **W polu "Commit message"** wpisz:
```
   Add simplified fullscreen JavaScript (no compilation needed)
