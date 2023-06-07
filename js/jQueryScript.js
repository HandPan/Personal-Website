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

$(document).ready(function () {
        const l = $('.dev-texts p');
        // console.log(l.length);
        rotatingSkills(0, l.length);       
});

function rotatingSkills(i, l) {
    // console.log(i);
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