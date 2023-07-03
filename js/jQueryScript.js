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

function isTabletWidth() {
    return $('#tablet-indicator').is(':visible');
}

$(document).ready(function () {
        const l = $('.dev-texts p');
        // console.log(l.length);
        rotatingSkills(0, l.length);
        infoBoxSlider();
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
    $("#title-bar0").width($("#view0").width()).css("border-radius", "10px");
});

function infoBoxSlider() {
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