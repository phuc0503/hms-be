const { json } = require('express');
const db = require('../config/firebase');
const Staff = require('./staff');

class Doctor extends Staff {
    #specialty;

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary);
        this.#specialty = specialty;
    }

    getAllDoctor = async () => {
        try {
            const doctorsArray = [];
            const doctorsRef = db.collection('staff');
            const snapshot = await doctorsRef.where('role', '==', 'doctor').get();
            snapshot.forEach(doc => {
                doctorsArray.push({
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
            return doctorsArray
        } catch (error) {
            return error.message;
        }
    }

    getDoctorById = async (doctor_id) => {
        try {
            const doctorRef = db.collection("staff").doc(doctor_id);
            const doc = await doctorRef.get();

            if (!doc.exists) {
                return "Doctor not found";
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

    createDoctor = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty) => {
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
}

module.exports = Doctor;