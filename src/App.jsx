import { useState, useEffect } from "react";
import "./App.css";
import FamilyTree from "./components/FamilyTree";
import Create from "./components/Create";
import Person from "./components/Person";

function App() {
  const [people, setPeople] = useState([]);
  const [curPerson, setCurPerson] = useState({
    name: "",
    birth: "",
    death: "",
  });
  const [currentId, setCurrentId] = useState("");

  function handleCreate() {
    let person = new Person(curPerson.name, curPerson.birth, curPerson.death);
    setPeople((prevPeo) => [...prevPeo, person]);
    setCurPerson({
      name: "",
      birth: "",
      death: "",
    });
  }

  function handleSubmit() {
    setPeople((prevPeo) => {
      return prevPeo.map((person) => {
        if (person.id == currentId) {
          return {
            ...person,
            name: curPerson.name,
            birth: curPerson.birth,
            death: curPerson.death,
          };
        } else {
          return person;
        }
      });
    });
  }

  function handleAddChild() {
    let person = new Person(curPerson.name, curPerson.birth, curPerson.death);
    person.addParent(currentId);
    setPeople((prevPeo) => [...prevPeo, person]);
    setCurrentId(person.id);
  }

  function handleAddParent() {
    let person = people.find((person) => person.id === currentId);
    if (person === undefined) return;
    if (person.parent !== "") {
      alert("Already have parent!");
    } else {
      let newParent = new Person(
        curPerson.name,
        curPerson.birth,
        curPerson.death
      );
      person.addParent(newParent.id);
      setPeople((prevPeo) => [...prevPeo, newParent]);
      setCurrentId(newParent.id);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCurPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  }

  function handleChangeSelect(id) {
    setCurrentId(id);
  }

  useEffect(() => {
    setCurPerson(() => {
      let person = people.find((person) => person.id === currentId);
      return {
        name: person ? person.name : "",
        birth: person ? person.birth : "",
        death: person ? person.death : "",
      };
    });
  }, [currentId]);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={curPerson.name}
            onChange={handleChange}
          />
          <label htmlFor="birth">Birth:</label>
          <input
            id="birth"
            type="text"
            name="birth"
            value={curPerson.birth}
            onChange={handleChange}
          />
          <label htmlFor="death">Death:</label>
          <input
            id="death"
            type="text"
            name="death"
            value={curPerson.death}
            onChange={handleChange}
          />
          {currentId !== "" && (
            <button className="operate--button" onClick={handleSubmit}>
              Change Information
            </button>
          )}
          {currentId !== "" && (
            <button className="operate--button" onClick={handleAddChild}>
              Create A Child
            </button>
          )}
          {currentId !== "" && (
            <button className="operate--button" onClick={handleAddParent}>
              Create A parent
            </button>
          )}
        </div>
        <div className="main">
          {people.length ? (
            <FamilyTree people={people} onChangeSelect={handleChangeSelect} />
          ) : (
            <Create onClick={handleCreate} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
