const { db } = require('../config/firebase');
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

    getAllStaff = async () => {
        try {
            const staffsArray = [];
            const staffsRef = db.collection('staff');
            const snapshot = await staffsRef.get();
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
            return staffsArray
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Staff;