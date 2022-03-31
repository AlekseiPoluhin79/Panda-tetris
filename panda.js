window.onload = function() {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.score-field');
    let color = [1, 2, 3, 4, 5]; // массив с количеством игровых цветных шариков
    let timer;
    let score = 0;

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
    init();
};