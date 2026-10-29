import { getStudentsAPI, addStudentAPI } from "./api.js";

// Test cases for exercise 1
console.log("Initial DB State:", getStudentsAPI());
console.log();
console.log("Returned Saved Object:", 
    addStudentAPI("Francis", "Chavez", "chavez@gmail.com")
);
console.log();
console.log("Updated DB State:", getStudentsAPI());