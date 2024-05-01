const { json } = require('express');
const { db } = require('../config/firebase');
const Staff = require('./staff');
const { doc } = require('firebase/firestore');
const { formatDate } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');

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
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
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
                dateOfBirth: formatDate(doc.data().dateOfBirth),
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
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
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

    getDoctorPatients = async (doctor_id) => {
        try {
            const patientsArray = [];
            const patientsRef = db.collection('patients');
            const snapshot = await patientsRef.where('doctorResponbility', '==', doctor_id).get();
            snapshot.forEach(doc => {
                patientsArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
                    healthInsurance: doc.data().healthInsurance
                })
            })
            return patientsArray;
        } catch (error) {
            return error.message;
        }
    }

    updateDoctor = async (doctor_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, specialty, salary) => {
        try {
            const doctorRef = db.collection('staff').doc(doctor_id);
            const res = await doctorRef.update({
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
                role: 'doctor',
                specialty: specialty,
                salary: salary
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    deleteDoctor = async (doctor_id) => {
        try {
            const res = await db.collection('staff').doc(doctor_id).delete();
            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Doctor;