const express = require("express")

const router = express.Router();
const users = require("../model")

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/app/public/image/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

//emplooye data registration,
router.post('/register', upload.single("myfile"),async (req, res) => {
    let profile = (req.file) ? req.file.filename : null;
    const { name, age, address, contact } = req.body;
    const newdata = new users({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        contact: req.body.contact,
        profile : profile
    });


    if (!name || !age || !address || !contact) {
        res.status(404).send("plz filled all data");
    }
    try {
        
        const preuser = await users.findOne({ contact: contact });
        // console.log(preuser);

        if (preuser) {
            res.status(404).send("Thsi user already exist");
        } else {
            const adduser = new users({
                name,age,address,contact
            })

            await newdata.save();
            res.status(201).json(newdata);
            // console.log(newdata);
        }

    } catch (error) {
        res.status(404).send(error);
    }
})

// get emplooye data
router.get('/getmydata', async(req,res) => {
    
    try{
        
        const data = await users.find();
        res.status(201).json(data);
        // console.log(data);

    }catch(error){
        console.log(error);
    }
    

})

// get one emp data by ID

router.get('/getu/:id', async(req,res) => {
    
    try{
        const{id} = req.params;
        const data = await users.findById({_id:id});
        res.status(201).json(data);
        // console.log(data);

    }catch(error){
        console.log(error);
    }
    

})


//delete emp data

router.delete('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await users.findByIdAndDelete({_id:id});
        res.status(201).json(data);
        // console.log(data);

    }catch(error){
        console.log(error);
    }
    
})


// update emp data
router.patch('/update/:id',async(req,res)=>{
    
    try{
        const {id} = req.params;
        console.log(req.body);

        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateuser);
        res.status(201).json(updateuser);
        



    }catch(error){
       
        res.status(404).json(error);
        console.log(error);
    }

})


module.exports = router;