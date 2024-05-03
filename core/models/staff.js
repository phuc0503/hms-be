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

    // getAllStaff = async (limit, after, before) => {
    //     try {

    //         const staffsArray = [];
    //         let staffsRef = db.collection('staff').orderBy(admin.firestore.FieldPath.documentId());
    //         if (after) {
    //             staffsRef = staffsRef.startAfter(after).limit(limit);
    //         } else if (before) {
    //             staffsRef = staffsRef.endBefore(before).limitToLast(limit);
    //         } else {
    //             staffsRef = staffsRef.limit(limit)
    //         }
    //         const snapshot = await staffsRef.get();
    //         snapshot.forEach(doc => {
    //             staffsArray.push({
    //                 id: doc.id,
    //                 firstName: doc.data().firstName,
    //                 lastName: doc.data().lastName,
    //                 dateOfBirth: formatDate(doc.data().dateOfBirth),
    //                 age: doc.data().age,
    //                 gender: doc.data().gender,
    //                 phoneNumber: doc.data().phoneNumber,
    //                 role: doc.data().role,
    //                 salary: doc.data().salary,
    //             })
    //         })
    //         console.log(staffsArray[0]);
    //         console.log(staffsArray[staffsArray.length - 1]);
    //         const prevSnapshot = await db.collection('staff').orderBy(admin.firestore.FieldPath.documentId()).endBefore(staffsArray[0].id).get();
    //         const nextSnapshot = await db.collection('staff').orderBy(admin.firestore.FieldPath.documentId()).startAfter(staffsArray[staffsArray.length - 1].id).get();
    //         console.log({
    //             'prevPage': prevSnapshot.size,
    //             'nextPage': nextSnapshot.size
    //         })
    //         const data = {
    //             'staff': staffsArray,
    //             'pagination': {
    //                 'prev': !prevSnapshot.empty ? staffsArray[0].id : null,
    //                 'next': !nextSnapshot.empty ? staffsArray[staffsArray.length - 1].id : null
    //             }
    //         }
    //         // return staffsArray
    //         return data;
    //     } catch (error) {
    //         return error.message;
    //     }
    // }

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