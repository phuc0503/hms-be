const { db, admin } = require('../config/firebase');
const { formatDate } = require('../public/formatDate');

class Staff {
    _id;
    _firstName;
    _lastName;
    _dateOfBirth;
    _gender;
    _phoneNumber;
    _salary;
    _absence;

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, absence) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._phoneNumber = phoneNumber;
        this._salary = salary;
        this._absence = absence;
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const staffsArray = [];
            const staffsRef = admin.firestore().collection('staff').orderBy('firstName', 'asc');
            const countAll = await staffsRef.count().get();
            const snapshot = await staffsRef.limit(pageSize).offset(offset).get();
            snapshot.forEach(doc => {
                staffsArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    role: doc.data().role,
                    salary: doc.data().salary,
                    absence: doc.data().absence
                })
            })
            const data = {
                'staff': staffsArray,
                'pageSize': pageSize,
                'currentPage': currentPage,
                'totalPage': Math.ceil(countAll.data().count / pageSize),
                'totalRow': countAll.data().count
            }
            return data;
        } catch (error) {
            return error.message;
        }
    }

    getById = async (id) => {
        try {
            const staffRef = db.collection("staff").doc(id);
            const doc = await staffRef.get();

            if (!doc.exists) {
                return "Staff not found";
            }

            return {
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                dateOfBirth: formatDate(doc.data().dateOfBirth),
                gender: doc.data().gender,
                phoneNumber: doc.data().phoneNumber,
                role: doc.data().role,
                salary: doc.data().salary,
                absence: doc.data().absence
            };
        } catch (error) {
            return error.message;
        }
    }

    create = async (firstName, lastName, dateOfBirth, gender, phoneNumber, role, salary) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                gender: gender,
                phoneNumber: phoneNumber,
                role: role,
                salary: parseInt(salary),
                absence: false
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    update = async (id, firstName, lastName, dateOfBirth, gender, phoneNumber, role, salary, absence) => {
        try {
            const staffRef = db.collection('staff').doc(id);
            const res = await staffRef.update({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                role: role,
                salary: parseInt(salary),
                absence: absence === "true"
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    delete = async (id) => {
        try {
            const res = await db.collection('staff').doc(id).delete();
            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Staff;