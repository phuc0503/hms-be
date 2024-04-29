const db = require("../config/firebase");

class Appointment {
  #appointmentId;
  #appointmentTime;
  #doctorID;
  #patientID;
  #result;
  #roomID;

  getAllAppointment = async () => {
    try {
      const appointmentsRef = db.collection("appointments");
      const appointmentsSnapshot = await appointmentsRef.get();

      if (!appointmentsSnapshot.exists) {
        return "Appointments not found";
      }
      const appointmentData = doc.data();
      return {
        appointmentTime: doc.appointmentTime,
        doctorID: doc.doctorID,
        patientID: doc.patientID,
        result: doc.result,
        roomID: doc.roomID,
      };
    } catch (err) {
      return err.message;
    }
  };

  getAppointmentById = async (appointmentId) => {
    try {
      const appointmentRef = db.collection("appointments").doc(appointmentId);
      const doc = await appointmentRef.get();

      if (!doc.exists) {
        return "Appointment not found";
      }

      const appointmentData = doc.data();
      return {
        appointmentTime: doc.appointmentTime,
        doctorID: doc.doctorID,
        patientID: doc.patientID,
        result: doc.result,
        roomID: doc.roomID,
      };
    } catch (error) {
      return error.message;
    }
  };
}

module.exports = Appointment;
