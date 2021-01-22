const express = require('express');
// const {Router} =require('express')
const routes = express.Router();
const Coupons = require('../controllers/coupons')


routes.put('/coupon',Coupons.create)
routes.get('/coupon',Coupons.getAll)
routes.get('/coupon/:id',Coupons.get)
routes.post('/Coupon/:id',Coupons.update)
routes.post('/Coupon/:id/redeem',Coupons.redeem)
routes.delete('/Coupon/:id',Coupons.delete)
routes.get('/Coupon/search/:code',Coupons.isExist)

module.exports = routes;