const { db, admin } = require("../config/firebase");
const { formatDate } = require("../public/formatDate");
const Doctor = require("../models/doctor");
const { Timestamp } = require("firebase-admin/firestore");
const { toNum } = require("../public/department");
const doctorInstance = new Doctor();

class Patient {
  #id;
  #lastName;
  #age;
  #gender;
  #healthInsurance;
  #department;
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
    department,
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
    this.#department = department;
    this.#doctorResponbility = doctorResponbility;
    this.#dateOfBirth = dateOfBirth;
  }

  getAllPatient = async (limit, page) => {
    try {
      const offset = (page - 1) * limit;
      const patientsArray = [];
      const patientsRef = admin.firestore().collection("patients").orderBy('firstName', 'asc');
      const countAll = await patientsRef.count().get();
      const snapshot = await patientsRef.limit(limit).offset(offset).get();
      snapshot.forEach((doc) => {
        patientsArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          age: doc.data().age,
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
          healthInsurance: doc.data().healthInsurance,
          department: doc.data().department,
          doctorResponbility: doc.data().doctorResponbility,
          dateOfBirth: formatDate(doc.data().dateOfBirth),
        });
      });
      const data = {
        'patients': patientsArray,
        'current_patient': offset + patientsArray.length,
        'total_patient': countAll.data().count,
        'total_page': Math.ceil(countAll.data().count / limit)
      }
      return data;
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
        department: patientData.department,
        doctorResponbility: patientData.doctorResponbility,
        dateOfBirth: formatDate(patientData.dateOfBirth),
      };
    } catch (error) {
      return error.message;
    }
  };

  getMedicalRecords = async (patientId, limit, page) => {
    try {
      const offset = (page - 1) * limit;
      const appointmentsArray = [];
      const patientsRef = admin
        .firestore()
        .collection("appointments")
        .where("patientID", "==", patientId)
        .orderBy('appointmentTime', 'asc');
      const countAll = await patientsRef
        .count()
        .get();
      const snapshot = await patientsRef
        .limit(limit)
        .offset(offset)
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
      const data = {
        'appointments': appointmentsArray,
        'current_appointment': offset + appointmentsArray.length,
        'total_appointment': countAll.data().count,
        'total_page': Math.ceil(countAll.data().count / limit)
      }
      return data;
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
    department,
    doctorResponbility
  ) => {
    try {
      const res = await db.collection("patients").add({
        firstName: firstName,
        lastName: lastName,
        age: age,
        dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
        gender: gender,
        phoneNumber: phoneNumber,
        healthInsurance: healthInsurance,
        department: department,
        doctorResponbility: doctorResponbility,
      });
      return res;
    } catch (error) {
      return error.message;
    }
  };

  updatePatient = async (
    patient_id,
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    dateOfBirth,
    healthInsurance,
    department,
    doctorResponbility
  ) => {
    try {
      const patientRef = db.collection("patients").doc(patient_id);
      const res = await patientRef.update({
        firstName: firstName,
        lastName: lastName,
        age: age,
        dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
        gender: gender,
        phoneNumber: phoneNumber,
        healthInsurance: healthInsurance,
        department: department,
        doctorResponbility: doctorResponbility,
      });
      return res;
    } catch (error) {
      return error.message;
    }
  };

  deletePatient = async (patient_id) => {
    try {
      const res = await db.collection("patients").doc(patient_id).delete();
      return res;
    } catch (error) {
      return error.message;
    }
  };

  getPatientByDepartment = async (department, limit, page) => {
    try {
      const offset = (page - 1) * limit;
      const patientsArray = [];
      const patientRef = admin.firestore().collection("patients").where("department", "==", department).orderBy('firstName', 'asc');
      const countAll = await patientRef.count().get();
      const snapshot = await patientRef.limit(limit).offset(offset).get();
      snapshot.forEach((doc) => {
        patientsArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          dateOfBirth: formatDate(doc.data().dateOfBirth),
          age: doc.data().age,
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
          healthInsurance: doc.data().healthInsurance,
          department: doc.data().department,
          doctorResponbility: doc.data().doctorResponbility,
        });
      });
      const data = {
        'patients': patientsArray,
        'current_patient': offset + patientsArray.length,
        'total_patient': countAll.data().count,
        'total_page': Math.ceil(countAll.data().count / limit)
      }
      return data;
    } catch (error) {
      return error.message;
    }
  };

  countPatientByDepartment = async () => {
    try {
      const departmentArray = [0, 0, 0, 0, 0];
      const doctorsRef = db.collection("patients");
      const snapshot = await doctorsRef.get();
      snapshot.forEach((doc) => {
        let department = toNum(doc.data().department);
        departmentArray[department]++;
      });
      const data = {
        departments: [
          {
            name: "Khoa nội",
            total: departmentArray[0],
          },
          {
            name: "Khoa ngoại",
            total: departmentArray[1],
          },
          {
            name: "Khoa nhi",
            total: departmentArray[2],
          },
          {
            name: "Khoa sản",
            total: departmentArray[3],
          },
          {
            name: "Khoa mắt",
            total: departmentArray[4],
          },
        ],
      };
      return data;
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = Patient;
