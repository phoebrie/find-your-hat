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
  print() {
    const fieldString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(fieldString);
  }
}

const myField = new Field([
  ["*", "=", "O"],
  ["=", "O", "="],
  ["=", "^", "="],
]);
myField.print();
