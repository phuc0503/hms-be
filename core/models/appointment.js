const { db } = require("../config/firebase");
const { formatDate, formatDateTime } = require('../public/formatDate');
const { Timestamp } = require("firebase-admin/firestore");
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

  getAllAppointment = async () => {
    try {
      const appointmentsArray = [];
      const appointmentsRef = db.collection('appointments');
      const appointmentsSnapshot = await appointmentsRef.get();

      appointmentsSnapshot.forEach(doc => {
        appointmentsArray.push({
          id: doc.id,
          appointmentTime: formatDateTime(doc.data().appointmentTime),
          doctorID: doc.data().doctorID,
          patientID: doc.data().patientID,
          result: doc.data().result,
          roomID: doc.data().roomID
        })
      })
      return appointmentsArray;
    } catch (err) {
      return err.message;
    }
  };

  getAppointmentById = async (appointmentId) => {
    try {
      const appointmentRef = db.collection('appointments').doc(appointmentId);
      const doc = await appointmentRef.get();

      if (!doc.exists) {
        return "Appointment not found";
      }

      return {
        id: doc.id,
        appointmentTime: formatDateTime(doc.data().appointmentTime),
        doctorID: doc.data().doctorID,
        patientID: doc.data().patientID,
        result: doc.data().result,
        roomID: doc.data().roomID
      };
    } catch (error) {
      return error.message;
    }
  };

  createAppointment = async (patientID, doctorID, result, appointmentTime, roomID) => {
    try {
      const res = await db.collection('appointments').add({
        appointmentTime: Timestamp.fromDate(new Date(appointmentTime)),
        doctorID: doctorID,
        patientID: patientID,
        result: result,
        roomID: roomID
      });
      await db.collection('patients').doc(patientID).update({
        doctorResponbility: doctorID
      });
      return res;
    } catch (error) {
      return error.message;
    }
  }

  updateAppointment = async (appointment_id, patientID, doctorID, result, appointmentTime, roomID) => {
    try {
      const appointmentRef = db.collection('appointments').doc(appointment_id);
      const res = await appointmentRef.update({
        appointmentTime: Timestamp.fromDate(new Date(appointmentTime)),
        doctorID: doctorID,
        patientID: patientID,
        result: result,
        roomID: roomID
      });
      return res;
    } catch (error) {
      return error.message;
    }
  }

  deleteAppointment = async (appointment_id) => {
    try {
      const res = await db.collection('appointments').doc(appointment_id).delete();
      return res;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = Appointment;
