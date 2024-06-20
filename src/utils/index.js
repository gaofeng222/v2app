export * from "./validate";

function Person(name, books) {
  this.name = name;
  this.books = books;
}

Person.prototype = {
  getBooks: function () {
    return this.books;
  },
  getName() {
    return this.name;
  },
};

export const person = new Person("John", ["book1", "book2"]);
