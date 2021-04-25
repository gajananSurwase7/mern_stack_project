import PostMessage from '../models/postMessage.js';


//get all customers

export const getCustomers = async (req,res)=>{
    // res.send('THis works!');
    try{
        const postMessages  = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

//-----------------------------------------------

// add new customer

export const createCustomer = async (req,res)=>{
    console.log("in createCustomer "+JSON.stringify(req.body))
try {
    const newCustomer = await PostMessage.create(req.body)
    res.status(200).json({
        success: true,
        newCustomer
    })

} catch (err) {
    res.status(500).json({ error: err.message });

}
}

//------------------------------------------------

//delete customer

export const deleteCustomer = async (req,res)=>{
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
    }

    //--------------------------------------------

    //get unique customer

    export const getSingleCustomer = async (req,res)=>{

        try {
            let customer = await PostMessage.findById(req.params.id)
    
            if (!customer) {
                return res
                    .status(400)
                    .json({ msg: "Customer doesn't exists." });
            }
    
    
            customer = await Post.findById(req.params.id)
    
            res.status(200).json({
                success: true,
                customer
            })
    
    
        } catch (error) {
            res.status(500).json({ error: err.message });
    
        }
    }

    //-------------------------------------

    // update existing customer
    
    export const updateCustomer = async (req,res)=>{
        try {
            let customer = await PostMessage.findById(req.params.id)
    
            if (!customer) {
                return res
                    .status(400)
                    .json({ msg: "Customer doesn't exists." });
            }
    
            customer = await PostMessage.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
    
    
            res.status(200).json({
                success: true,
                customer
            })
    
    
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    
    }