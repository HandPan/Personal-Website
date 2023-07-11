$(document).ready(function () {
    arrowControls();
});

// Globals
let curViewNumber = 0;
// const views = [-2, -1, 0, 1, 2];
// let posData = [-200, -100, 0, 100, 200];
const views = [-1, 0];
let posData = [-100 , 0];

function arrowControls() {
    $('#left-arrow').click(function (e) { 
        console.log("Left");
        // const testMargin = '-100%';
        // $('#section0').animate({left: '-100%', marginLeft: testMargin, marginRight: '0'}, 1000);
        // $('#section1').animate({left: '0', marginRight: '0', marginLeft: '0'}, 1000);
        // curViewNumber = 1;
        
        slideController(1);

        e.preventDefault();
    });

    $('#right-arrow').click(function (e) { 
        console.log("Right");
        // $('#section1').animate({left: '100%', marginLeft: '0',marginRight: '-100%'}, 1000);
        // $('#section0').animate({left: '0', marginRight: '0' ,marginLeft: '0'}, 1000);
        // curViewNumber = 0;
        
        slideController(-1);
        
        e.preventDefault();
    });
}

function calcMarginLeft(viewNum, targetViewNum) {
    let marginLeft = '0';
    if (viewNum > targetViewNum) {
        marginLeft = '0';
    } else if (viewNum < targetViewNum) {
        // marginRight = '-100%';
        console.log('marginLeft');
    } else {
        marginLeft = '0';
    }

    return marginLeft;
}

function calcMarginRight(viewNum, targetViewNum) {
    let marginRight = '0';
    if (viewNum > targetViewNum) {
        marginRight = '-100%';
        console.log('marginRight');
    } else if (viewNum < targetViewNum) {
        marginRight = '0';
    } else {
        marginRight = '0';
        console.log('margin 0');
    }

    return marginRight;
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
    for (let i = 0; i < posData.length; i++) {
        posData[i] += (moveVal * 100);
        console.log('PosData[' + i +']: ' + posData[i]);
    }
    // const shift = (moveVal * 100) + '%';
    // posData = (moveVal * 100) + posData;
    // const shift = posData + '%'
    console.log('Current: ' + curViewNumber + ' Target: ' + targetViewNum);

    // $('#section1').css("left", "calc(" + $('#section1').css('left') + " + " + shift + ")");

    // $('#section-2').animate({left: `calc(${$('#section-2').css('left')} + ${shift})`}, 1000);

    // console.log("Section-2: " + `calc(${$('#section' + '-2').css('left')} + ${shift})`);
    // console.log("Section2: " + `calc(${$('#section' + '2').css('left')} + ${shift})`);
    // console.log("Section0: " + `calc(${$('#section' + '0').css('left')} + ${shift})`);
    // console.log($('#section' + '0').css('left'))

// $('section' + '0').css('--leftValue', `calc(${$('#section' + '0').css('left')} + ${shift})`);

// document.getElementById("section0").style.setProperty = ("--leftValue", `calc(${$('#section' + '0').css('left')} + ${shift})`);

    // let leftVal = `calc(${$('#section' + '0').css('left')} + ${shift})`;
    // let leftVal = ;

    // $('#section' + '0').animate({
    //     left: shift,
    //     marginLeft: calcMarginLeft(0, targetViewNum),
    //     marginRight: calcMarginRight(0, targetViewNum)
    // }, 1000, function() {
    //     // $('#section' + '0').css({
    //     //     "left": `${$('#section' + '0').css('left')}`
    //     // });
    // });

    // console.log($('#section' + '0').css('left'))


    // $('#section' + '-2').animate({
    //     left: `calc(${$('#section' + '-2').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(-2, targetViewNum),
    //     marginRight: calcMarginRight(-2, targetViewNum)
    // }, 1000);
    // $('#section' + '-1').animate({
    //     left: `calc(${$('#section' + '-1').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(-1, targetViewNum),
    //     marginRight: calcMarginRight(-1, targetViewNum)
    // }, 1000);
    // $('#section' + '0').animate({
    //     left: `calc(${$('#section' + '0').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(0, targetViewNum),
    //     marginRight: calcMarginRight(0, targetViewNum)
    // }, 1000, function() {
    //     $('#section' + '0').css("left", `calc(${$('#section' + '0').css('left')} + ${shift})`);
    // });
    // $('#section' + '1').animate({
    //     left: `calc(${$('#section' + '1').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(1, targetViewNum),
    //     marginRight: calcMarginRight(1, targetViewNum)
    // }, 1000);
    // $('#section' + '2').animate({
    //     left: `calc(${$('#section' + '2').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(2, targetViewNum),
    //     marginRight: calcMarginRight(2, targetViewNum)
    // }, 1000);
    


    // $('#section' + '2').animate({
    //     left: `calc(${$('#section' + '2').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(2, targetViewNum),
    //     marginRight: calcMarginRight(2, targetViewNum)
    // }, 1000);
    // $('#section' + '1').animate({
    //     left: `calc(${$('#section' + '1').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(1, targetViewNum),
    //     marginRight: calcMarginRight(1, targetViewNum)
    // }, 1000);
    // $('#section' + '0').animate({
    //     left: `calc(${$('#section' + '0').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(0, targetViewNum),
    //     marginRight: calcMarginRight(0, targetViewNum)
    // }, 1000);
    // $('#section' + '-1').animate({
    //     left: `calc(${$('#section' + '-1').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(-1, targetViewNum),
    //     marginRight: calcMarginRight(-1, targetViewNum)
    // }, 1000);
    // $('#section' + '-2').animate({
    //     left: `calc(${$('#section' + '-2').css('left')} + ${shift})`,
    //     marginLeft: calcMarginLeft(-2, targetViewNum),
    //     marginRight: calcMarginRight(-2, targetViewNum)
    // }, 1000);


    views.forEach(viewNum => {
        // console.log(`calc(${$('#section' + viewNum).css('left')} + ${shift})`);
        // let marginShift;
        // if (parseInt($('#section' + viewNum).css('left')) < parseInt($('#section' + targetViewNum).css('left'))) {
        //     marginShift = 'marginLeft'
        // }

        console.log(viewNum + (Math.ceil(views.length/2)));
        // console.log(leftVal);

        $('#section' + viewNum).animate({
            left: posData[viewNum + (Math.ceil(views.length/2))-1] + '%',
            marginLeft: calcMarginLeft(viewNum, targetViewNum),
            marginRight: calcMarginRight(viewNum, targetViewNum)
        }, 1000);
        
        // console.log(viewNum +': '+ $('#section' + viewNum).css('left'));
    });

    curViewNumber = targetViewNum;

}


