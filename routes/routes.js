const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/api/documents', controller.createDocument);
router.get('/api/documents', controller.getAllDocuments);
router.get('/api/documents/:id', controller.getDocumentById);
router.put('/api/documents/:id', controller.updateDocument);
router.delete('/api/documents/:id', controller.deleteDocument);

module.exports = router;
