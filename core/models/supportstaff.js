const { json } = require('express');
const db = require('../config/firebase');
const Staff = require('./staff');

class SupportStaff extends Staff {
    #specialty;
    #appointments = [];

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty, age) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, age);
        this.#specialty = specialty;
    }

    getAllSupportStaff = async () => {
        try {
            const supportStaffArray = [];
            const supportStaffRef = db.collection('staff');
            const snapshot = await supportStaffRef.where('role', '==', 'supportstaff').get();
            snapshot.forEach(doc => {
                supportStaffArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    salary: doc.data().salary,
                    specialty: doc.data().specialty
                })
            })
            return supportStaffArray
        } catch (error) {
            return error.message;
        }
    }

    getSupportStaffById = async (supportstaff_id) => {
        try {
            const supportStaffRef = db.collection("staff").doc(supportstaff_id);
            const doc = await supportStaffRef.get();

            if (!doc.exists) {
                return "SupportStaff not found";
            }

            return {
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                age: doc.data().age,
                gender: doc.data().gender,
                phoneNumber: doc.data().phoneNumber,
                salary: doc.data().salary,
                specialty: doc.data().specialty
            };
        } catch (error) {
            return error.message;
        }
    }

    createSupportStaff = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                age: age,
                dateOfBirth: dateOfBirth,
                gender: gender,
                phoneNumber: phoneNumber,
                salary: salary,
                role: 'SupportStaff',
                specialty: specialty
            });

            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = SupportStaff;