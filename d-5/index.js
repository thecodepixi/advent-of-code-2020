const fs = require('fs');

let rawFile = fs.readFileSync('d-5/input.txt', { encoding: 'utf-8' });

let passes = rawFile.split('\n');

/* 
  The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.
  For example, consider just the first seven characters of FBFBBFFRLR:
  Start by considering the whole range, rows 0 through 127.
  F means to take the lower half, keeping rows 0 through 63.
  B means to take the upper half, keeping rows 32 through 63.
  F means to take the lower half, keeping rows 32 through 47.
  B means to take the upper half, keeping rows 40 through 47.
  B keeps rows 44 through 47.
  F keeps rows 44 through 45.
  The final F keeps the lower of the two, row 44.
  The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.
  For example, consider just the last 3 characters of FBFBBFFRLR:
  Start by considering the whole range, columns 0 through 7.
  R means to take the upper half, keeping columns 4 through 7.
  L means to take the lower half, keeping columns 4 through 5.
  The final R keeps the upper of the two, column 5.
  So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.
  Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.
  return the highest seat ID
*/

let allIDs = [];

for (pass of passes) {
  let low = 0;
  let high = 127;
  let left = 0;
  let right = 7;
  let row;
  let seat;

  for (let i = 0; i < pass.length; i++) {
    switch (pass[i]) {
      case 'F':
        high = Math.floor((high - low) / 2 + low);
        break;
      case 'B':
        low = Math.round((high - low) / 2 + low);
        break;
      case 'L':
        right = Math.floor((right - left) / 2 + left);
        break;
      case 'R':
        left = Math.round((right - left) / 2 + left);
        break;
      default:
        console.log('oops');
    }
    row = pass[6] == 'F' ? low : high;
    seat = pass[9] == 'L' ? left : right;
  }

  let id = row * 8 + seat;

  allIDs.push(id);
}

let sortedIDs = allIDs.sort((a, b) => a - b);

let prevID = sortedIDs[0];
let missingID = 0;

for (let i = 1; i < sortedIDs.length; i++) {
  if (sortedIDs[i] !== prevID + 1) {
    missingID = sortedIDs[i] - 1;
    break;
  } else {
    prevID = sortedIDs[i];
  }
}

console.log('highestID: ', sortedIDs[sortedIDs.length - 1]);
console.log('my pass ID: ', missingID);
