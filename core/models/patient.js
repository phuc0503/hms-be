const { db, admin } = require("../config/firebase");
const { formatDate, transformDateFormat } = require("../public/formatDate");
const Doctor = require("../models/doctor");
const { Timestamp } = require("firebase-admin/firestore");
const { toNum } = require("../public/department");
const doctorInstance = new Doctor();

class Patient {
  #id;
  #lastName;
  #gender;
  #healthInsurance;
  #department;
  #doctorResponsibility;
  #dateOfBirth;
  #phoneNumber;
  #firstName;

  constructor(
    id,
    firstName,
    lastName,
    gender,
    healthInsurance,
    department,
    doctorResponsibility,
    dateOfBirth,
    phoneNumber
  ) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#gender = gender;
    this.#phoneNumber = phoneNumber;
    this.#healthInsurance = healthInsurance;
    this.#department = department;
    this.#doctorResponsibility = doctorResponsibility;
    this.#dateOfBirth = dateOfBirth;
  }

  getAll = async (pageSize, currentPage) => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const patientsArray = [];
      const patientsRef = admin
        .firestore()
        .collection("patients")
        .orderBy("firstName", "asc");
      const countAll = await patientsRef.count().get();
      const snapshot = await patientsRef.limit(pageSize).offset(offset).get();
      snapshot.forEach((doc) => {
        patientsArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
          healthInsurance: doc.data().healthInsurance,
          department: doc.data().department,
          doctorResponsibility: doc.data().doctorResponsibility,
          dateOfBirth: formatDate(doc.data().dateOfBirth),
        });
      });
      const data = {
        patients: patientsArray,
        pageSize: pageSize,
        currentPage: currentPage,
        totalPage: Math.ceil(countAll.data().count / pageSize),
      };
      return {
        success: true,
        message: data
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  };

  getById = async (patientId) => {
    try {
      const patientRef = db.collection("patients").doc(patientId);
      const doc = await patientRef.get();

      if (!doc.exists) {
        return {
          success: false,
          message: "Maybe wrong id"
        };
      }

      const patientData = doc.data();
      const data = {
        id: doc.id,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        gender: patientData.gender,
        phoneNumber: patientData.phoneNumber,
        healthInsurance: patientData.healthInsurance,
        department: patientData.department,
        doctorResponsibility: patientData.doctorResponsibility,
        dateOfBirth: formatDate(patientData.dateOfBirth),
      };
      return {
        success: true,
        message: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };

  getMedicalRecords = async (patientId, pageSize, currentPage) => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const appointmentsArray = [];
      const patientsRef = admin
        .firestore()
        .collection("appointments")
        .where("patientID", "==", patientId)
        .orderBy("appointmentTime", "asc");
      const countAll = await patientsRef.count().get();
      const snapshot = await patientsRef.limit(pageSize).offset(offset).get();
      const promises = snapshot.docs.map(async (doc) => {
        const doctorData = await doctorInstance.getById(doc.data().doctorID);

        appointmentsArray.push({
          appointmentId: doc.id,
          appointmentTime: formatDate(doc.data().appointmentTime),
          doctor: doctorData.message.lastName + " " + doctorData.message.firstName,
          result: doc.data().result,
          roomID: doc.data().roomID,
        });
      });

      await Promise.all(promises);
      const data = {
        appointments: appointmentsArray,
        pageSize: pageSize,
        currentPage: currentPage,
        totalPage: Math.ceil(countAll.data().count / pageSize),
      };
      return {
        success: true,
        message: data
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  };

  create = async (
    firstName,
    lastName,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
    department,
    doctorResponsibility
  ) => {
    try {
      const res = await db.collection("patients").add({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: Timestamp.fromDate(
          new Date(transformDateFormat(dateOfBirth))
        ),
        gender: gender,
        phoneNumber: phoneNumber,
        healthInsurance: healthInsurance === "true",
        department: department,
        doctorResponsibility: doctorResponsibility,
      });
      return {
        success: true,
        message: res
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  };

  update = async (
    patient_id,
    firstName,
    lastName,
    gender,
    phoneNumber,
    dateOfBirth,
    healthInsurance,
    department,
    doctorResponsibility
  ) => {
    try {
      const patientRef = db.collection("patients").doc(patient_id);
      const res = await patientRef.update({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: Timestamp.fromDate(
          new Date(transformDateFormat(dateOfBirth))
        ),
        gender: gender,
        phoneNumber: phoneNumber,
        healthInsurance: healthInsurance === "true",
        department: department,
        doctorResponsibility: doctorResponsibility,
      });
      return {
        success: true,
        message: res
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };

  delete = async (patient_id) => {
    try {
      const res = await db.collection("patients").doc(patient_id).delete();
      return {
        success: true,
        message: res
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };

  getByDepartment = async (department, pageSize, currentPage) => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const patientsArray = [];
      const patientRef = admin
        .firestore()
        .collection("patients")
        .where("department", "==", department)
        .orderBy("firstName", "asc");
      const countAll = await patientRef.count().get();
      const snapshot = await patientRef.limit(pageSize).offset(offset).get();
      snapshot.forEach((doc) => {
        patientsArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          dateOfBirth: formatDate(doc.data().dateOfBirth),
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
          healthInsurance: doc.data().healthInsurance,
          department: doc.data().department,
          doctorResponsibility: doc.data().doctorResponsibility,
        });
      });
      const data = {
        patients: patientsArray,
        pageSize: pageSize,
        currentPage: currentPage,
        totalPage: Math.ceil(countAll.data().count / pageSize),
      };
      return {
        success: true,
        message: data
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  };

  countByDepartment = async () => {
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
      return {
        success: true,
        message: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };
}

module.exports = Patient;
