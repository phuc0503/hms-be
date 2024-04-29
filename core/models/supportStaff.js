const { json } = require('express');
const db = require('../config/firebase');
const Staff = require('./staff');
const { doc } = require('firebase/firestore');

class SupportStaff extends Staff {
    #specialty;

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary);
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
            const sup = await supportStaffRef.get();

            if (!sup.exists) {
                return "Support staff not found";
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
                role: 'doctor',
                specialty: specialty,
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    // getDoctorPatients = async (doctor_id) => {
    //     try {
    //         const patientsArray = [];
    //         const patientsRef = db.collection('patients');
    //         const snapshot = await patientsRef.where('doctorResponbility', '==', doctor_id).get();
    //         snapshot.forEach(doc => {
    //             patientsArray.push({
    //                 id: doc.id,
    //                 firstName: doc.data().firstName,
    //                 lastName: doc.data().lastName,
    //                 age: doc.data().age,
    //                 gender: doc.data().gender,
    //                 phoneNumber: doc.data().phoneNumber,
    //                 dateOfBirth: doc.data().dateOfBirth,
    //                 healthInsurance: doc.data().healthInsurance
    //             })
    //         })
    //         return patientsArray;
    //     } catch (error) {
    //         return error.message;
    //     }
    // }

    // updateDoctor = async (doctor_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, specialty, salary) => {
    //     try {
    //         const doctorRef = db.collection('staff').doc(doctor_id);
    //         const res = await doctorRef.update({
    //             firstName: firstName,
    //             lastName: lastName,
    //             age: age,
    //             gender: gender,
    //             phoneNumber: phoneNumber,
    //             dateOfBirth: dateOfBirth,
    //             role: 'doctor',
    //             specialty: specialty,
    //             salary: salary
    //         })
    //         return res;
    //     } catch (error) {
    //         return error.message;
    //     }
    // }
}

module.exports = SupportStaff;