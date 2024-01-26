const router = require("express").Router();
const { User } = require("../modules/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		console.log("hello34");
		const { error } = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		//console.log("hello3");
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
//console.log("ghghgh");
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		



			//console.log(user);
			//console.log("hel");
			
		const token = jwt.sign({_id:user._id}, process.env.JWTPRIVATEKEY ,{expiresIn:"7d",});
	
		//user.generateAuthToken();
		//console.log("hello3gdfd");
		res.status(200).send({ data: token, message: "logged in successfully" });
		


	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;