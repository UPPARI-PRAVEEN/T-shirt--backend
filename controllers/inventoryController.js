const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Create inventory
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        // Validation
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            return res.status(403).send({
                success: false,
                message: "Not a donar account",
            });
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            return res.status(403).send({
                success: false,
                message: "Not a hospital account",
            });
        }
        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: "New Blood Record Added",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Create Inventory API",
            error: error.message,
        });
    }
};
//grt all blood records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find({
                organisation: req.body.userId,
            })
            .populate("donar")
            .populate("hospital")
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "Get all records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Inventory",
            error,
        });
    }
};


module.exports = { createInventoryController, getInventoryController };
