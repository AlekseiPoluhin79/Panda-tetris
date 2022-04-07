window.onload = function() {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.score-field');
    let color = [1, 2, 3, 4, 5]; // массив с количеством игровых цветных шариков
    let timer;
    let score = 5;
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
        //присваиваем рендомной цвет шарика массивы color
        tetris[0][0] = rendomInteger(0, color.length);
    }

    function run() {
        timer = setTimeout(function() {
            if (finish()) return false;
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
            checkLine();
            if (flag) square();
            run(); //рекурсивно вызываем функцию run()
        }, 200);
    }

    function tetrisRight() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = tetris[i].length - 1; j >= 0; j--) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j + 1] == 0 && tetris[i + 1][j] == 0) {
                        tetris[i][j + 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
    }
    draw();

    function tetrisLeft() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j - 1] == 0 && tetris[i + 1][j] == 0) {
                        tetris[i][j - 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }

    function checkLine() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] > 10 && tetris[i][j + 1] != undefined && tetris[i][j + 2] != undefined) {
                    if (tetris[i][j] == tetris[i][j + 1] && tetris[i][j] == tetris[i][j + 2]) {
                        tetris[i][j] = 0;
                        tetris[i][j + 1] = 0;
                        tetris[i][j + 2] = 0;
                        score += 10;
                        // ниже проверяем ( для этого вводим временную переменную  m )  что у нас лежит в строках выше
                        for (let m = i; m >= 0; m--) {
                            if (tetris[m][j] > 10) tetris[m][j] = tetris[m][j] - 10; //проверяем что линия не пустая и не подвижная/и делаем её пустую и подвижную
                            if (tetris[m][j + 1] > 10) tetris[m][j + 1] = tetris[m][j + 1] - 10; //то же делаем с соседними блоками
                            if (tetris[m][j + 2] > 10) tetris[m][j + 2] = tetris[m][j + 2] - 10;
                        }
                    }
                }
            }
        }
    }

    //функция завершения игры finish()

    function finish() {
        let stop = false;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                stop = true;
                for (let k = 0; k < tetris.length; k++) {
                    if (tetris[k][j] == 0) {
                        stop = false;
                        break;
                    }
                }
                if (stop) {
                    clearTimeout(timer);
                    alert('Попробуй ещё раз!');
                    break;
                }
            }
            if (stop) break;
        }
        if (stop) createForm();
        return stop;
    }

    //функция создания формы для вывода лучших результатов

    function createForm() {
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', 'send.php');
        let hiddenInpun = document.createElement('input');
        hiddenInpun.setAttribute('type', 'hidden');
        hiddenInpun.setAttribute('name', 'score');
        hiddenInpun.setAttribute('value', score);
        let nameInpun = document.createElement('input');
        nameInpun.setAttribute('type', 'text');
        nameInpun.setAttribute('name', 'username');
        let submitInpun = document.createElement('input');
        submitInpun.setAttribute('type', 'submit');
        submitInpun.setAttribute('value', 'Поделиться!');
        form.appendChild(hiddenInpun);
        form.appendChild(nameInpun);
        form.appendChild(submitInpun);
        document.querySelector('.form').appendChild(form);
        // form.onsubmit = removeForm;
    }

    //   function removeForm() {
    //       let form = document.querySelector('.form form');
    //       document.querySelector('.form').removeChild(form);
    //    }

    document.querySelector('.start').onclick = function() {
        init();
        draw();
        square();
        run();
    };

    document.onkeydown = function(event) {
        switch (event.code) {
            case 'ArrowRight':
                tetrisRight();
                break;
            case 'ArrowLeft':
                tetrisLeft();
                break;
        }
        return false;
    };
};