import { getStudentsAPI, addStudentAPI } from './api.js';

let localStudent = [];
const studentForm = document.querySelector('#studentForm');
const studentTableBody = document.querySelector('#studentTableBody');

const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#email');

/**
 * Traverses an array of student objects and renders them into the DOM table.
 * Displays "No student records found." if the array is empty.
 */
const renderTable = (dataArray) => {
    studentTableBody.innerHTML = '';

    if (!dataArray || dataArray.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4" style="text-align: center;">No student records found.</td>`;
        studentTableBody.appendChild(emptyRow);
        return;
    }

    dataArray.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.email}</td>
    `;
        studentTableBody.appendChild(row);
    });
};

/**
 * Form submit listener: Captures input values, validates fields,
 * calls addStudentAPI, updates local state, and refreshes the table.
 */
if (studentForm) {
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentData = {
            firstName: firstNameInput ? firstNameInput.value.trim() : '',
            lastName: lastNameInput ? lastNameInput.value.trim() : '',
            email: emailInput ? emailInput.value.trim() : ''
        };

        // Check if any field is empty
        if (!studentData.firstName || !studentData.lastName || !studentData.email) {
            alert('Please fill out all input fields');
            return;
        }

        // Pass data to API function
        const newStudent = addStudentAPI(
            studentData.firstName,
            studentData.lastName,
            studentData.email
        );

        if (!newStudent) {
            alert('This student already exists');
            return;
        }

        renderTable(localStudent);
        studentForm.reset();
    });
}

/**
 * Initializes local state and mounts the initial table render.
 */
const initApp = () => {
    localStudent = getStudentsAPI();
    renderTable(localStudent);
};

// Start the application
initApp();