const db = require("../config/firebase");

class Appointment {
  #appointmentId;
  #appointmentTime;
  #doctorID;
  #patientID;
  #result;
  #roomID;

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
