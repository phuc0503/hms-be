const db = require('../config/firebase');
const Staff = require('./staff');

class Doctor extends Staff {
    #specialty;
    #patientsUnder = [];

    constructor(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty) {
        super(id, firstName, lastName, dateOfBirth, gender, phoneNumber, salary);
        this.#specialty = specialty;
    }

    getAllStaff = async () => {
        try {
            const doctorsArray = [];
            const doctorsRef = db.collection('doctor');
            const snapshot = await doctorsRef.get();
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

}

module.exports = Doctor;