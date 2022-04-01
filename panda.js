window.onload = function() {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.score-field');
    let color = [1, 2, 3, 4, 5]; // массив с количеством игровых цветных шариков
    let timer;
    let score = 0;
    let flag; //проверка когда запускать следующий блок( функция run) с новым шариком

    //размечаем и заполняем  массив игрового поля по осям x , y
    function init() {
        let x = 9;
        let y = 15;
        for (let i = 0; i < y; i++) {
            tetris[i] = [];
            for (let j = 0; j < x; j++) {
                tetris[i][j] = 0; // 0 -начальное пустое поле
            }
        }
        console.table(tetris);
    }

    // рисуем игровое поле
    function draw() {
        let out = '';
        for (i = 0; i < tetris.length; i++) {
            for (j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] == 0) {
                    out += '<div class="white"></div>';
                } else if (tetris[i][j] == 1 || tetris[i][j] == 11) {
                    out += '<div class="orange"></div>';
                } else if (tetris[i][j] == 2 || tetris[i][j] == 12) {
                    out += '<div class="red"></div>';
                } else if (tetris[i][j] == 3 || tetris[i][j] == 13) {
                    out += '<div class="green"></div>';
                } else if (tetris[i][j] == 4 || tetris[i][j] == 14) {
                    out += '<div class="blue"></div>';
                } else if (tetris[i][j] == 5 || tetris[i][j] == 15) {
                    out += '<div class="indigo"></div>';
                }
            }
        }

        tetrisField.innerHTML = out; //перерисовываю игровое поле при любом действии
        scoreField.innerHTML = score; //вывожу количество очков
    }

    // рисуем игровой блок и присваиваем ему цветные шары
    function square() {
        function rendomInteger(min, max) {
            let rend = min + Math.random() * (max + 1 - min);
            rend = Math.floor(rend);
            return rend;
        }
        tetris[0][0] = rendomInteger(0, color.length); //присваиваем рендомной цвет шарика массивы color
    }

    function run() {
        draw();
        flag = true;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0) {
                        if (i == tetris.length - 1) {
                            tetris[i][j] = tetris[i][j] + 10;
                        } else if (tetris[i + 1][j] == 0) {
                            tetris[i + 1][j] = tetris[i][j];
                            tetris[i][j] = 0;
                            flag = false;
                        }
                    }
                }
            }
        }
        if (flag) square();
    }

    init();
    draw();
    square();

    document.querySelector('.start').onclick = run;
};