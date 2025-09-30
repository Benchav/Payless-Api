const express = require('express');
const router = express.Router();

const managuaController = require('../controllers/managua.controller');
const jinotepeController = require('../controllers/jinotepe.controller');
const chontalesController = require('../controllers/chontales.controller');
const masayaController = require('../controllers/masaya.controller');
const granadaController = require('../controllers/granada.controller')

const authorize = require('../middleware/authorize.middleware');

const validateBody = require('../middleware/validate.body');
const { newShoeSchema, updateShoeSchema } = require('../models/shoe.schema');


//console.log('ManaguaController:', managuaController);
//console.log('JinotepeController:', jinotepeController);
//console.log('ChontalesController:', chontalesController);
//console.log('MasayaController:', masayaController);

// Rutas

/**
 * @openapi
 * /api/managua:
 *   get:
 *     summary: Obtener todos los zapatos de todas las ciudades (Jinotepe, Chontales, Masaya, Granada)
 *     responses:
 *       200:
 *         description: Listado agregado por ciudad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jinotepe:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shoe'
 *                 chontales:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shoe'
 *                 masaya:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shoe'
 *                 granada:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shoe'
 *                 total:
 *                   type: integer
 */
router.get('/managua', authorize('managua'), managuaController.getManagua);




/**
 * @openapi
 * /api/jinotepe:
 *   get:
 *     summary: Listar zapatos de Jinotepe
 *     responses:
 *       200:
 *         description: Lista de zapatos
 *   post:
 *     summary: Crear un nuevo zapato en Jinotepe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       201:
 *         description: Zapato creado
 */
router.get('/jinotepe', authorize('jinotepe'), jinotepeController.getJinotepe);
router.post('/jinotepe', validateBody(newShoeSchema), authorize('jinotepe'), jinotepeController.createJinotepe);

/**
 * @openapi
 * /api/jinotepe/{id}:
 *   put:
 *     summary: Actualizar un zapato en Jinotepe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       200:
 *         description: Zapato actualizado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar un zapato en Jinotepe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
router.put('/jinotepe/:id', validateBody(updateShoeSchema), authorize('jinotepe'), jinotepeController.updateJinotepe);
router.delete('/jinotepe/:id', authorize('jinotepe'), jinotepeController.deleteJinotepe);



/**
 * @openapi
 * /api/chontales:
 *   get:
 *     summary: Listar zapatos de Chontales
 *     responses:
 *       200:
 *         description: Lista de zapatos
 *   post:
 *     summary: Crear un nuevo zapato en Chontales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       201:
 *         description: Zapato creado
 */
router.get('/chontales', authorize('chontales'), chontalesController.getChontales);
router.post('/chontales', validateBody(newShoeSchema), authorize('chontales'), chontalesController.createChontales);

/**
 * @openapi
 * /api/chontales/{id}:
 *   put:
 *     summary: Actualizar un zapato en Chontales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       200:
 *         description: Zapato actualizado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar un zapato en Chontales
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
router.put('/chontales/:id', validateBody(updateShoeSchema), authorize('chontales'), chontalesController.updateChontales);
router.delete('/chontales/:id', authorize('chontales'), chontalesController.deleteChontales);


/**
 * @openapi
 * /api/masaya:
 *   get:
 *     summary: Listar zapatos de Masaya
 *     responses:
 *       200:
 *         description: Lista de zapatos
 *   post:
 *     summary: Crear un nuevo zapato en Masaya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       201:
 *         description: Zapato creado
 */
router.get('/masaya', authorize('masaya'), masayaController.getMasaya);
router.post('/masaya', validateBody(newShoeSchema), authorize('masaya'), masayaController.createMasaya);

/**
 * @openapi
 * /api/masaya/{id}:
 *   put:
 *     summary: Actualizar un zapato en Masaya
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       200:
 *         description: Zapato actualizado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar un zapato en Masaya
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
router.put('/masaya/:id', validateBody(updateShoeSchema), authorize('masaya'), masayaController.updateMasaya);
router.delete('/masaya/:id', authorize('masaya'), masayaController.deleteMasaya);


/**
 * @openapi
 * /api/granada:
 *   get:
 *     summary: Listar zapatos de Masaya
 *     responses:
 *       200:
 *         description: Lista de zapatos
 *   post:
 *     summary: Crear un nuevo zapato en Masaya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       201:
 *         description: Zapato creado
 */
router.get('/granada', authorize('granada'), granadaController.getGranada);
router.post('/granada', validateBody(newShoeSchema), authorize('granada'), granadaController.createGranada);

/**
 * @openapi
 * /api/granada/{id}:
 *   put:
 *     summary: Actualizar un zapato en Granada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShoe'
 *     responses:
 *       200:
 *         description: Zapato actualizado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Eliminar un zapato en Masaya
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado
 *       404:
 *         description: No encontrado
 */
router.put('/granada/:id', validateBody(updateShoeSchema), authorize('granada'), granadaController.updateGranada);
router.delete('/granada/:id', authorize('granada'), granadaController.deleteGranada);

module.exports = router;