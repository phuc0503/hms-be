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
    _age;
    _absence;

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, age, absence) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._phoneNumber = phoneNumber;
        this._salary = salary;
        this._age = age;
        this._absence = absence;
    }

    getAll = async (limit, page) => {
        try {
            const offset = (page - 1) * limit;
            const staffsArray = [];
            const staffsRef = admin.firestore().collection('staff').orderBy('firstName', 'asc');
            const countAll = await staffsRef.count().get();
            const snapshot = await staffsRef.limit(limit).offset(offset).get();
            snapshot.forEach(doc => {
                staffsArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
                    age: doc.data().age,
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    role: doc.data().role,
                    salary: doc.data().salary,
                    absence: doc.data().absence
                })
            })
            const data = {
                'staff': staffsArray,
                'current_staff': offset + staffsArray.length,
                'total_staff': countAll.data().count,
                'total_page': Math.ceil(countAll.data().count / limit)
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
                age: doc.data().age,
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

    create = async (firstName, lastName, age, dateOfBirth, gender, phoneNumber, role, salary) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                age: age,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                gender: gender,
                phoneNumber: phoneNumber,
                role: role,
                salary: salary,
                absence: false
            });
            return res;
        } catch (error) {
            return error.message;
        }
    }

    update = async (id, firstName, lastName, age, dateOfBirth, gender, phoneNumber, role, salary, absence) => {
        try {
            const staffRef = db.collection('staff').doc(id);
            const res = await staffRef.update({
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(transformDateFormat(dateOfBirth))),
                role: role,
                salary: salary,
                absence: absence
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