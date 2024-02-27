import anime from "animejs";
import $ from 'jquery';

let drawing = false;
$(document).ready(function () {
    // buildPattern('15436789');
    // buildPattern('124536987');
    // buildPattern('154984');
    // buildPattern('139719647349761284268');
    // $('#hideWarning').on('click', function () {
    //     $('.mobile-warning').css('display', 'none');
    //     $('.mobile-warning-blur').css('filter', 'blur(0px)');
    // });

    const dots = $('#input-dots');
    let path = 'M';
    let drawingSVG = false;
    let code = '';

    const posLookup = {
        1: [0, 0],
        2: [100, 0],
        3: [200, 0],
        4: [0, 100],
        5: [100, 100],
        6: [200, 100],
        7: [0, 200],
        8: [100, 200],
        9: [200, 200]
    }

    for (let i = 0; i < 9; i++) {
        const dot = $(`
            <div class="outer-input-dot">
                <div class="inner-dot"></div>
            </div>`
        ).data('index', i)
        .mousedown(function (e) { 
            e.preventDefault();

            anime({
                targets: this,
                scale: [{
                    value: 1.7,
                    easing: 'spring(1,80,10,20)',
                    duration: 500
                }]
            });

            drawingSVG = true;
        
        }).mouseleave(function () {

            anime({
                targets: this,
                scale: [{
                    value: 1,
                    easing: 'spring(1,80,10,10)',
                    duration: 500
                }]
            });

        }).mouseover(function () {
            if (drawingSVG && code[code.length-1] != dot.data('index')+1) {
                anime({
                    targets: this,
                    scale: [{
                        value: 1.7,
                        easing: 'spring(1,80,10,20)',
                        duration: 500
                    }]
                });

                code += dot.data('index')+1;
                path += posLookup[dot.data('index')+1] + 'L';
                const offset = $('#input-dots').offset();
                $('#input-pattern-wrapper').on('mousemove', ((event) => {
                    let shortPath = path + (Math.round(event.pageX-offset.left)) + ',' + (Math.round(event.pageY-offset.top));
                    if (drawingSVG) {
                        document.getElementById('demo-in-path').setAttribute('d', shortPath);
                    }
                }));
            } else if (!drawingSVG) {
                anime({
                    targets: this,
                    scale: [{
                        value: 1.3,
                        easing: 'spring(1,80,10,20)',
                        duration: 500
                    }]
                });
            }
        });

        dots.append(dot);

        $(document).mouseup(() => {
            if (drawingSVG) {
                drawingSVG = false;
                $('#input-pattern-wrapper').off('mousemove');
                document.getElementById('demo-in-path').setAttribute('d', path.slice(0, path.length-1));
                path = 'M';
                drawing = true;
                buildPattern(code);
                code = '';
                animate();
            }
        });
    }

    idlePattern(0);
    
    // document.getElementById('user-in').addEventListener('input', (event) => {
    //     if (event.target.value.length > 81 || +event.target.value === 'NaN') {
    //         console.error('Error in input value!');
    //         return
    //     }

    //     drawing = true;
    //     buildPattern(event.target.value);
    //     animate();
    // });
});

const idlePattern = (i) => {
    if (drawing) {
        return
    }

    const patternLookup = {
        0: '139719647349761284268',
        1: '284627832',
        2: '1397194268467381672943',
        3: '4567891234',
        4: '842697136186738',
        5: '467294',
        6: '4869753178914263'
    }

    buildPattern(patternLookup[i]);

    anime({
        targets: '#demo-svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 5000,
        complete: () => {
            if (drawing) {
                return
            }

            anime({
                targets: '#demo-svg path',
                strokeDashoffset: [0, anime.setDashoffset],
                easing: 'easeInOutSine',
                duration: 5000,
                delay: 2000,
                complete: () => {
                    if (drawing) {
                        return
                    }

                    idlePattern((i+1)%Object.keys(patternLookup).length);
                }
            });
        }
    });
}

const buildPattern = (pattern) => {

    const posLookup = {
        1: [0, 0],
        2: [100, 0],
        3: [200, 0],
        4: [0, 100],
        5: [100, 100],
        6: [200, 100],
        7: [0, 200],
        8: [100, 200],
        9: [200, 200]
    }

    let path = "M";

    for (let i = 0; i < pattern.length-1; i++) {
        path += posLookup[pattern[i]];
        path += 'L';
    }

    path += posLookup[pattern[pattern.length-1]];

    document.getElementById('demo-path').setAttribute('d', path);

}

const animate = () => {
    anime({
        targets: '#demo-svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 5000,
        delay: 1000
    });
}