const router= require("express").Router();
const {User, validate}= require("../modules/user");
const bcrypt=require("bcrypt");

router.post("/", async (req, res)=>{
    try{
       // console.log("hello1");
     const {error}=validate(req.body);
     if(error){
        console.log("hello2");
        return res.status(400).send({message:"IMPROVE PASSWORD"})
     }
     
     const user= await User.findOne({email:req.body.email});
     if(user){
        return res.status(409).send({message:"user with given email already exists"});

     }
     //console.log("hello34");
     const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log(req.body);
   
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
});
  
module.exports=router;