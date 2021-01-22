const { ObjectID } = require('mongodb');
const {db} = require('../db')

class Coupons {

    static create(req, res) {
        const { code } = req.body
        if (code.toString().length < 4) {
            res.status(404).send('code must contain 4 characters')
            return;
        }
        let date = new Date().toLocaleString();
        let isRedeem = false;
        db().collection('coupons')
            .insertOne({ code, date, isRedeem })
            .then((report) => {
                res.status(201).send(report.ops[0])
            })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            })
    }

    static getAll(req, res) {
        db().collection('coupons')
            .find()
            .toArray()
            .then((coupons) => {
                res.send(coupons)
            })
    }

    static get(req, res) {
        db().collection('coupons')
            .findOne({ _id: ObjectID(req.params.id) })
            .then(coupon => {
                if (!coupon) {
                    res.sendStatus(404);
                    return;
                }
                res.send(coupon)
            })
    }
    static update(req, res) {
        // in case no Data was inserted  (managed to do it only with stringify )//
        if (JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(400).send('incorrect body - no change has been commited')
            return;
        }
        const { code } = req.body
        if (code) {
            if (code.toString().length < 4) {
                res.status(404).send('code must contain 4 characters')
                return;
            }
        }
        db().collection('coupons')
            .updateOne(
                { _id: ObjectID(req.params.id) },
                { $set: req.body }
            )
            .then((report) => {    // in case there was no change due to unmatched coupon Id
                if (report.matchedCount === 0) {
                    res.sendStatus(404);
                    return;
                }
                res.sendStatus(200)
            })
    }

    static delete(req, res) {
        db().collection('coupons')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((report) => {
                if (report.deletedCount === 0) {
                    res.sendStatus(404);
                    return;
                }
                res.sendStatus(204)
            })
    }

    static redeem(req, res) {
        db().collection('coupons')
            .updateOne(
                { _id: ObjectID(req.params.id) },
                { $set: { isRedeem: true } }
            ).then((report) => {
                if (report.modifiedCount === 0) {
                    res.status(400).send('coupon has already been redeemed!')
                    return;
                }
                res.status(200).send('coupon has been redeemed')
            })
    }
    static isExist(req, res) {
        // const {code} = req.params.code/
        db().collection('coupons')
        .findOne({ code: req.params.code })
        .then((result)=>{
            if (!result){
                res.status(404).send('does not exist')
                return;
            }
            res.status(200).send(' exist')
            

        })
    }


}

module.exports = Coupons