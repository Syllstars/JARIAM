const StockItem = require('../models/stockItem');

/**
 * Récupérer tous les articles en stock
 */
const getAllStockItems = async () => {
    return await StockItem.findAll();
};

/**
 * Ajouter un nouvel article en stock
 */
const addStockItem = async ({ name, quantity }) => {
    return await StockItem.create({ name, quantity });
};

/**
 * Mettre à jour un article en stock
 */
const updateStockItem = async (id, { name, quantity }) => {
    const stockItem = await StockItem.findByPk(id);
    if (!stockItem) {
        return null;
    }
    
    stockItem.name = name || stockItem.name;
    stockItem.quantity = quantity !== undefined ? quantity : stockItem.quantity;
    
    await stockItem.save();
    return stockItem;
};

/**
 * Supprimer un article du stock
 */
const deleteStockItem = async (id) => {
    const stockItem = await StockItem.findByPk(id);
    if (!stockItem) {
        return null;
    }

    await stockItem.destroy();
    return stockItem;
};

/**
 * Récupérer un article en stock par ID
 */
const getStockItemById = async (id) => {
    return await StockItem.findByPk(id);
};

module.exports = {
    getAllStockItems,
    addStockItem,
    updateStockItem,
    deleteStockItem,
    getStockItemById
};
