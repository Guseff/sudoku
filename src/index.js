module.exports = function solveSudoku(matrix) {
  grid = [...matrix];

  function checkRow(x, arr, grid) {
    let row = grid[x];
    return [...arr].filter((el) => !row.includes(el));
  }

  function checkCol(y, arr, grid) {
    let col = [];
    for (let i=0; i<9; i++) {
      col.push(grid[i][y]);
    }
    return [...arr].filter((el) => !col.includes(el));
  }

  function checkSell(x, y, arr, grid) {
    const startX = Math.floor(x/3)*3;
    const startY  = Math.floor(y/3)*3;
    let sell = [];
    for (let i=startX; i<startX+3; i++) {
      for (let j=startY; j<startY+3; j++) {
        sell.push(grid[i][j]);
      }
    }
    return [...arr].filter((el) => !sell.includes(el));
  }

  function solve(x, y) {
    let nextX = x + 1;
    let nextY = y;

    if (nextX === 9) {
      nextX = 0;
      nextY++;
    }
    
    if (y === 9) { 
      return true; 
    }

    if (grid[x][y] !== 0) {
      return solve(nextX, nextY);
    }

    let numbers = checkRow(x, checkCol(y, checkSell(x, y, [1,2,3,4,5,6,7,8,9], grid), grid), grid);
    
    for (let i = 0; i < numbers.length; i++) {
      grid[x][y] = numbers[i];
      if (solve(nextX, nextY)) { 
        return true; 
      }
    }

    grid[x][y] = 0;
    return false;
  }

  solve(0, 0);
  return grid;
}
