const { db, admin } = require('../config/firebase');
const { formatDate } = require('../public/formatDate');

class Resource {
    _id;
    _name;
    _cost;
    _type;

    constructor(id, name, cost, type) {
        this._id = id;
        this._name = name;
        this._cost = cost;
        this._type = type;
    }

    getAll = async (pageSize, currentPage) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const resourcesArray = [];
            const resourceRef = admin.firestore().collection('resources').orderBy('name', 'asc');
            const countAll = await resourceRef.count().get();
            const snapshot = await resourceRef.limit(pageSize).offset(offset).get();
            snapshot.forEach(doc => {
                resourcesArray.push({
                    id: doc.id,
                    name: doc.data().name,
                    cost: doc.data().cost,
                    type: doc.data().type
                })
            })
            const data = {
                'resources': resourcesArray,
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

    getById = async (id) => {
        try {
            const resourceRef = db.collection('resources').doc(id);
            const doc = await resourceRef.get();

            if (!doc.exists) {
                return "Resource not found";
            }

            const data = {
                id: doc.id,
                name: doc.data().name,
                cost: doc.data().cost,
                type: doc.data().type
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

    create = async (name, cost, type) => {
        try {
            const res = await db.collection('resources').add({
                name: name,
                cost: cost,
                type: type
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

    update = async (id, name, cost, type) => {
        try {
            const resourceRef = db.collection('resources').doc(id);
            const res = await resourceRef.update({
                name: name,
                cost: cost,
                type: type
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

    delete = async (id) => {
        try {
            const res = await db.collection('resources').doc(id).delete();
            return res;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = Resource