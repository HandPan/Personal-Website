import anime from 'animejs';
import $ from 'jquery';

$(document).ready(function () {
    buildGrid();
});

$(window).on('resize', function () {
    buildGrid();
});

const alternate = [
    // 'rgb(53, 23, 75)',
    'rgb(255, 255, 255)',
    'rgb(0, 0, 0)'
];

let count = -1;

const buildGrid = () => {
    $('#color-changer').html('');

    let rows = Math.floor($(document).height() / 50);
    let columns = Math.floor($(document).width() / 50);

    count = -1;

    $('#color-changer').css('--columns', columns).css('--rows', rows);

    createTiles(columns, rows, rows * columns);
}

const createTile = (columns, rows, index) => {
    let tile = $(`<div class="tile"></div>`).data('index', index).on('click', function () {
        count = (count+1) % alternate.length;
        anime({
            targets: '.tile',
            backgroundColor: alternate[count],
            easing: 'spring(1,80,80,20)',
            delay: anime.stagger(25, {
                grid: [columns, rows],
                from: index
            }),
        });
        anime({
            targets: '.text',
            color: alternate[(count+1) % alternate.length],
            duration: 5000
        });
    });

    return tile;
}

const createTiles = (columns, rows, quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
        $('#color-changer').append(createTile(columns, rows, index));
    });
}