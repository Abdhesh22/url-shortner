const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports = class BaseDAO {
  /**
   * @type {mongoose.Model}
   */
  collection;

  /**
   *
   * @param {mongoose.Model} collection
   */
  constructor(collection) {
    this.collection = collection;
  }

  create(document) {
    return this.collection.create(document);
  }

  insertMany(documents) {
    return this.collection.insertMany(documents);
  }

  findOne(query, projection = {}) {
    return this.collection.findOne(query, projection);
  }

  findById(id, projection = {}) {
    return this.collection.findById(new ObjectId(id), projection);
  }

  find(query, projection = {}) {
    return this.collection.find(query, projection);
  }

  updateOne(query, data) {
    return this.collection.updateOne(query, data);
  }

  updateById(id, payload) {
    return this.collection.updateOne({ _id: new ObjectId(id) }, payload);
  }

  updateMany(query, data) {
    return this.collection.updateMany(query, data);
  }

  deleteOne(query) {
    return this.collection.deleteOne(query);
  }

  deleteById(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  deleteMany(query) {
    return this.collection.deleteMany(query);
  }

  countDocuments(query) {
    return this.collection.countDocuments(query);
  }

  aggregate(pipeline) {
    return this.collection.aggregate(pipeline);
  }

  findOneAndUpdate(query, payload, options = {}) {
    return this.collection.findOneAndUpdate(query, payload, options);
  }
};
