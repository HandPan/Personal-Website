// $('document').ready(function () {
//     $('.icon').click(function () {
//         $('nav ul').toggleClass('show');
//     });
// });

// $(document).ready(function () {
//     $('.banner h1').click(function () {
//         $('.dev-texts').slideDown({
//             // console.log("Clicked"),
//             // down: '150px'
//             // opacity: '0'
//         }, 'slow');
//     });
// });

// let i = 0;

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

$(document).ready(function () {
        const l = $('.dev-texts p');
        // console.log(l.length);
        rotatingSkills(0, l.length);
        // infoBoxSlider(curViewNumber);
        setUpTitleBars();
        arrowControls();
        navController();
});

function rotatingSkills(i, l) {
    // console.log(i);
    // isTabletWidth();
    // console.log(textWidth);

    // $('#banner-bar').animate({width: $('#dev-text' + i).width() + 50}, 'slow', function(){

    //     $('#dev-text' + i).slideDown(2000, function(){
    
            
    //         $('#dev-text' + i).slideUp(2000, function(){
    //             rotatingSkills((i+1) % l, l);
    
    //         })
    //         // .delay(2000);
    //     })
    //     // .delay(2000);
    // });
    if (isTabletWidth()) {
        $('#banner-bar').height('3px').width('100%');
        $('#dev-text' + i).slideDown(1000)
        .delay(2000)
        .slideUp(1000, function(){
            $('#banner-bar').height('6px');
            rotatingSkills((i+1) % l, l);
        })
    }

    if (!isTabletWidth()) {
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
    // $('.inverted-banner').css('min-height', value);

    // $(".title-bar").width($("#view0").width()).css("border-radius", "10px");
    // $(".content").height(($("#title-bar0").height() + 45));
    // $('.content').css("min-height", ($("#title-bar0").height() + 45) + 'px');
    // console.log(($("#title-bar0").height() + 200) + 'px');
    // $('#content').css(height, (($("#title-bar0").height())));
    // $("#section2").css("position", "relative");
    // $('#section2').addClass('active-section');
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
                $('#title-bar' + viewNum).css({
                    "border-bottom": "3px solid black",
                    // "border-radius": ""
                });
            });
        }
    });
}

function infoBoxSlider(viewNum, callback) {
    // Check for extraneous values that don't exist
    if (Math.abs(viewNum) > 3) {
        return;
    }
        
    // console.log('#view' + viewNum); // Debug
    // const shift = (-1 * 100) + '%';
    // console.log($('#section1').css("left"));
    // console.log("calc(" + $('#section1').css('left') + " + " + shift + ")");
    // $('#section1').css("left", "calc(" + $('#section1').css('left') + " + " + shift + ")");
    
    // console.log(`calc(${$('#section1').css('left')} + ${shift})`);
    // $('#section1').css("left", `calc(${$('#section1').css('left')} + ${shift})`);
    // console.log($('#section1').css("left"));
    

    // Close view
    if (isSliderOpen) {
        if (viewNum === 0 && !isTabletWidth()) {
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

        if (viewNum != 0 || isTabletWidth()) {
            $('#view' + viewNum).slideUp(1000, function() {
                $('#title-bar' + viewNum).css({
                    "border-bottom": "3px solid black",
                    // "border-radius": ""
                });
                if (callback != null) {
                    callback();
                }
            });
        }

        isSliderOpen = false;

    }
    
    // Open view
    else if (!isSliderOpen) {
        $('#title-bar' + viewNum).css({
            "border-bottom": "",
            // "border-radius": "10px"
        });
        
        if (viewNum === 0 && !isTabletWidth()) {
            $('#view' + viewNum).slideDown(1000, function() {
                $('#absimage').slideDown(500);
                if (callback != null) {
                    callback();
                }
            });
        }
        
        if (viewNum != 0 || isTabletWidth()) {
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
    
    console.log('curViewIndex: ' + curViewIndex);
    curViewIndex -= moveVal;
    console.log('curViewIndex: ' + curViewIndex);
    console.log('Current: ' + curViewNumber + ' Target: ' + targetViewNum);
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
    
    // Close view
    // if (isSliderOpen) {
    //     infoBoxSlider(curViewNumber, function() {
            
    //     });
    // }

    for (let i = 0; i < posData.length; i++) {
        posData[i] += (moveVal * 100);
        console.log('PosData[' + i +']: ' + posData[i]);
    }

    views.forEach(viewNum => {

        console.log((Math.ceil(views.length/2))-1);

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
            console.log("Left");
            // const testMargin = '-100%';
            // $('#section0').animate({left: '-100%', marginLeft: testMargin, marginRight: '0'}, 1000);
            // $('#section1').animate({left: '0', marginRight: '0', marginLeft: '0'}, 1000);
            // curViewNumber = 1;
            
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
            console.log("Right");
            inMotion = true;
            // $('#section1').animate({left: '100%', marginLeft: '0',marginRight: '-100%'}, 1000);
            // $('#section0').animate({left: '0', marginRight: '0' ,marginLeft: '0'}, 1000);
            // curViewNumber = 0;
            
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
        // do something...
        // console.log("Activated!");
        
        // let activeElement = $('.nav-link.active');
        // console.log(activeElement.id);
        // console.log(activeElement);

        // Active scrolling change functionality
        //  - Kind of buggy though will be revisited at a later time/

        // let activeHome = $('#link.nav-link.active');
        // console.log(activeHome.length);
        // if (activeHome.length) {
        //     $('#link').addClass('active-link');
        //     $('#link' + curViewNumber).removeClass('active-link');
        // } else {
        //     $('#link').removeClass('active-link');
        //     $('#link' + curViewNumber).addClass('active-link');
        // }

        
    });

    console.log("NavController");
    $('#link').click(function (e) { 
        e.preventDefault();
        
        $('#link' + curViewNumber).removeClass('active-link');
        $($(this)).addClass('active-link');
        $('html, body').animate({
            scrollTop: $('#home').offset().top
        }, 1);
    });

    views.forEach(viewNum => {
        console.log("#link" + viewNum);
        $('#link' + viewNum).click(function (e) {
            // console.log("button");
            
            $('#link').removeClass('active-link');
            $('#link' + curViewNumber).removeClass('active-link');
            $($(this)).addClass('active-link');
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