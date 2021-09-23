import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [employee, setEmployees] = useState([{
    fullname: "",
    birthdate: "",
    gender: "",
    salary: "",
  },
  ]);
  const [employees, setEmployee] = useState([
  {
    fullname: "",
    birthdate: "",
    gender: "",
    salary: "",
    _id:"",
  },
]);

  const [isPut, setIsPut] = useState(false);
  const [setUpdatedEmployee,updatedEmployee] = useState({
    fullname: "",
    birthdate: "",
    gender: "",
    salary: "",
    _id: "",
  });

  useEffect(() => {
    fetch("/employees")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
      .then(jsonRes => setEmployees(jsonRes))
      .catch(err => console.log(err));
  }, [employees]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEmployee((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addEmployee(event) {
    event.preventDefault();
    const newEmployee = {
      fullname: employee.fullname,
      birthdate: employee.birthdate,
      gender: employee.gender,
      salary: employee.salary,
    };

    axios.post("/newemployee", newEmployee);
    console.log(newEmployee);
    alert('employee added');

    setEmployee({
      fullname: "",
      birthdate: "",
      gender: "",
      salary: "",
    });
  }
  function deleteEmployee(id) {
    axios.delete('/delete/' + id);
    alert("employee deleted");
    console.log('Deleted empolyee with id ${id}');
  }
  function openUpdate(id) {
    setIsPut(true);
    setUpdatedEmployee(prevInput => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateEmployee(id) {
    axios.put("/put/" + id, updateEmployee);
    alert("employee updated");
    console.log('employee with id $(id) updated');
  }
  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedEmployee(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
    console.log(updatedEmployee);
  }
  return (
    <div className="App">
      {!isPut ?(
      <div className="main">
          <input
            onChange={handleChange}
            name="fullname"
            value={setEmployees.fullname}
            placeholder="please enter your name"
          ></input>
          <input
            onChange={handleChange}
            name="birthdate"
            value={setEmployees.birthdate}
            placeholder="please enter your birth date"
          ></input>
          <input
            onChange={handleChange}
            name="gender"
            value={setEmployees.gender}
            placeholder="please enter your gender"
          ></input>
          <input
            onChange={handleChange}
            name="salary"
            value={setEmployees.salary}
            placeholder="please enter your salary"
          ></input>
          <button onClick={addEmployee}>Add employee</button>
        </div>) : (
        <div className="main">
            <input
              onChange={handleUpdate}
              name="fullname"
              value={updateEmployee.fullname}
              placeholder="please enter your name"
            ></input>
            <input
              onChange={handleUpdate}
              name="birthdate"
              value={updateEmployee.birthdate}
              placeholder="please enter your birth date"
            ></input>
            <input
              onChange={handleUpdate}
              name="gender"
              value={updateEmployee.gender}
              placeholder="please enter your gender"
            ></input>
            <input
              onChange={handleUpdate}
              name="salary"
              value={updateEmployee.salary}
              placeholder="please enter your salary"
            ></input>
            <button onClick={() => updateEmployee(updatedEmployee.id)}>UPDATE employee</button>
          </div>
        )}
      {employees.map((employee) => {
        return (
          <div
            key={employee.id}
            style={{ background: "black", width: "40%", margin: "auto auto" }}
          >
            <p>{employee.fullname}</p>
            <p>{employee.birthdate}</p>
            <p>{employee.gender}</p>
            <p>{employee.salary}</p>
            <button onClick={() => deleteEmployee(employee._id)}>DELETE</button>
            <button onClick={() => openUpdate(employee._id)}>UPDATE</button>
          </div>
        );
      })}
    </div >
  );
}


export default App;
