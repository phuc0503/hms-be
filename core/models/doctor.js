const { json } = require('express');
const { db, admin } = require('../config/firebase');
const Staff = require('./staff');
const { doc, orderBy } = require('firebase/firestore');
const { formatDate } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');
const { toNum } = require('../public/department');
class Doctor extends Staff {
    #department;

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, department) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary);
        this.#department = department;
    }

    getAllDoctor = async (limit, page) => {
        try {
            const offset = (page - 1) * limit;
            const doctorsArray = [];
            const doctorsRef = admin.firestore().collection('staff').where('role', '==', 'doctor').orderBy('lastName', 'asc');
            const countAll = await doctorsRef.count().get();
            const snapshot = await doctorsRef.limit(limit).offset(offset).get();
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
                    department: doc.data().department
                })
            })
            const data = {
                'doctors': doctorsArray,
                'current_doctor': offset + doctorsArray.length,
                'total_doctor': countAll.data().count,
                'total_page': Math.ceil(countAll.data().count / limit)
            }
            return data;
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
                department: doc.data().department
            };
        } catch (error) {
            return error.message;
        }
    }

    getDoctorByDepartment = async (department, limit, page) => {
        try {
            const offset = (page - 1) * limit;
            const doctorsArray = [];
            const doctorsRef = admin.firestore().collection('staff').where('department', '==', department).orderBy('lastName', 'asc');
            const countAll = await doctorsRef.count().get();
            const snapshot = await doctorsRef.limit(limit).offset(offset).get();
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
                    department: doc.data().department
                })
            })
            const data = {
                'doctors': doctorsArray,
                'current_doctor': offset + doctorsArray.length,
                'total_doctor': countAll.data().count,
                'total_page': Math.ceil(countAll.data().count / limit)
            }
            return data;
        } catch (error) {
            return error.message;
        }
    }

    createDoctor = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, department) => {
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
                department: department,
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    getDoctorPatients = async (doctor_id, limit, page) => {
        try {
            const offset = (page - 1) * limit;
            const patientsArray = [];
            const patientsRef = admin.firestore().collection('patients').where('doctorResponbility', '==', doctor_id).orderBy('firstName', 'asc');
            const countAll = await patientsRef.count().get();
            const snapshot = await patientsRef.limit(limit).offset(offset).get();
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
            const data = {
                'patients': patientsArray,
                'current_patient': offset + patientsArray.length,
                'total_patient': countAll.data().count,
                'total_page': Math.ceil(countAll.data().count / limit)
            }
            return data;
        } catch (error) {
            return error.message;
        }
    }

    updateDoctor = async (doctor_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, department, salary) => {
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
                department: department,
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

    countDoctorByDepartment = async () => {
        try {
            const departmentArray = [0, 0, 0, 0, 0];
            const doctorsArray = [];
            const doctorsRef = db.collection('staff');
            const snapshot = await doctorsRef.where('role', '==', 'doctor').get();
            snapshot.forEach(doc => {
                let department = toNum(doc.data().department);
                departmentArray[department]++;
            })
            const data = {
                "departments": [
                    {
                        "name": "Khoa nội",
                        "total": departmentArray[0]
                    },
                    {
                        "name": "Khoa ngoại",
                        "total": departmentArray[1]
                    },
                    {
                        "name": "Khoa nhi",
                        "total": departmentArray[2]
                    },
                    {
                        "name": "Khoa sản",
                        "total": departmentArray[3]
                    },
                    {
                        "name": "Khoa mắt",
                        "total": departmentArray[4]
                    }
                ]
            };
            return data;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Doctor;