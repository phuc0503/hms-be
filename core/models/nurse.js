const { db, admin } = require("../config/firebase");
const Staff = require("./staff");
const { doc } = require("firebase/firestore");
const { formatDate } = require("../public/formatDate");
const { Timestamp } = require("firebase-admin/firestore");

class Nurse extends Staff {
    #patientsUnder = [];
    constructor(
        id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        salary,
        absence
    ) {
        super(
            id,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            salary,
            absence
        );
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const nursesArray = [];
            const nursesRef = admin
                .firestore()
                .collection("staff")
                .where("role", "==", "nurse")
                .orderBy("lastName", "asc");
            const countAll = await nursesRef.count().get();
            const snapshot = await nursesRef.limit(pageSize).offset(offset).get();
            snapshot.forEach((doc) => {
                nursesArray.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    dateOfBirth: formatDate(doc.data().dateOfBirth),
                    gender: doc.data().gender,
                    phoneNumber: doc.data().phoneNumber,
                    salary: doc.data().salary,
                    absence: doc.data().absence,
                });
            });
            const data = {
                nurses: nursesArray,
                pageSize: pageSize,
                currentPage: currentPage,
                totalPage: Math.ceil(countAll.data().count / pageSize),
                totalRow: countAll.data().count,
            };
            return {
                success: true,
                message: data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    };

    getById = async (nurse_id) => {
        try {
            const nurseRef = db.collection("staff").doc(nurse_id);
            const nur = await nurseRef.get();

            if (!nur.exists) {
                return {
                    success: false,
                    message: "Maybe wrong id",
                };
            }

            const data = {
                id: nur.id,
                firstName: nur.data().firstName,
                lastName: nur.data().lastName,
                dateOfBirth: formatDate(nur.data().dateOfBirth),
                gender: nur.data().gender,
                phoneNumber: nur.data().phoneNumber,
                salary: nur.data().salary,
                absence: nur.data().absence
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
    }

    create = async (firstName, lastName, dateOfBirth, gender, phoneNumber, salary, absence) => {
        try {
            const res = await db.collection('staff').add({
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
                gender: gender,
                phoneNumber: phoneNumber,
                salary: parseInt(salary),
                role: 'nurse',
                absence: false
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

    update = async (nurse_id, firstName, lastName, gender, phoneNumber, dateOfBirth, salary, absence) => {
        try {
            const nurseRef = db.collection('staff').doc(nurse_id);
            const res = await nurseRef.update({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                dateOfBirth: Timestamp.fromDate(new Date(dateOfBirth)),
                role: 'nurse',
                salary: parseInt(salary),
                absence: absence === "true"
            })
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
};

delete = async (nurse_id) => {
    try {
        const res = await db.collection("staff").doc(nurse_id).delete();
        return {
            success: true,
            message: res,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
}

module.exports = Nurse;
