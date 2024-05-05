const { db, admin } = require('../config/firebase');
const Resource = require('./resource');
const { formatDate, transformDateFormat } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');

class Equipment extends Resource {
    #availability;
    #condition;

    constructor(id, name, cost, type, availability, condition) {
        super(id, name, cost, type);
        this.#availability = availability;
        this.#condition = condition;
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const equipmentsArray = [];
            const equipmentsRef = admin.firestore().collection('resources').where('type', '==', 'equipment').orderBy('name', 'asc');
            const countAll = await equipmentsRef.count().get();
            const snapshot = await equipmentsRef.limit(pageSize).offset(offset).get();

            snapshot.forEach(doc => {
                equipmentsArray.push({
                    id: doc.id,
                    name: doc.data().name,
                    cost: doc.data().cost,
                    type: doc.data().type,
                    availability: doc.data().availability,
                    condition: doc.data().condition
                })
            })

            const data = {
                'equipment': equipmentsArray,
                'pageSize': pageSize,
                'currentPage': currentPage,
                'totalPage': Math.ceil(countAll.data().count / pageSize)
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

    getById = async (equipment_id) => {
        try {
            const equipmentsRef = db.collection("resources").doc(equipment_id);
            const doc = await equipmentsRef.get();

            if (!doc.exists) {
                return "Equipment not found";
            }
            const data = {
                id: doc.id,
                name: doc.data().name,
                cost: doc.data().cost,
                type: doc.data().type,
                availability: doc.data().availability,
                condition: doc.data().condition,
            }
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

    create = async (name, cost, type, availability, condition) => {
        try {
            const res = await db.collection('resources').add({
                name: name,
                cost: cost,
                type: type,
                availability: availability,
                condition: condition,
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

    update = async (equipment_id, name, cost, type, availability, condition) => {
        try {
            const equipmentRef = db.collection('resources').doc(equipment_id);
            const res = await equipmentRef.update({
                name: name,
                cost: cost,
                type: type,
                availability: availability,
                condition: condition,
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

    delete = async (equipment_id) => {
        try {
            const res = await db.collection('resources').doc(equipment_id).delete();
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

module.exports = Equipment