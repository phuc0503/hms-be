const { db, admin } = require('../config/firebase');
const Resource = require('./resource');
const { formatDate, transformDateFormat } = require('../public/formatDate');
const { Timestamp } = require('firebase-admin/firestore');

class Drug extends Resource {
    #expiryDate;
    #quantity;

    constructor(id, name, cost, type, expiryDate, quantity) {
        super(id, name, cost, type);
        this.#expiryDate = expiryDate;
        this.#quantity = quantity;
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const drugsArray = [];
            const drugsRef = admin.firestore().collection('resources').where('type', '==', 'drug').orderBy('name', 'asc');
            const countAll = await drugsRef.count().get();
            const snapshot = await drugsRef.limit(pageSize).offset(offset).get();

            snapshot.forEach(doc => {
                drugsArray.push({
                    id: doc.id,
                    name: doc.data().name,
                    cost: doc.data().cost,
                    type: doc.data().type,
                    expiryDate: formatDate(doc.data().expiryDate),
                    quantity: doc.data().quantity
                })
            })

            const data = {
                'drugs': drugsArray,
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

    getById = async (drug_id) => {
        try {
            const drugsRef = db.collection("resources").doc(drug_id);
            const doc = await drugsRef.get();

            if (!doc.exists) {
                return {
                    success: false,
                    message: "Maybe wrong id"
                };
            }
            const data = {
                id: doc.id,
                name: doc.data().name,
                cost: doc.data().cost,
                type: doc.data().type,
                expiryDate: formatDate(doc.data().expiryDate),
                quantity: doc.data().quantity
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

    create = async (name, cost, type, expiryDate, quantity) => {
        try {
            const res = await db.collection('resources').add({
                name: name,
                cost: cost,
                type: type,
                expiryDate: Timestamp.fromDate(new Date(transformDateFormat(expiryDate))),
                quantity: quantity,
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

    update = async (drug_id, name, cost, type, expiryDate, quantity) => {
        try {
            const drugsRef = db.collection('resources').doc(drug_id);
            const res = await drugsRef.update({
                name: name,
                cost: cost,
                type: type,
                expiryDate: Timestamp.fromDate(new Date(transformDateFormat(expiryDate))),
                quantity: quantity
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

    delete = async (drug_id) => {
        try {
            const res = await db.collection('resources').doc(drug_id).delete();
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

module.exports = Drug