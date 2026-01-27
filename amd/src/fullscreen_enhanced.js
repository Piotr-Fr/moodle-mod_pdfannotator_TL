/**
 * Enhanced fullscreen for PDF Annotator - Trinity Lab
 * Piotr Fr 2025
 */

define(['jquery'], function($) {
    return {
        init: function() {
            console.log('TL Fullscreen Enhanced loaded');
            
            // Znajdź istniejący przycisk fullscreen lub stwórz nowy
            var $fullscreenBtn = $('#toggle_fullscreen, .fullscreen-button, [title*="fullscreen"]');
            
            if ($fullscreenBtn.length === 0) {
                // Jeśli nie ma przycisku, dodaj nowy
                var btnHtml = '<button id="tl-fullscreen-btn" class="btn btn-secondary" title="Pełny ekran (F11)">' +
                              '<i class="fa fa-expand"></i> Pełny ekran</button>';
                $('.pdfannotator-toolbar, .mod-pdfannotator-toolbar, #page-mod-pdfannotator-view .commands').first().append(btnHtml);
                $fullscreenBtn = $('#tl-fullscreen-btn');
            }
            
            var isFullscreen = false;
            var $pdfContainer = $('#annotationcontainer, .pdf-container, #pdfContainer').first();
            
            // Funkcja włączania fullscreen
            function enterFullscreen() {
                var elem = document.documentElement;
                
                // Użyj HTML5 Fullscreen API
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
                $('body').addClass('tl-pdf-fullscreen');
                $('#page-header, #page-footer, .breadcrumb, nav, .navbar, #block-region-side-pre, #block-region-side-post').hide();
                $('.commentscontainer, #commentscontainer, .rightcolumn').hide();
                
                // Rozciągnij PDF na cały ekran
                $pdfContainer.addClass('tl-fullscreen-active');
                
                // Dodaj przycisk zamykający
                if ($('#tl-exit-fullscreen').length === 0) {
                    var exitBtn = '<button id="tl-exit-fullscreen" title="Zamknij pełny ekran (ESC)">' +
                                  '<i class="fa fa-times"></i></button>';
                    $pdfContainer.append(exitBtn);
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
                
                // Przywróć widoczność elementów
                $('body').removeClass('tl-pdf-fullscreen');
                $('#page-header, #page-footer, .breadcrumb, nav, .navbar, #block-region-side-pre, #block-region-side-post').show();
                $('.commentscontainer, #commentscontainer, .rightcolumn').show();
                $pdfContainer.removeClass('tl-fullscreen-active');
                $('#tl-exit-fullscreen').remove();
                
                isFullscreen = false;
            }
            
            // Kliknięcie w przycisk fullscreen
            $(document).on('click', '#tl-fullscreen-btn, #toggle_fullscreen', function(e) {
                e.preventDefault();
                if (!isFullscreen) {
                    enterFullscreen();
                } else {
                    exitFullscreen();
                }
            });
            
            // Kliknięcie w przycisk X
            $(document).on('click', '#tl-exit-fullscreen', function(e) {
                e.preventDefault();
                exitFullscreen();
            });
            
            // Obsługa ESC
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape' && isFullscreen) {
                    exitFullscreen();
                }
            });
            
            // Wykryj wyjście z fullscreen (F11)
            $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function() {
                if (!document.fullscreenElement && !document.webkitFullscreenElement && 
                    !document.mozFullScreenElement && !document.msFullscreenElement) {
                    if (isFullscreen) {
                        exitFullscreen();
                    }
                }
            });
        }
    };
});
