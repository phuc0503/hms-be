const db = require("../config/firebase");
const Appointment = require("../models/appointment");

class Patient {
  #medicalRecord;
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
    medicalRecord,
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
    this.#medicalRecord = medicalRecord;
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
          dateOfBirth: doc.data().dateOfBirth,
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
        dateOfBirth: patientData.dateOfBirth,
      };
    } catch (error) {
      return error.message;
    }
  };

  getMedicalRecord = async (patientId) => {
    try {
      const patientRef = db.collection("patients").doc(patientId);
      const patientSnapshot = await patientRef.get();

      if (!patientSnapshot.exists) {
        return "Patient not found";
      }

      const medicalRecordRef = patientRef.collection("medicalRecord");
      const medicalRecordSnapshot = await medicalRecordRef.get();

      const appointmentsArray = [];

      medicalRecordSnapshot.forEach((doc) => {
        appointmentsArray.push({
          appointmentId: doc.id,
          appointmentTime: doc.data().appointmentTime,
          doctorID: doc.data().doctorID,
          patientID: doc.data().patientID,
          result: doc.data().result,
          roomID: doc.data().roomID,
        });
      });

      return appointmentsArray;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = Patient;
