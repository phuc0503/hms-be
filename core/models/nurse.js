const { db, admin } = require('../config/firebase');
const Staff = require('./staff');
const { doc } = require('firebase/firestore');
const { formatDate } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');

class Nurse extends Staff {
    #patientsUnder = [];
    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, age, absence) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, age, absence);
    }

    getAllNurse = async (limit, page) => {
        try {
            const offset = (page - 1) * limit;
            const nursesArray = [];
            const nursesRef = admin.firestore().collection('staff').where('role', '==', 'nurse').orderBy('lastName', 'asc');
            const countAll = await nursesRef.count().get();
            const snapshot = await nursesRef.limit(limit).offset(offset).get();
            snapshot.forEach(doc => {
                nursesArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
                    age: doc.data().age,
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    salary: doc.data().salary,
                    absence: doc.data().absence
                })
            })
            const data = {
                'nurses': nursesArray,
                'current_nurse': offset + nursesArray.length,
                'total_nurse': countAll.data().count,
                'total_page': Math.ceil(countAll.data().count / limit)
            }
            return data
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
                dateOfBirth: formatDate(doc.data().dateOfBirth),
                age: nur.data().age,
                gender: nur.data().gender,
                phoneNumber: nur.data().phoneNumber,
                salary: nur.data().salary,
                absence: doc.data().absence
                // specialty: nur.data().specialty
            };
        } catch (error) {
            return error.message;
        }
    }

    createNurse = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, absence) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                age: age,
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
                gender: gender,
                phoneNumber: phoneNumber,
                salary: salary,
                role: 'nurse',
                absence: false
                // specialty: specialty
            });

            return res;
        } catch (error) {
            return error.message;
        }
    }

    updateNurse = async (nurse_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, specialty, salary) => {
        try {
            const nurseRef = db.collection('staff').doc(nurse_id);
            const res = await nurseRef.update({
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
                role: 'nurse',
                salary: salary
            })
            return res;
        } catch (error) {
            return error.message;
        }
    }

    deleteNurse = async (nurse_id) => {
        try {
            const res = await db.collection('staff').doc(nurse_id).delete();
            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Nurse;