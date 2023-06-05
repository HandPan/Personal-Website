$('document').ready(function () {
    $('.icon').click(function () {
        $('nav ul').toggleClass('show');
    });
});

function validateBanner() {
    if (document.forms[0].bFirst.value == "") {
        alert('Your name exists');
        document.forms[0].bFirst.style.border = '2px solid red'
        return false;
    }

    if (document.forms[0].bLast.value == "") {
        alert('You think your funny');
        document.forms[0].bLast.style.border = '2px solid red'
        return false;
    }

    if (document.forms[0].bEmail.value == "") {
        alert('Please enter your email');
        document.forms[0].bEmail.style.border = '2px solid red';
        return false;
    }

    else {
        opps();
        return true;
    }

}

function validateMain() {
    if (document.forms[1].mFirst.value == "") {
        alert('Your name exists');
        document.forms[1].mFirst.style.border = '2px solid red'
        return false;
    }

    if (document.forms[1].mLast.value == "") {
        alert('You think your funny');
        document.forms[1].mLast.style.border = '2px solid red'
        return false;
    }

    if (document.forms[1].mEmail.value == "") {
        alert('Please enter your email');
        document.forms[1].mEmail.style.border = '2px solid red';
        return false;
    }

    else {
        opps();
        return true;
    }

}


function opps() {
    alert("Shouldn't have done that");
}