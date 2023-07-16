require('dotenv').config();
const nano = require('nano')(process.env.DATABASE_URL);
const dbName = process.env.DB_NAME;
const db = nano.db.use(dbName);

exports.create = (doc, callback) => {
  db.insert(doc, callback);
};

exports.getAll = (callback) => {
  db.list({ include_docs: true }, callback);
};

exports.getById = (id, callback) => {
  db.get(id, callback);
};

exports.updateById = (id, doc, callback) => {
  doc._id = id;
  db.insert(doc, callback);
};

exports.deleteById = (id, rev, callback) => {
  db.destroy(id, rev, callback);
};
