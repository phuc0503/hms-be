const { db, admin } = require("../config/firebase");
const { formatDate, transformDateFormat, dateToFirebaseTimestamp } = require('../public/formatDate');
const { Timestamp } = require("firebase-admin/firestore");

class MaintenanceSchedule {
    #id;
    #equipmentID;
    #maintenanceDate;

    constructor(id, equipmentID, maintenanceDate) {
        this.#id = id;
        this.#equipmentID = equipmentID;
        this.#maintenanceDate = maintenanceDate;
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const maintenanceScheduleArray = [];
            const maintenanceRef = admin.firestore().collection('maintenance schedule').orderBy("maintenanceDate", "asc");
            const countAll = await maintenanceRef.count().get();
            const maintenanceSnapshot = await maintenanceRef.limit(pageSize).offset(offset).get();

            maintenanceSnapshot.forEach(doc => {
                maintenanceScheduleArray.push({
                    id: doc.id,
                    equipmentID: doc.data().equipmentID,
                    maintenanceDate: formatDate(doc.data().maintenanceDate)
                })
            })
            const data = {
                'maintenanceSchedule': maintenanceScheduleArray,
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

    getById = async (maintenance_id) => {
        try {
            const maintenanceRef = db.collection('maintenance schedule').doc(maintenance_id);
            const doc = await maintenanceRef.get();

            if (!doc.exists) {
                return {
                    success: false,
                    message: "Maybe wrong id"
                };
            }

            const data = {
                id: doc.id,
                equipmentID: doc.data().equipmentID,
                maintenanceDate: formatDate(doc.data().maintenanceDate)
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

    create = async (equipmentID, maintenanceDate) => {
        try {
            const check = await db.collection('maintenance schedule').where('equipmentID', '==', equipmentID).where('maintenanceDate', '==', dateToFirebaseTimestamp(maintenanceDate)).limit(1).get();
            if (check.size) {
                return {
                    success: false,
                    message: 'Maintenance date for this equipment already exist'
                };
            }
            const res = await db.collection('maintenance schedule').add({
                equipmentID: equipmentID,
                maintenanceDate: Timestamp.fromDate(new Date(transformDateFormat(maintenanceDate)))

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

    update = async (maintenance_id, equipmentID, maintenanceDate) => {
        try {
            const maintenanceRef = db.collection('maintenance schedule').doc(maintenance_id);
            const res = await maintenanceRef.update({
                equipmentID: equipmentID,
                maintenanceDate: Timestamp.fromDate(new Date(transformDateFormat(maintenanceDate)))
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

    delete = async (maintenance_id) => {
        try {
            const res = await db.collection('maintenance schedule').doc(maintenance_id).delete();
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
}

module.exports = MaintenanceSchedule