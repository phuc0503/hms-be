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

    getAllStaff = async (limit, page) => {
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
}

module.exports = Staff;