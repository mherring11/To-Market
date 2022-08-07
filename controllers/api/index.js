const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const inventoryRoutes = require('./inventory-routes');

router.use('/users/', userRoutes);
router.use('/users/inventory/', inventoryRoutes);

module.exports = router;