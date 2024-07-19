const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "=";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }

  // Prints field to console
  print() {
    const fieldString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(fieldString);
  }

  playGame() {
    let gaming = true;
    while (gaming) {
      this.print();
      this.userMovement();
    }
  }

  // Changes user position coordinates based on input
  userMovement() {
    const answer = prompt("Which way? :  ");
    if (answer === "W") {
      this.locationY -= 1;
    } else if (answer === "A") {
      this.locationX -= 1;
    } else if (answer === "S") {
      this.locationY += 1;
    } else if (answer === "D") {
      this.locationX += 1;
    } else {
      console.log("Enter W, A, S or D");
    }
  }
}

const myField = new Field([
  ["*", "=", "O"],
  ["=", "O", "="],
  ["=", "^", "="],
]);
myField.playGame();
