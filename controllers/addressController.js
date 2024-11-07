var db = require('../config/config');
require('dotenv').config()
var customerAddress = db.customerAddress;

//get all customer orders
var getAllCustomerAddress = async (req, res) => {
    try {
        let data = await customerAddress.findAll({});
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).json("Customer order not Found");
        }
    } catch (error) {
        console.log("error in get all customer orders", error);
        throw error
    }
}

//get one order by id
var getSingleCustomerAddress = async (req, res) => {
    try {
        let data = await customerAddress.findAll({
            where: {
                id: req.params.id
            }
        })
        if (data == undefined || data.length == 0) {
            res.status(404).json("The Customer Order you are looking for is not available!");
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.log("error in get single customer orders", error);
        throw error
    }
}
// Add order controller using Razor pay payment gateway
var addCustomerAddress = async(req,res)=>{
    try {
        console.log("customerAddress  request body", req.body)
        
        const address = await customerAddress.create(req.body);
        
        // } catch (error) {
        //     console.log("order dcatch ",error)
        // }
        console.log("adress",address)
        if (!address) return res.status(500).send("Some error occured");

        res.json(address);
    } catch (error) {
        res.status(500).send(error);
    }
}

//delete an order
var deleteCustomerAddress = async (req, res) => {
    try {
        let data = await customerAddress.destroy({ where: { id: req.params.id } });
        // console.log("data is : ",typeof data)
        const newdata = {
            data: data,
            id: req.params.id
        }
        return res.status(200).json(newdata);
    } catch (error) {
        throw error;
    }
}

//update an existing order
var updateCustomerAddress = async (req, res) => {
    try {
        console.log("update address ", req.body);
        // let data = await customerOrder.update(req.body, { where: { order_number: req.params.order_number } });
        const result = await customerAddress.update(req.body, { where: { id: req.params.id } })
        const newRes = {
            status: result,
            data: req.body
        }
        res.status(200).json(newRes);
    } catch (error) {
        console.log("error in update customer address", error);
        throw error;
    }
}


module.exports = {
    getAllCustomerAddress,
    getSingleCustomerAddress,
    addCustomerAddress,
    deleteCustomerAddress,
    updateCustomerAddress
}