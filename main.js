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

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.playGame();
