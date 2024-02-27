import $ from 'jquery';

$(document).ready(function () {
    makeGrid();
    calcInitialEntropy();
    makeOptions();

    createClickEvents();

    $(document).click(function (event) {
        let $target = $(event.target);
        if (!$target.closest('#inputOptions').length && !$target.closest('#sudokuGrid').length) {
            clearSelection();
        }
    });
});

let squares = new Array(81);
let startCode = new Array(81);
let inputOptions = new Array(9);
let gridActive = false;
let selected = false;
let showEntropy = false;
let solvedSquares = 0;
let sudokuList;

function submitted() {
    codeParser();
    calcInitialEntropy();
}

function hideWarning() {
    $('.mobile-warning').css('display', 'none');
    $('.mobile-warning-blur').css('filter', 'blur(0px)');
}

function makeGrid() {
    
    if (!gridActive) {
        const sudokuGrid = document.getElementById("sudokuGrid");
    
        let total = 0;
        for (let i = 0; i < 9; i++) {
            let largeCell = document.createElement("div");
            sudokuGrid.appendChild(largeCell).className = "sub-grid-item";
        }

        for (let h = 0; h < 9; h+=3) {
            for (let l = 0; l < 3; l++) {
                for (let j = 0; j < 3; j++) {
                    let largeCell = sudokuGrid.getElementsByClassName("sub-grid-item")[j+h];
                    for (let k = 0; k < 3; k++) {
                        let cellDisplay = document.createElement("div");
                        let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        let cell = {
                            cellDisplay : cellDisplay,
                            id : total,
                            cellValue : 0,
                            entropy : 9,
                            possi : possibilities
                        };

                        cellDisplay.onmouseover = function(){updateDisplayData(cell)}
                        cellDisplay.onmouseout = function() {
                            document.getElementById("displayValues").style.opacity = 0;
                            if (!selected) {
                                $('.input-item').removeClass('active');
                            }
                        };

                        cell.cellDisplay.onclick = function() {userChoosing(cell)};
                        
                        squares[total] = cell;
                        total++;
                        
                        // Test display values
                        // cellDisplay.innerText = (total-1);
                        // cellDisplay.innerText = (calcColumnStart(total));
                        // cellDisplay.innerText = (calcRowStart(total));
                        // cellDisplay.innerText = (calcSubSquareStart(total));

                        largeCell.appendChild(cellDisplay).className = "grid-item";
                    }
                }
            }
        }

        gridActive = true;
    }
}

function makeOptions() {
    const inputOptionsGrid = $('#inputOptions');

    for (let i = 0; i < 9; i++) {
        let cell = $('<div></div>');
        cell.text(i+1);
        cell.addClass('grid-item').addClass('input-item');
        inputOptions[i] = cell;
        inputOptionsGrid.append(cell);
    }
}

function codeParser() {
    let codeString = document.getElementById("inputCodeBox").value;
    if (codeString.length == 81) {
        let codeTemp = codeString.match(/(\d)/g);
        if (codeTemp.length == 81) {
            startCode = codeTemp;
            inputFromCode();
        }
    }
}

function inputFromCode() {
    // Clear any previous data
    clearBoard();

    // Fill grid with input data
    let i = 0;
    let cur;
    if (startCode) {
        startCode.forEach(element => {
            cur = squares[i];
            cur.cellValue = element;
            if (element != 0) {
                cur.cellDisplay.innerText = element;
                cur.cellDisplay.style.color = "black";
                cur.entropy = 0;
                for (let j = 0; j < 9; j++) {
                    if (cur.possi[j] != element) {
                        cur.possi[j] = 0;
                    }
                }
                cur.cellDisplay.onclick = null;

                solvedSquares++;
            }
            i++;
        });
    }
}

function checkSquare(curSquare, square, frameOfReference, recurse, testing) {
    
    if ((curSquare.entropy != 0 && curSquare.entropy != 1) || testing) {

        let possiCount = 0;
        for (let k = 0; k < 9; k++) {
            if (square.possi[k]) {
                possiCount++;
            }
        }

        for (let p = 0; p < 9; p++) {
            if (square.possi[p] && curSquare.possi[p] && curSquare != square) {

                if (testing) {
                    if (curSquare.entropy === 0 || curSquare.entropy === 1) {
                        return false;
                    }
                }

                curSquare.possi[p] = 0;
                curSquare.entropy--;

                if (showEntropy) {
                    curSquare.cellDisplay.innerText = curSquare.entropy;
                    curSquare.cellDisplay.classList.add('displayEntropy');
                }

                if (curSquare.entropy !== 0) {
                    curSquare.cellDisplay.onclick = function() {userChoosing(curSquare)};
                }

                if (recurse && curSquare.entropy == 1) {
                    return solveOne(curSquare, frameOfReference, true, testing);
                }

                if (recurse && curSquare.entropy == 2) {
                    return solvePairs(curSquare, frameOfReference, true, testing);
                }
            }
        }
    }
    return true;
}

function calcInitialEntropy() {
    squares.forEach(square => {
        if (square.entropy == 0) {

            // Rows
            let i = calcRowStart(square.id+1)-1;
            let end_i = i + 9;
            while (i < end_i) {
                checkSquare(squares[i], square, squares, false, false);
                i++;
            }

            // Columns
            let j = calcColumnStart(square.id+1)-1;
            let end_j = j + 73;
            while (j < end_j) {
                checkSquare(squares[j], square, squares, false, false);
                j += 9;
            }

            // SubSquares
            let k = calcSubSquareStart(square.id+1)-1;
            let end_k = k + 21;
            while (k < end_k) {
                checkSquare(squares[k], square, squares, false, false);
                if ((k+1)%3 == 0) {
                    k += 7;
                } else {
                    k++;
                }
            }
        }
    });
}

function copyFrameOfReference(frameOfReference) {

    let newFoR = new Array(81);
    for (let k = 0; k < 81; k++) {
        let tempPossi = new Array(9);
        for (let i = 0; i < 9; i++) {
            tempPossi[i] = frameOfReference[k].possi[i]
        }
        let cell = {
            cellDisplay : frameOfReference[k].cellDisplay,
            id : frameOfReference[k].id,
            cellValue : frameOfReference[k].cellValue,
            entropy : frameOfReference[k].entropy,
            possi : tempPossi
        };
        newFoR[k] = cell;

        cell.cellDisplay.onmouseover = function(){updateDisplayData(cell)}
        cell.cellDisplay.onmouseout = function() {
            document.getElementById("displayValues").style.opacity = 0;
            if (!selected) {
                $('.input-item').removeClass('active');
            }
        };
    }

    return newFoR;
}

function solveSingulars() {
    if (solvedSquares == 81) {
        return;
    }

    squares.forEach(square => {
        if (square.entropy == 1) {
            solveOne(square, squares, true, false);
        }
    });
}

function solveDuos() {
    if (solvedSquares == 81) {
        return;
    }

    squares.forEach(square => {
        if (square.entropy == 2) {
            solvePairs(square, squares, true, false);
        }
    });
}

function solve(origin, frameOfReference) {
    let searchEntropy = 2;
    let position = origin;

    let workingFoR = copyFrameOfReference(frameOfReference);

    let curSquare = workingFoR[position];
    let solvedSquaresMem = solvedSquares;
    
    while (searchEntropy < 10) {
        do {
            if (curSquare.entropy == searchEntropy) {
                for (let i = 0; i < 9; i++) {
                    if (curSquare.possi[i]) {

                        let entropyMem = curSquare.entropy;
                        let possiMem = new Array(9).fill(0);
                        curSquare.entropy = 1;
                        for (let j = 0; j < 9; j++) {
                            if (curSquare.possi[j] != curSquare.possi[i]) {
                                possiMem[j] = curSquare.possi[j];
                                curSquare.possi[j] = 0;
                            }
                        }
                        if (solveOne(curSquare, workingFoR, true, true)) {
                            if (solvedSquares >= 81) {
                                squares = workingFoR;
                                return true;
                            }
                            if(solve(((position+1) % 81), workingFoR)) {
                                return true;
                            } else {
                                workingFoR = copyFrameOfReference(frameOfReference);
                                curSquare = workingFoR[position];
                                curSquare.entropy = entropyMem--;
                                for (let j = 0; j < 9; j++) {
                                    curSquare.possi[j] = possiMem[j];
                                }

                                solvedSquares = solvedSquaresMem;
                                continue;
                            }
                        } else {
                            workingFoR = copyFrameOfReference(frameOfReference);
                            curSquare = workingFoR[position];
                            curSquare.entropy = entropyMem--;
                            for (let j = 0; j < 9; j++) {
                                curSquare.possi[j] = possiMem[j];
                            }

                            solvedSquares = solvedSquaresMem;
                        }
                    }
                }

                return false;
            }
            
            position = (position+1) % 81;
            curSquare = workingFoR[position];
        } while (position != origin);

        searchEntropy++;
    }
}

function solveRecursive() {
    calcInitialEntropy();
    squares.forEach(square => {
        if (square.entropy == 1) {
            solveOne(square, squares, true, false);
        }
        if (square.entropy == 2) {
            solvePairs(square, squares, true, false);
        }
    });

    solve(0, copyFrameOfReference(squares));
}

function solveOne(square, frameOfReference, recurse, testing) {
    if (square.entropy != 1) {
        return;
    }

    let possiCount = 0;
    for (let k = 0; k < 9; k++) {
        if (square.possi[k]) {
            possiCount++;
        }
    }

    if (square.cellValue == 0) {
        let c = 0;
        while (!square.possi[c]) {
            c++;
        }
        square.cellValue = square.possi[c];
        square.cellDisplay.innerText = square.cellValue;
        square.cellDisplay.style.color = "black";
        square.entropy = 0;
        square.cellDisplay.onclick = null;
        square.cellDisplay.style.backgroundColor = null;
        solvedSquares++;
        
    }

    // Rows
    let i = calcRowStart(square.id+1)-1;
    let end_i = i + 9;
    while (i < end_i) {
        if (!checkSquare(frameOfReference[i], square, frameOfReference, recurse, testing)) {
            solvedSquares--;
            return false;
        }
        i++;
    }

    // Columns
    let j = calcColumnStart(square.id+1)-1;
    let end_j = j + 73;
    while (j < end_j) {
        if (!checkSquare(frameOfReference[j], square, frameOfReference, recurse, testing)) {
            solvedSquares--;
            return false;
        }
        j += 9;
    }

    // SubSquares
    let k = calcSubSquareStart(square.id+1)-1;
    let end_k = k + 21;
    while (k < end_k) {
        if (!checkSquare(frameOfReference[k], square, frameOfReference, recurse, testing)) {
            solvedSquares--;
            return false;
        }
        if ((k+1)%3 == 0) {
            k += 7;
        } else {
            k++;
        }
    }

    return true;
}

function solvePairs(square, frameOfReference, recurse, testing) {
    // Rows
    let i = calcRowStart(square.id+1)-1;
    let end_i = i + 9;
    while (i < end_i) {
        if (frameOfReference[i].id != square.id && frameOfReference[i].possi.toString() == square.possi.toString()) {
            let p = calcRowStart(square.id+1)-1;
            while (p < end_i) {
                if (frameOfReference[p].id != frameOfReference[i].id && frameOfReference[p].id != square.id) {
                    if (!checkSquare(frameOfReference[p], square, frameOfReference, recurse, testing)) {
                        return false;
                    }
                }
                p++;
            }
            break;
        }
        i++;
    }

    // Columns
    let j = calcColumnStart(square.id+1)-1;
    let end_j = j + 73;
    while (j < end_j) {
        if (frameOfReference[j].id != square.id && frameOfReference[j].possi.toString() == square.possi.toString()) {
            let p = calcColumnStart(square.id+1)-1;
            while (p < end_j) {
                if (frameOfReference[p].id != frameOfReference[j].id && frameOfReference[p].id != square.id) {
                    if (!checkSquare(frameOfReference[p], square, frameOfReference, recurse, testing)) {
                        return false;
                    }
                }
                p += 9;
            }
            break;
        }
        j += 9;
    }

    // SubSquares
    let k = calcSubSquareStart(square.id+1)-1;
    let end_k = k + 21;
    while (k < end_k) {
        if (frameOfReference[k].id != square.id && frameOfReference[k].possi.toString() == square.possi.toString()) {
            let p = calcSubSquareStart(square.id+1)-1;
            while (p < end_k) {
                if (frameOfReference[p].id != frameOfReference[k].id && frameOfReference[p].id != square.id) {
                    if (!checkSquare(frameOfReference[p], square, frameOfReference, recurse, testing)) {
                        return false;
                    }
                }
                if ((p+1)%3 == 0) {
                    p += 7;
                } else {
                    p++;
                }
            }
            break;
        }
        if ((k+1)%3 == 0) {
            k += 7;
        } else {
            k++;
        }
    }
    return true;
}

function calcRowStart(value) {
    if (value%9) {
        return value - (value%9) + 1;
    } else {
        return value - 9 + 1;
    }
}

function calcColumnStart(value) {
    if (value%9) {
        return value % 9;
    } else {
        return 9;
    }
}

function calcSubSquareStart(value) {
    let subCol;
    if (value%3) {
        subCol = (value % 3) - 1;
    } else {
        subCol = 2;
    }

    let subRow = (Math.ceil(value/9)-1) % 3;

    return value - (subRow*9) - subCol;
}

function updateDisplayData(square) {
    let displayValues = document.getElementById("displayValues");
    displayValues.style.opacity = 1;

    let possi = [];
    let i = 0;

    square.possi.forEach(element => {
        if (element) {
            possi.push(element); 
            if (!selected) {
                $(inputOptions[i].addClass('active'));
            }
        }
        i++;
    });

    displayValues.innerHTML = ('</h1> <h1>Display Value: <span style="font-weight: normal;">' + square.cellValue + '</span></h1> <h1>Entropy: <span style="font-weight: normal;">' + square.entropy + '</span></h1> <h1>Id: <span style="font-weight: normal;">' + square.id + '</span></h1> <h1>Possibilities: <span style="font-weight: normal; display: block;";>' + possi + '</span></h1>');
    
}

function clearBoard() {
    solvedSquares = 0;
    squares.forEach(square => {
        square.cellValue = 0;
        square.cellDisplay.innerText = "";
        square.entropy = 9;
        square.possi = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        square.cellDisplay.onclick = null;
        square.cellDisplay.onclick = function() {userChoosing(square)};
        square.cellDisplay.style.backgroundColor = null;
        square.cellDisplay.style.color = '';
        square.cellDisplay.classList.remove('incorrect');

        square.cellDisplay.onmouseover = function(){updateDisplayData(square)}
        square.cellDisplay.onmouseout = function() {
            document.getElementById("displayValues").style.opacity = 0;
            if (!selected) {
                $('.input-item').removeClass('active');
            }
        };

        if (showEntropy) {
            square.cellDisplay.innerText = square.entropy;
            square.cellDisplay.classList.add('displayEntropy');
        }

        for (let i = 0; i < 9; i++) {
            $(inputOptions[i]).removeClass('active').off('click');
        }
    });
}

// Test/Partial Implementation
function userInitiateOne(square) {
    if (!solveOne(square, squares, false, true)) {
        console.log("FAILURE SolveOne");
    }
}

function userChoosing(square) {
    clearSelection()
    selected = true;
    let i = 0;
    square.cellDisplay.classList.add('square-active');
    square.possi.forEach(element => {
        $(inputOptions[i]).removeClass('active').off('click');
        
        if (element != 0) {
            
            $(inputOptions[i]).addClass('active');
            
            $(inputOptions[i]).click(function (e) { 
                e.preventDefault();
                
                userChose(square, element);

            });
        }
        i++;
    });
}

function userChose(square, element) {
    square.entropy = 1;

    for (let i = 0; i < square.possi.length; i++) {
        if (element != square.possi[i]) {
            square.possi[i] = 0;
        }
    }
    square.cellDisplay.innerText = element;
    square.cellDisplay.style.backgroundColor = null;
    square.cellDisplay.onclick = null;

    for (let i = 0; i < 9; i++) {
        $(inputOptions[i]).removeClass('active').off('click');
    }

    square.cellDisplay.classList.remove('square-active');

    if (!solveOne(square, squares, false, true)) {
        console.log("FAILURE SolveOne");
    }

    selected = false;
}

function clearSelection() {
    squares.forEach(square => {
        square.cellDisplay.classList.remove('square-active');

        for (let i = 0; i < 9; i++) {
            $(inputOptions[i]).removeClass('active').off('click');
        }
        
        selected = false;
    });
}

function checkFullErrors() {
    squares.forEach(square => {
        checkErrors(square, true);
    });
}

function checkErrors(square, displayErrors) {
    // displayErrors: boolean
    //  Token value used to display all failures if requested
    //  Otherwise function returns failure on first instance.
    let foundError = false;

    // Rows
    let i = calcRowStart(square.id+1)-1;
    let end_i = i + 9;
    while (i < end_i) {
        if (squares[i].id != square.id && squares[i].cellValue == square.cellValue && squares[i].cellValue != 0) {
            if (displayErrors) {
                square.cellDisplay.classList.add('incorrect');
                squares[i].cellDisplay.classList.add('incorrect');
                foundError = true;
            } else {
                return true;
            }
        }
        i++;
    }

    // Columns
    let j = calcColumnStart(square.id+1)-1;
    let end_j = j + 73;
    while (j < end_j) {
        if (squares[j].id != square.id && squares[j].cellValue == square.cellValue && squares[j].cellValue != 0) {
            if (displayErrors) {
                square.cellDisplay.classList.add('incorrect');
                squares[j].cellDisplay.classList.add('incorrect');
                foundError = true;
            } else {
                return true;
            }
        }
        j += 9;
    }

    // SubSquares
    let k = calcSubSquareStart(square.id+1)-1;
    let end_k = k + 21;
    while (k < end_k) {
        if (squares[k].id != square.id && squares[k].cellValue == square.cellValue && squares[k].cellValue != 0) {
            if (displayErrors) {
                square.cellDisplay.classList.add('incorrect');
                squares[k].cellDisplay.classList.add('incorrect');
                foundError = true;
            } else {
                return true;
            }
        }
        if ((k+1)%3 == 0) {
            k += 7;
        } else {
            k++;
        }
    }

    return foundError;

}

function toggleEntropy() {
    showEntropy = !showEntropy;

    squares.forEach(square => {
        if (square.entropy > 0) {
            if (showEntropy) {
                square.cellDisplay.innerText = square.entropy;
                square.cellDisplay.classList.add('displayEntropy');
            } else {
                square.cellDisplay.innerText = '';
                square.cellDisplay.classList.remove('displayEntropy');
            }
        }
    });

    if (showEntropy) {
        $('#entropy-button').css('background-color', 'red');
    } else {
        $('#entropy-button').css('background-color', '');
    }

}

// Board Generator
function genBoard() {
    clearBoard();
    for (let i = 0; i < 61; i+=30) {
        if (i%9 === 0 && i !== 0) {
            i += 18;
        }

        for (let j = i; j < i+21; j++) {
            if (j%3 === 0 && j !== i) {
                j += 6;
            }
            
            fillCell(squares[j]);
        }
    }

    solveRecursive();

    const toRemove = Math.floor(Math.random() * 24) + 40;
    for (let i = 0; i < toRemove; i++) {
        let cur = Math.floor(Math.random() * 81);
        if (squares[cur].cellValue !== 0) {
            squares[cur].cellValue = 0;
            squares[cur].cellDisplay.innerText = '';
        } else {
            i--;
        }
    }

    let out = new Array(81).fill(0);
    squares.forEach(square => {
        if (square.cellValue > 0) {
            out[square.id] = square.cellValue;
        }
    });

    startCode = out;
    inputFromCode();
    calcInitialEntropy();
}

function fillCell(square) {
    const shortPossi = square.possi.filter(num => num !== 0);
    const element = shortPossi[Math.floor(Math.random() * shortPossi.length)];

    userChose(square, element);
}

async function genFromList() {
    if (!sudokuList) {
        await fetch('../json/puzzles.json')
            .then(response => response.json())
            .then(list => {
                sudokuList = list.boards;
        }).catch(error => {
            console.error('Could not retrieve sudoku list', error);
        });
    }
    
    if (sudokuList) {
        let codeString = sudokuList[Math.floor(Math.random() * 1000)];

        if (codeString.length === 81) {
            let codeTemp = codeString.match(/(\d)/g);
            if (codeTemp.length == 81) {
                startCode = codeTemp;
                inputFromCode();
                calcInitialEntropy();
            }
        }
    }
}

function createClickEvents() {
    $('#genFromList').on('click', function () {
        genFromList();
    });
    $('#genBoard').on('click', function () {
        genBoard();
    });
    $('#clearBoard').on('click', function () {
        clearBoard();
    });
    $('#solveSingulars').on('click', function () {
        solveSingulars();
    });
    $('#solveDuos').on('click', function () {
        solveDuos();
    });
    $('#solveRecursive').on('click', function () {
        solveRecursive();
    });
    $('#entropy-button').on('click', function () {
        toggleEntropy();
    });
    $('#checkFullErrors').on('click', function () {
        checkFullErrors();
    });
}