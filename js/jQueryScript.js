$('document').ready(function () {
    $('.icon').click(function () {
        $('nav ul').toggleClass('show');
    });
});

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
const views = [-1, 0, 1];

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
    $(".title-bar").width($("#view0").width()).css("border-radius", "10px")
    // $(".content").height(($("#title-bar0").height() + 45));
    // $('.content').css("min-height", ($("#title-bar0").height() + 45) + 'px');
    // console.log(($("#title-bar0").height() + 200) + 'px');
    // $('#content').css(height, (($("#title-bar0").height())));
    // $("#section2").css("position", "relative");
    // $('#section2').addClass('active-section');

});

function setUpTitleBars() {
    views.forEach(viewNum => {
        $('#title-bar' + viewNum).click(function (e) { 
            e.preventDefault();

            infoBoxSlider(viewNum, null);
        });
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
        if (viewNum === 0) {
            $('#absimage').slideUp(1000, function() {
                $('#view' + viewNum).slideUp(1000, function() {
                    $('#title-bar' + viewNum).css({
                        "border-bottom": "3px solid black",
                        "border-radius": ""
                    });
                    if (callback != null) {
                        callback();
                    }
                });
            });
        }

        if (viewNum != 0) {
            $('#view' + viewNum).slideUp(1000, function() {
                $('#title-bar' + viewNum).css({
                    "border-bottom": "3px solid black",
                    "border-radius": ""
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
            "border-radius": "10px"
        });
        
        if (viewNum === 0) {
            $('#view' + viewNum).slideDown(1000, function() {
                $('#absimage').slideDown(1000);
                if (callback != null) {
                    callback();
                }
            });
        }
        
        if (viewNum != 0) {
            $('#view' + viewNum).slideDown(1000);
            if (callback != null) {
                callback();
            }
        }
        
        isSliderOpen = true;
    }
    
}

function slideController(moveVal) {
    // Check for extraneous values that don't exist
    if (Math.abs(moveVal) > 5) {
        return;
    }

    // Close view
    // if (isSliderOpen) {
    //     infoBoxSlider(curViewNumber, function() {
            
    //     });
    // }

    const targetViewNum = curViewNumber + moveVal;
    const shift = (moveVal * -100) + '%';
    console.log('Current: ' + curViewNumber + ' Target: ' + targetViewNum + ' Shift: ' + shift);


    // $('#section0').animate({left: `calc(${$('#section0').css('left')} + ${shift})`}, 1000);

    views.forEach(viewNum => {
        // console.log(`calc(${$('#section' + viewNum).css('left')} + ${shift})`);
        // let marginShift;
        // if (parseInt($('#section' + viewNum).css('left')) < parseInt($('#section' + targetViewNum).css('left'))) {
        //     marginShift = 'marginLeft'
        // }

        let marginLeft = '0';
        let marginRight = '0';
        if (viewNum > targetViewNum) {
            marginRight = '-100%';
            marginLeft = '0';
            console.log('marginRight');
        } else if (viewNum < targetViewNum) {
            marginRight = '0';
            marginLeft = '-100%';
            console.log('marginLeft');
        } else {
            marginLeft = '0';
            marginRight = '0';
            console.log('margin 0');
        }

        $('#section' + viewNum).animate({
            left: `calc(${$('#section' + viewNum).css('left')} + ${shift})`,
            marginLeft: marginLeft,
            marginRight: marginRight
        }, 1000);
        
        // console.log(viewNum +': '+ $('#section' + viewNum).css('left'));
    });

    curViewNumber = targetViewNum;

}

function infoBoxSlgider() {
    let isOpen = true;
    if (!isTabletWidth()) {
        $("#title-bar0").click(function (e) { 
            // console.log("Clicked");
            // console.log(isOpen);
            if (isOpen) {
                $("#absimage").slideUp(1000, function() {
                    $("#view0").slideUp(1000, function() {
                        $("#title-bar0").addClass("notransition")
                        .css("border-bottom", "3px solid black")
                        ;
                        $("#title-bar0")[0].offsetHeight; // Have to flush css annoying. Thank you Mark
                        $("#title-bar0").removeClass("notransition");
                        // $("#title-bar0").css("border-radius", "0px");
                        $("#title-bar0").css("border-radius", "");
                    })
                    ;
                    isOpen = false;
                });
            }

            if (!isOpen) {
                $("#title-bar0").css({
                    "border-bottom": "none",
                    "border-radius": "10px"
                    // "transition": "0.4s"
                });
                $("#view0").slideDown(1000, function() {
                    $("#absimage").slideDown(1000);
                    isOpen = true;
                }).css("border-radius", "10px");
            }
            e.preventDefault();
            
        });
    }
}

function arrowControls() {
    $('#left-arrow').click(function (e) { 
        console.log("Left");
        // const testMargin = '-100%';
        // $('#section0').animate({left: '-100%', marginLeft: testMargin, marginRight: '0'}, 1000);
        // $('#section1').animate({left: '0', marginRight: '0', marginLeft: '0'}, 1000);
        // curViewNumber = 1;
        
        if (isSliderOpen) {
            infoBoxSlider(curViewNumber, function() {
                slideController(-1);
            });
        } else {
            slideController(-1);
        }
        
        e.preventDefault();
    });

    $('#right-arrow').click(function (e) { 
        console.log("Right");
        // $('#section1').animate({left: '100%', marginLeft: '0',marginRight: '-100%'}, 1000);
        // $('#section0').animate({left: '0', marginRight: '0' ,marginLeft: '0'}, 1000);
        // curViewNumber = 0;
        
        if (isSliderOpen) {
            infoBoxSlider(curViewNumber, function() {
                slideController(1);
            });
        } else {
            slideController(1);
        }
        
        e.preventDefault();
    });
}