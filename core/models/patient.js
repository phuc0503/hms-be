const db = require("../config/firebase");

const Doctor = require("../models/doctor");
const doctorInstance = new Doctor();

const formatDate = (timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
};

class Patient {
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
          dateOfBirth: formatDate(doc.data().dateOfBirth),
        });
      });
      return patientsArray;
    } catch (error) {
      return error.message;
    }
  };

  getPatientById = async (patientId) => {
    try {
      const patientRef = db.collection("patients").doc(patientId);
      const doc = await patientRef.get();

      if (!doc.exists) {
        return "Patient not found";
      }

      const patientData = doc.data();
      return {
        id: doc.id,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        age: patientData.age,
        gender: patientData.gender,
        phoneNumber: patientData.phoneNumber,
        healthInsurance: patientData.healthInsurance,
        doctorResponbility: patientData.doctorResponbility,
        dateOfBirth: formatDate(patientData.dateOfBirth),
      };
    } catch (error) {
      return error.message;
    }
  };

  getMedicalRecord = async (patientId) => {
    try {
      const appointmentsArray = [];
      const snapshot = await db
        .collection("appointments")
        .where("patientID", "==", patientId)
        .get();

      const promises = snapshot.docs.map(async (doc) => {
        const doctorData = await doctorInstance.getDoctorById(
          doc.data().doctorID
        );

        appointmentsArray.push({
          appointmentId: doc.id,
          appointmentTime: formatDate(doc.data().appointmentTime),
          doctor: doctorData.lastName + " " + doctorData.firstName,
          result: doc.data().result,
          roomID: doc.data().roomID,
        });
      });

      await Promise.all(promises);

      return appointmentsArray;
    } catch (error) {
      return error.message;
    }
  };

  createPatient = async (
    firstName,
    lastName,
    age,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
    doctorResponbility
  ) => {
    try {
      const res = await db.collection("patients").add({
        firstName: firstName,
        lastName: lastName,
        age: age,
        dateOfBirth: dateOfBirth,
        gender: gender,
        phoneNumber: phoneNumber,
        healthInsurance: healthInsurance,
        doctorResponbility: doctorResponbility,
      });
      return res;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = Patient;
