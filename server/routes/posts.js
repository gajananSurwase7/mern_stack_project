import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import { getCustomers, createCustomer, deleteCustomer, updateCustomer, getSingleCustomer } from '../controllers/posts.js';
import PostMessage from "../models/postMessage.js";
const { v4: uuidv4 } = require('uuid');
let multer = require('multer');

const router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//-----------------------------------

//get all customers

router.get("/getCustomers", async (req, res) => {
    console.log("getCustomers " + JSON.stringify(req.body))
    const customers = await PostMessage.find()

    res.status(200).json({
        success: true,
        customers
    })
})

//-----------------------------------

//add new customers----------

// router.post("/createcustomer", async (req, res) => {
//     // console.log("create customer "+JSON.stringify(req.body.data));
//     try {
//         const newCustomer = await PostMessage.create(req.body.data)
//         res.status(200).json({
//             success: true,
//             newCustomer
//         })

//     } catch (err) {
//         res.status(500).json({ error: err.message });

//     }
// })

router.post("/createcustomer", upload.single('profilePicture'), async (req, res) => {
    console.log("req " + JSON.stringify(req.body))
    try {
        // console.log(req.body);
        const url = req.protocol + '://' + req.get('host')

        console.log(req.file);

        let reqObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            occupation: req.body.occupation,
            dob: req.body.dob,
            status: req.body.status,
            profilePicture: url + '/public/' + req.file.filename
        }


        const newCustomer = await PostMessage.create(reqObject)
        res.status(200).json({
            success: true,
            newCustomer
        })

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
})

//------------------------------------

// router.delete('/',deleteCustomer);

router.delete("/deletecustomer/:id", async (req, res) => {
    console.log("req " + JSON.stringify(req.params.id))
    try {
        let customer = await PostMessage.findById(req.params.id)

        if (!customer) {
            return res
                .status(400)
                .json({ msg: "Customer doesn't exists." });
        }

        customer = await PostMessage.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            msg: "Customer deleted successfully."
        })


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//-----------------------------------


// router.put("/updatecustomer/:id", async (req, res) => {
//     console.log("req "+JSON.stringify(req.body))
//     try {
//         let customer = await PostMessage.findById(req.params.id)
//         console.log("customer "+JSON.stringify(customer))
//         if (!customer) {
//             return res
//                 .status(400)
//                 .json({ msg: "Customer doesn't exists." });
//         }

//         customer = await PostMessage.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false
//         })
//         console.log("cutst "+JSON.stringify(customer))
//         res.status(200).json({
//             success: true,
//             customer
//         })


//     } catch (error) {
//         res.status(500).json({ error: err.message });
//     }
// })

router.put("/updatecustomer/:id", upload.single('profilePicture'), async (req, res) => {
    console.log("req " + JSON.stringify(req.body))
    try {
        let customer = await PostMessage.findById(req.params.id)

        if (!customer) {
            return res
                .status(400)
                .json({ msg: "Customer doesn't exists." });
        }

        // console.log(req.body.profilePicture);

        const url = req.protocol + '://' + req.get('host')

        let reqObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            occupation: req.body.occupation,
            dob: req.body.dob,
            status: req.body.status,
            // profilePicture: url + '/public/' + req.file.filename
        }

        if (typeof (req.file) === "object") {
            reqObject.profilePicture = url + '/public/' + req.file.filename
        } else {
            reqObject.profilePicture = req.body.profilePicture
        }



        customer = await PostMessage.findByIdAndUpdate(req.params.id, reqObject, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


        res.status(200).json({
            success: true,
            customer
        })


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


//-----------------------------------

// router.get('/',getSingleCustomer);


//get single customer

router.get("/singlecustomer/:id", async (req, res) => {
    console.log("req " + JSON.stringify(req.params.id))
    try {
        let customer = await PostMessage.findById(req.params.id)

        if (!customer) {
            return res
                .status(400)
                .json({ msg: "Customer doesn't exists." });
        }


        customer = await PostMessage.findById(req.params.id)

        res.status(200).json({
            success: true,
            customer
        })


    } catch (error) {
        res.status(500).json({ error: err.message });

    }
})

export default router;