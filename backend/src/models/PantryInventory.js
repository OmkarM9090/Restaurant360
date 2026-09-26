const mongoose = require('mongoose');

const pantryInventorySchema = new mongoose.Schema({
  itemCode: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  currentStockKg: { type: Number, required: true },
  reorderLevelKg: { type: Number, required: true },
  maxStockKg: { type: Number, required: true },
  unitCost: { type: Number, required: true },
  supplier: { type: String },
  supplierStatus: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PantryInventory', pantryInventorySchema);
