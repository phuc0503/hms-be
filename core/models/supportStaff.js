const { db, admin } = require('../config/firebase');
const Staff = require('./staff');
const { doc } = require('firebase/firestore');
const { formatDate, transformDateFormat } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');

class SupportStaff extends Staff {
    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, absence) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, absence);
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const supportStaffArray = [];
            const supportStaffRef = admin.firestore().collection('staff').where('role', '==', 'support staff').orderBy('firstName', 'asc');
            const countAll = await supportStaffRef.count().get();
            const snapshot = await supportStaffRef.limit(pageSize).offset(offset).get();
            snapshot.forEach(doc => {
                supportStaffArray.push({
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
                'supportStaff': supportStaffArray,
                'pageSize': pageSize,
                'currentPage': currentPage,
                'totalPage': Math.ceil(countAll.data().count / pageSize)
            }
            return data;
        } catch (error) {
            return error.message;
        }
    }

    getById = async (supportStaff_id) => {
        try {
            const supportStaffRef = db.collection("staff").doc(supportStaff_id);
            const sup = await supportStaffRef.get();

            if (!sup.exists) {
                return "Support staff not found";
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
                absence: doc.data().absence
            };
        } catch (error) {
            return error.message;
        }
    }

    create = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, absence) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                age: age,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                gender: gender,
                phoneNumber: phoneNumber,
                salary: salary,
                role: 'support staff',
                absence: false
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    update = async (supportStaff_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, salary, absence) => {
        try {
            const supportStaffRef = db.collection('staff').doc(supportStaff_id);
            const res = await supportStaffRef.update({
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                role: 'support staff',
                salary: salary,
                absence: absence
            })
            return res;
        } catch (error) {
            return error.message;
        }
    }

    delete = async (supportStaff_id) => {
        try {
            const res = await db.collection('staff').doc(supportStaff_id).delete();
            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = SupportStaff;