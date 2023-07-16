const model = require('../models/model');
const personalDetailsSchema = require('../validation/personalDetailsSchema');

// Validate personal details
function validatePersonalDetails(doc) {
  for (const field in personalDetailsSchema) {
    const fieldConfig = personalDetailsSchema[field];
    if (fieldConfig.required && !doc[field]) {
      return `${field} is required.`;
    }
    if (typeof doc[field] !== fieldConfig.type) {
      return `${field} should be of type ${fieldConfig.type}.`;
    }
  }
  return null; 
}

//create personal detail 
exports.createDocument = (req, res) => {
  const doc = req.body;
  const validationError = validatePersonalDetails(doc);
  if(validationError){
    res.status(400).json({ error: validationError });
  } else {
    model.create(doc, (err, body) => {
      if (err) {
        res.status(500).json({ error: 'Failed to create document.' });
      } else {
        res.json(body);
      }
    });
  }
};

// Get all details 
exports.getAllDocuments = (req, res) => {
  
  model.getAll((err, body) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch documents.' });
    } else {
      const documents = body.rows.map(row => row.doc);
      res.json(documents);
    }
  });
};

// get personal details by id 
exports.getDocumentById = (req, res) => {
  const id = req.params.id;
  model.getById(id, (err, body) => {
    if (err) {
      res.status(404).json({ error: 'Document not found.' });
    } else {
      res.json(body);
    }
  });
};

// update personal details
exports.updateDocument = (req, res) => {
  const id = req.params.id;
  const doc = req.body;

  // Validate the personal details against the schema
  const validationError = validatePersonalDetails(doc);
  if (validationError) {
    res.status(400).json({ error: validationError });
  } else {
    model.getById(id, (err, existingDoc) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update document.' });
      } else {
        doc._id = id;
        doc._rev = existingDoc._rev;

        model.updateById(id, doc, (err, body) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update document.' });
          } else {
            res.json(body);
          }
        });
      }
    });
  }
};

// delete personal details
exports.deleteDocument = (req, res) => {
  const id = req.params.id;  
  model.getById(id, (err, existingDoc) => {
    if (err) {
      res.status(404).json({ error: 'Document not found.' });
    } else {
      model.deleteById(id, existingDoc._rev, (err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to delete document.' });
        } else {
          res.json({ message: 'Document deleted successfully.' });
        }
      });
    }
  });
};