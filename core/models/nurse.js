const { json } = require('express');
const db = require('../config/firebase');
const Staff = require('./staff');

class Nurse extends Staff {
    // #specialty; // private
    #patientsUnder = [];
    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty, age) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, age);
        // this.#specialty = specialty;
    }

    getAllNurse = async () => {
        try {
            const nursesArray = [];
            const nursesRef = db.collection('staff');
            const snapshot = await nursesRef.where('role', '==', 'nurse').get(); // c
            snapshot.forEach(doc => {
                nursesArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    salary: doc.data().salary,
                    // specialty: doc.data().specialty,
                    age: doc.data().age
                })
            })
            return nursesArray
        } catch (error) {
            return error.message;
        }
    }

    getNurseById = async (nurse_id) => {
        try {
            const nurseRef = db.collection("staff").doc(nurse_id);
            const nur = await nurseRef.get();

            if (!nur.exists) {
                return "Nurse not found";
            }

            return {
                id: nur.id,
                firstName: nur.data().firstName,
                lastName: nur.data().lastName,
                age: nur.data().age,
                gender: nur.data().gender,
                phoneNumber: nur.data().phoneNumber,
                salary: nur.data().salary,
                specialty: nur.data().specialty
            };
        } catch (error) {
            return error.message;
        }
    }

    createNurse = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                age: age,
                dateOfBirth: dateOfBirth,
                gender: gender,
                phoneNumber: phoneNumber,
                salary: salary,
                role: 'nurse',
                specialty: specialty
            });

            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Nurse;