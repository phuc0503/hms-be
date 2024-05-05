const { db, admin } = require("../config/firebase");
const { formatDateTime, transformDateTimeFormat } = require('../public/formatDate');
const { Timestamp } = require("firebase-admin/firestore");
const Doctor = require("../models/doctor");
const { toNum } = require('../public/department');
const doctorInstance = new Doctor();
class Appointment {
  #id;
  #appointmentTime;
  #doctorID;
  #patientID;
  #result;
  #roomID;

  constructor(id, appointmentTime, doctorID, patientID, result, roomID) {
    this.#id = id;
    this.#appointmentTime = appointmentTime;
    this.#doctorID = doctorID;
    this.#patientID = patientID;
    this.#result = result;
    this.#roomID = roomID;
  }

  getAll = async (pageSize, currentPage) => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const appointmentsArray = [];
      const appointmentsRef = admin.firestore().collection('appointments').orderBy("appointmentTime", "asc");
      const countAll = await appointmentsRef.count().get();
      const appointmentsSnapshot = await appointmentsRef.limit(pageSize).offset(offset).get();

      appointmentsSnapshot.forEach(doc => {
        appointmentsArray.push({
          id: doc.id,
          appointmentTime: formatDateTime(doc.data().appointmentTime),
          department: doc.data().department,
          doctorID: doc.data().doctorID,
          patientID: doc.data().patientID,
          result: doc.data().result,
          roomID: doc.data().roomID
        })
      })
      const data = {
        'appointments': appointmentsArray,
        'pageSize': pageSize,
        'currentPage': currentPage,
        'totalPage': Math.ceil(countAll.data().count / pageSize),
        'totalRow': countAll.data().count
      }
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

  getById = async (appointmentId) => {
    try {
      const appointmentRef = db.collection('appointments').doc(appointmentId);
      const doc = await appointmentRef.get();

      if (!doc.exists) {
        return {
          success: false,
          message: "Maybe wrong id"
        };
      }

      const data = {
        id: doc.id,
        appointmentTime: formatDateTime(doc.data().appointmentTime),
        doctorID: doc.data().doctorID,
        patientID: doc.data().patientID,
        result: doc.data().result,
        roomID: doc.data().roomID
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

  getByDepartment = async (department, pageSize, currentPage) => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const appointmentsArray = [];
      const appointmentRef = admin.firestore().collection('appointments').where('department', '==', department).orderBy("appointmentTime", "asc");
      const countAll = await appointmentRef.count().get();
      const snapshot = await appointmentRef.limit(pageSize).offset(offset).get();
      snapshot.forEach(doc => {
        appointmentsArray.push({
          id: doc.id,
          appointmentTime: formatDateTime(doc.data().appointmentTime),
          department: doc.data().department,
          doctorID: doc.data().doctorID,
          patientID: doc.data().patientID,
          result: doc.data().result,
          roomID: doc.data().roomID
        })
      })
      const data = {
        'appointments': appointmentsArray,
        'pageSize': pageSize,
        'currentPage': currentPage,
        'totalPage': Math.ceil(countAll.data().count / pageSize),
        'totalRow': countAll.data().count
      }
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
  }

  create = async (patientID, doctorID, result, appointmentTime, roomID) => {
    try {
      const res = await db.collection('appointments').add({
        appointmentTime: Timestamp.fromDate(new Date(transformDateTimeFormat(appointmentTime))),
        doctorID: doctorID,
        patientID: patientID,
        result: result,
        roomID: roomID
      });
      const doctor = await doctorInstance.getById(doctorID);

      await db.collection('patients').doc(patientID).update({
        department: doctor.message.department,
        doctorResponsibility: doctorID
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
  }

  update = async (appointment_id, patientID, doctorID, result, appointmentTime, roomID) => {
    try {
      const appointmentRef = db.collection('appointments').doc(appointment_id);
      const res = await appointmentRef.update({
        appointmentTime: Timestamp.fromDate(new Date(transformDateTimeFormat(appointmentTime))),
        doctorID: doctorID,
        patientID: patientID,
        result: result,
        roomID: roomID
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
  }

  delete = async (appointment_id) => {
    try {
      const res = await db.collection('appointments').doc(appointment_id).delete();
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
  }

  countByDepartment = async () => {
    try {
      const departmentArray = [0, 0, 0, 0, 0];
      const appointmentRef = db.collection('appointments');
      const snapshot = await appointmentRef.get();
      snapshot.forEach(doc => {
        let department = toNum(doc.data().department);
        departmentArray[department]++;
      })
      const data = {
        departments: [
          {
            name: "Khoa nội",
            total: departmentArray[0]
          },
          {
            name: "Khoa ngoại",
            total: departmentArray[1]
          },
          {
            name: "Khoa nhi",
            total: departmentArray[2]
          },
          {
            name: "Khoa sản",
            total: departmentArray[3]
          },
          {
            name: "Khoa mắt",
            total: departmentArray[4]
          }
        ]
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
  }
}

module.exports = Appointment;
