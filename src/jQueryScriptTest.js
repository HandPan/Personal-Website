import $ from 'jquery';

$(document).ready(function () {
    arrowControls();
    barNav();
    $('#bar0').addClass('active');
    $('#left-arrow').attr('data-state', '');
    $('#right-arrow').attr('data-state', '');
});

console.log("Test -------- ");

// Globals
let curViewNumber = 0;
let curViewIndex = 2;
// const views = [-2, -1, 0, 1, 2];
// let posData = [-200, -100, 0, 100, 200];
const views = [-2, -1, 0, 1, 2];
let posData = [-200, -100 , 0, 100, 200];

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
    if (viewNum < targetViewNum) {
        marginLeft = '0';
    } else if (viewNum > targetViewNum) {
        // marginRight = '-100%';
        marginLeft = '-100%'
        console.log('marginLeft');
    } else {
        marginLeft = '0';
    }

    return marginLeft;
}

function calcMarginRight(viewNum, targetViewNum) {
    let marginRight = '0';
    if (viewNum < targetViewNum) {
        marginRight = '-100%';
        console.log('marginRight');
    } else if (viewNum > targetViewNum) {
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
    
    const targetViewNum = curViewNumber - moveVal;
    
    if (targetViewNum > views.length/2 || targetViewNum < views.length/2 * -1) {
        return;
    }

    curViewIndex += moveVal;
    console.log('curViewIndex: ' + curViewIndex);

    $('#bar' + curViewNumber).removeClass('active');

    if (curViewIndex === views.length-1) {
        $('#left-arrow').attr('data-state', 'disabled');
        $('#right-arrow').attr('data-state', '');
    } else if (curViewIndex === 0) {
        $('#right-arrow').attr('data-state', 'disabled');
        $('#left-arrow').attr('data-state', '');
    } else {
        $('#left-arrow').attr('data-state', '');
        $('#right-arrow').attr('data-state', '');
    }

    for (let i = 0; i < posData.length; i++) {
        posData[i] += (moveVal * 100);
        console.log('PosData[' + i +']: ' + posData[i]);
    }
    // const shift = (moveVal * 100) + '%';
    // posData = (moveVal * 100) + posData;
    // const shift = posData + '%'
    console.log('Current: ' + curViewNumber + ' Target: ' + targetViewNum);


    views.forEach(viewNum => {
        // console.log(`calc(${$('#section' + viewNum).css('left')} + ${shift})`);
        // let marginShift;
        // if (parseInt($('#section' + viewNum).css('left')) < parseInt($('#section' + targetViewNum).css('left'))) {
        //     marginShift = 'marginLeft'
        // }

        console.log((Math.ceil(views.length/2))-1);
        // console.log(leftVal);

        $('#section' + viewNum).animate({
            left: posData[viewNum + 2] + '%'
            // marginLeft: calcMarginLeft(viewNum, targetViewNum),
            // marginRight: calcMarginRight(viewNum, targetViewNum)
        }, 1000);
        
        // console.log(viewNum +': '+ $('#section' + viewNum).css('left'));
    });

    curViewNumber = targetViewNum;
    $('#bar' + curViewNumber).addClass('active');

}

function barNav() {
    views.forEach(viewNum => {
        $('#bar' + viewNum).click(function (e) { 
            e.preventDefault();

            if (curViewNumber != viewNum) {
                slideController(curViewNumber-viewNum);
            }
        });
    });
}