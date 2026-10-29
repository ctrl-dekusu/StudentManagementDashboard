const mockStudentDb = [
    {
        id: 1793252291199,
        firstName: "Dexter",
        lastName: "Lauron",
        email: "dexterlauron2@gmail.com"
    },
    {
        id: 1793252291200,
        firstName: "Romel",
        lastName: "Lauron",
        email: "rcogal.lauron@gmail.com"
    }
]

export function getStudentsAPI() {
    return mockStudentDb;
};

export function addStudentAPI(firstName, lastName, email) {
    const isDuplicate = mockStudentDb.some(
        (student) =>
            student.firstName.toLowerCase() === firstName.toLowerCase() &&
            student.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (isDuplicate) {
        return null;
    }

    const newStudent = { 
        id: Date.now(), 
        firstName, 
        lastName,
        email
    }

    mockStudentDb.push(newStudent);
    return newStudent;
}
