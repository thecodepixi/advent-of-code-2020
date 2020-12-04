/*
  INSTRUCTIONS: 

  From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.

  The locations you'd check in the above example are marked here with O where there was an open square and X where there was a tree:

  ..##.........##.........##.........##.........##.........##.......  --->
  #..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
  .#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
  ..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
  .#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
  ..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
  .#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
  .#........#.#........X.#........#.#........#.#........#.#........#
  #.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
  #...##....##...##....##...#X....##...##....##...##....##...##....#
  .#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
  In this example, traversing the map using this slope would cause you to encounter 7 trees.

  Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
*/

// READ FILE INPUT

const fs = require('fs');

let rawFile = fs.readFileSync('d-3/input.txt', { encoding: 'utf-8' });

let mapArray = rawFile.split('\n').map((line) => line.split(''));

let mapWidth = mapArray[0].length;
let mapHeight = mapArray.length;

let slopes = [
  { sx: 1, sy: 1 },
  { sx: 3, sy: 1 },
  { sx: 5, sy: 1 },
  { sx: 7, sy: 1 },
  { sx: 1, sy: 2 },
];

let allTrees = [];

slopes.forEach((slope) => {
  let x = 0;
  let y = 0;
  let slopeTrees = 0;

  do {
    mapArray[y][x] == '#' ? slopeTrees++ : null;

    x = (x + slope.sx) % mapWidth;
    y += slope.sy;
  } while (y < mapHeight);

  allTrees.push(slopeTrees);
});

let productOfAllTrees = allTrees.reduce((a, v) => a * v);

console.log(productOfAllTrees);
