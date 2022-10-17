const express = require('express');
const router = express.Router();

const controller = require('../controllers/personController/index')
const auth = require('../auth/auth')

router.get('/', [auth.checkToken, controller.get]);
router.get('/:id', [auth.checkToken, controller.getById]);
router.post('/', [auth.checkToken, controller.post]);
router.put('/:id', [auth.checkToken, controller.put]);
router.delete('/:id', [auth.checkToken, controller.delete]);

module.exports = router;