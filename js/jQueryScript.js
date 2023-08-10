
// Globals
let isSliderOpen = true;
let curViewNumber = 0;
let curViewIndex = 1;
const views = [-1, 0, 1];
let posData = [-100, 0, 100];
let inMotion = false;

function isTabletWidth() {
    return $('#tablet-indicator').is(':visible');
}

function isMobileWidth() {
    return $('#mobile-indicator').is(':visible');
}

$(document).ready(function () {
        const l = $('.dev-texts p');
        rotatingSkills(0, l.length);
        setUpTitleBars();
        arrowControls();
        navController();
});

function rotatingSkills(i, l) {
    if (isMobileWidth()) {
        $('#banner-bar').height('1px').width('100%');
        $('#dev-text' + i).slideDown(1000)
        .delay(2000)
        .slideUp(1000, function(){
            $('#banner-bar').height('2px');
            rotatingSkills((i+1) % l, l);
        })
    }

    if (isTabletWidth() && !isMobileWidth()) {
        $('#banner-bar').height('3px').width('100%');
        $('#dev-text' + i).slideDown(1000)
        .delay(2000)
        .slideUp(1000, function(){
            $('#banner-bar').height('6px');
            rotatingSkills((i+1) % l, l);
        })
    }

    if (!isTabletWidth() && !isMobileWidth()) {
        $('#banner-bar').animate({width: $('#dev-text' + i).width()}, 'slow', function(){
            $('#banner-bar').height('3px');
            $('#dev-text' + i).slideDown(1000)
            .delay(2000)
            .slideUp(1000, function(){
                $('#banner-bar').height('6px');
                rotatingSkills((i+1) % l, l);
            })
            // .delay(2000);
        });
    }
}

$(document).ready(function () {
    $('#link').addClass('active-link');
    $('#left-arrow').attr('data-state', '');
    $('#right-arrow').attr('data-state', '');
});

function setUpTitleBars() {
    views.forEach(viewNum => {
        $('#title-bar' + viewNum).click(function (e) { 
            e.preventDefault();

            infoBoxSlider(viewNum, null);
        });
    });

    views.forEach(viewNum => {
        if (viewNum != 0) {
            $('#view' + viewNum).slideUp(1000, function() {

                if (!isMobileWidth()) {
                    $('#title-bar' + viewNum).css({
                        "border-bottom": "3px solid black",
                        // "border-radius": ""
                    });
                }
            });
        }
    });
}

function infoBoxSlider(viewNum, callback) {
    // Check for extraneous values that don't exist
    if (Math.abs(viewNum) > 3) {
        return;
    }
        
    // Close view
    if (isSliderOpen) {
        if (viewNum === 0 && !isTabletWidth() && !isMobileWidth()) {
            $('#absimage').slideUp(500, function() {
                $('#view' + viewNum).slideUp(1000, function() {
                    $('#title-bar' + viewNum).css({
                        "border-bottom": "3px solid black",
                        // "border-radius": ""
                    });
                    if (callback != null) {
                        callback();
                    }
                });
            });
        }

        if (viewNum != 0 || isTabletWidth() || isMobileWidth()) {
            $('#view' + viewNum).slideUp(1000, function() {
                if (!isMobileWidth()) {
                    $('#title-bar' + viewNum).css({
                        "border-bottom": "3px solid black",
                        // "border-radius": ""
                    });
                }
                if (callback != null) {
                    callback();
                }
            });
        }

        isSliderOpen = false;

    }
    
    // Open view
    else if (!isSliderOpen) {
        if (!isMobileWidth()) {
            $('#title-bar' + viewNum).css({
                "border-bottom": "",
                // "border-radius": "10px"
            });
        }
        
        if (viewNum === 0 && !isTabletWidth() && !isMobileWidth()) {
            $('#view' + viewNum).slideDown(1000, function() {
                $('#absimage').slideDown(500);
                if (callback != null) {
                    callback();
                }
            });
        }
        
        if (viewNum != 0 || isTabletWidth() || isMobileWidth()) {
            $('#view' + viewNum).slideDown(1000);
            if (callback != null) {
                callback();
            }
        }
        
        isSliderOpen = true;
    }
    
}

function slideController(moveVal, callback) {
    // Check for extraneous values that don't exist
    if (Math.abs(moveVal) > views.length) {
        return;
    }
    
    const targetViewNum = curViewNumber - moveVal;
    
    if (targetViewNum > views.length/2 || targetViewNum < views.length/2 * -1) {
        return;
    }


    $('#link').removeClass('active-link');
    $('#link' + curViewNumber).removeClass('active-link');
    $('#link' + targetViewNum).addClass('active-link');

    curViewIndex -= moveVal;
    if (curViewIndex === views.length-1) {
        $('#right-arrow').attr('data-state', 'disabled');
        $('#left-arrow').attr('data-state', '');
    } else if (curViewIndex === 0) {
        $('#left-arrow').attr('data-state', 'disabled');
        $('#right-arrow').attr('data-state', '');
    } else {
        $('#right-arrow').attr('data-state', '');
        $('#left-arrow').attr('data-state', '');
    }

    for (let i = 0; i < posData.length; i++) {
        posData[i] += (moveVal * 100);
    }

    views.forEach(viewNum => {

        $('#section' + viewNum).animate({
            left: posData[viewNum + 1] + '%'
        }, 1000, function() {
            if (viewNum === targetViewNum) {
                infoBoxSlider(viewNum);
            }
        });
        
    });

    curViewNumber = targetViewNum;
    callback();

}

function arrowControls() {
    $('#left-arrow').click(function (e) { 
        if ($('#left-arrow').attr('data-state') === 'disabled') {
            return;
        }
        if (!inMotion) {
            inMotion = true;
            
            if (isSliderOpen) {
                infoBoxSlider(curViewNumber, function() {
                    slideController(1, function() {
                        inMotion = false;
                    });
                });
            } else {
                slideController(1, function() {
                    inMotion = false;
                });
            }
        }

        e.preventDefault();
    });

    $('#right-arrow').click(function (e) {
        if ($('#right-arrow').attr('data-state') === 'disabled') {
            return;
        }
        if (!inMotion) {
            inMotion = true;
            
            if (isSliderOpen) {
                infoBoxSlider(curViewNumber, function() {
                    slideController(-1, function() {
                        inMotion = false;
                    });
                });
            } else {
                slideController(-1, function() {
                    inMotion = false;
                });
            }
        }
        
        e.preventDefault();
    });
}

function navController() {

    var firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
    firstScrollSpyEl.addEventListener('activate.bs.scrollspy', function () {
        
        // let activeElement = $('.nav-link.active');

        // Active scrolling change functionality
        //  - Kind of buggy though will be revisited at a later time/

        // let activeHome = $('#link.nav-link.active');
        // if (activeHome.length) {
        //     $('#link').addClass('active-link');
        //     $('#link' + curViewNumber).removeClass('active-link');
        // } else {
        //     $('#link').removeClass('active-link');
        //     $('#link' + curViewNumber).addClass('active-link');
        // }

        
    });

    $('#link').click(function (e) { 
        e.preventDefault();
        
        $('#link' + curViewNumber).removeClass('active-link');
        $($(this)).addClass('active-link');
        $('html, body').animate({
            scrollTop: $('#home').offset().top
        }, 1);
    });

    views.forEach(viewNum => {
        $('#link' + viewNum).click(function (e) {
            
            const targetDiv = $($(this).attr('href'));
            if (targetDiv.length) {
                $('html, body').animate({
                    scrollTop: targetDiv.offset().top
                }, 1, function() {
                    

                    if (!inMotion) {

                        if (curViewNumber != viewNum) {
        
                            inMotion = true;
        
                            if (isSliderOpen) {
                                infoBoxSlider(curViewNumber, function() {
                                    slideController(curViewNumber-viewNum, function() {
                                        inMotion = false;
                                    });
                                });
                            } else {
                                slideController(curViewNumber-viewNum, function() {
                                    inMotion = false;
                                });
                            }   
                        }
                    }
                });
            }

            e.preventDefault();
            
        });
    });
}