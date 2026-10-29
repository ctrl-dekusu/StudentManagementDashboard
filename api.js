const mockStudentDb = [
    // {
    //     id: 1793252291199,
    //     firstName: "Dexter",
    //     lastName: "Lauron",
    //     email: "dexterlauron2@gmail.com"
    // },
    // {
    //     id: 1793252291200,
    //     firstName: "Romel",
    //     lastName: "Lauron",
    //     email: "rcogal.lauron@gmail.com"
    // }
]

export function getStudentsAPI() {
    return mockStudentDb;
};

export function addStudentAPI(firstName, lastName, email) {
    const newStudent = { 
        id: Date.now(), 
        firstName, 
        lastName,
        email
    }

    mockStudentDb.push(newStudent);
    return newStudent;
}

// console.log("Initial DB State:", getStudentsAPI());
// console.log();
// console.log("Returned Saved Object:"addStudentAPI("Francis", "Chavez", "chavez@gmail.com"));
// console.log();
// console.log("Updated DB State:", getStudentsAPI());