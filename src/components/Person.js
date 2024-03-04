import { nanoid } from "nanoid";

export default class Person {
  id = "";
  name = "";
  birth = "";
  death = "";
  parent = "";
  constructor(name, birth, death) {
    this.id = nanoid();
    this.name = name;
    this.birth = birth;
    this.death = death;
  }
  addParent(parent) {
    this.parent = parent;
  }
}
