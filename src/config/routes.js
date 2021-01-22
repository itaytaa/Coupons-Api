const express = require('express');
// const {Router} =require('express')
const routes = express.Router();
const Coupons = require('../controllers/coupons')


routes.put('/coupon',Coupons.create)
routes.get('/coupon',Coupons.getAll)
routes.get('/coupon/:id',Coupons.get)
routes.post('/Coupons/:id',Coupons.update)
routes.post('/Coupons/:id/redeem',Coupons.redeem)
routes.delete('/Coupons/:id',Coupons.delete)

module.exports = routes;