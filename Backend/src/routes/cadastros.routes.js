const express = require('express')
const router = express.Router()
const controller = require('../controllers/cadastroController')


router.get('/', controller.mostraCadastros)
router.post('/cadastar', controller.criarCadastros)
router.patch('/:id', controller.atualizaCadastros)
router.delete('/:id', controller.deletaCadastros)

module.exports = router








