const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to mongodb
mongoose.connect(
  "mongodg+srv://berry:berry3010@cluster0.6yzyd.mongodb.net/employee?retywrites=true&w=majority"                                                                                                                         
);

//data schema
const employeeSchema = {
    name:String,
    BirthDate:String,
    Gender:CharacterData,
    salary:String,
};    

//data model
const Employee = mongoose.model("Employee", employeeSchema); 

//read route
app.get("/employees", (req, res) => {
    Employee.find()
    .then((employees) => res.json(employee))
    .catch((err) => res.status(400).json("Error: " + err));
});

//create route
app.post("/newemployee", (req,res) => {
    const newEmployee = new Employee({
            fullname: req.body.fullname,
            BirthDate: req.body.BirthDate,
            gender: req.body.gender,
            salary: req.body.salary,
    });

    newEmployee
      .save()
      .then((employee) => console.log(employee))
      .catch((err) => res.status(400).json("Error " + err));
}); 

//delete route
app.delete("/delete/:id", (req, res) => {
   const id = req.params.id;

   Employee.findByIdAndDelete({_id: id }, (req, res, err) => {
       if(!err) {
           console.log("Employee deleted");
       } else {
        console.log(err);  
       }
  });
});          

//update route
app.put("/put/:id", (req, res) => {
    const updatedEmployee = {
        fullname: req.body.fullname,
        BirthDate: req.body.BirthDate,
        gender: req.body.gender,
        salary: req.body.salary
    }

  Employee.findByIdAndUpdate(
      {_id: req.params.id },
      {$set: updatedEmployee},
      (req, res, err) => {
          if (!err) {
            console.log("Employee updated");
          } else {
            console.log(err);
          }
        }
      );  
   });
app.listen(port, function () {
    console.log("Express is running");
});
