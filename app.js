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

const capitalizeName = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Form submit listener: Captures input values, validates fields,
 * calls addStudentAPI, updates local state, and refreshes the table.
 */
if (studentForm) {
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const inputRegex = /^[^<>]*$/;

        const studentData = {
            firstName: capitalizeName(firstNameInput ? firstNameInput.value.trim() : ''),
            lastName: capitalizeName(lastNameInput ? lastNameInput.value.trim() : ''),
            email: emailInput ? emailInput.value.trim() : ''
        };

        if (!inputRegex.test(studentData.firstName) || 
            !inputRegex.test(studentData.lastName)) {
            alert('"<", ">" is not allowed');
            return;
        }

        // Check if any field is empty
        if (!studentData.firstName || !studentData.lastName || !studentData.email) {
            alert('Please fill out all input fields');
            return;
        }

        // Check if email is valid
        if (!emailRegex.test(studentData.email)) {
            alert('Please enter a valid email address');
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