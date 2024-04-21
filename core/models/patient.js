const db = require("../config/firebase");
const Staff = require("./staff");

class Patient {
  #medical_record = [];
  #id;
  #lastName;
  #age;
  #gender;
  #healthInsurance;
  #doctorResponbility;
  #dateOfBirth;
  #phoneNumber;
  #firstName;

  constructor(
    id,
    firstName,
    lastName,
    age,
    gender,
    healthInsurance,
    doctorResponbility,
    dateOfBirth,
    phoneNumber
  ) {
    this.#id = id;
    // this.#medical_record = medical_record;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
    this.#gender = gender;
    this.#phoneNumber = phoneNumber;
    this.#healthInsurance = healthInsurance;
    this.#doctorResponbility = doctorResponbility;
    this.#dateOfBirth = dateOfBirth;
  }

  getAllPatient = async () => {
    try {
      const patientsArray = [];
      const patientsRef = db.collection("patients");
      const snapshot = await patientsRef.get();
      snapshot.forEach((doc) => {
        patientsArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          age: doc.data().age,
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
          healthInsurance: doc.data().healthInsurance,
          doctorResponbility: doc.data().doctorResponbility,
          dateOfBirth: doc.data().dateOfBirth,
        });
      });
      return patientsArray;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = Patient;
