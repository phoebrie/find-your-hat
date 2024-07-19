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
      if (!this.inFieldBounds()) {
        console.log("You've left the field!");
        gaming = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hole) {
        console.log("You fell down a hole!");
        gaming = false;
        break;
      } else if (this.field[this.locationY][this.locationX] === hat) {
        console.log("You found the hat!");
        gaming = false;
        break;
      }
      // update user position
      this.field[this.locationY][this.locationX] = pathCharacter;
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

  // defines whether the user is in the field
  inFieldBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }
}

const myField = new Field([
  ["*", "=", "O"],
  ["=", "O", "="],
  ["=", "^", "="],
]);
myField.playGame();
