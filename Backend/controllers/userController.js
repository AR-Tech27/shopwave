import { encrypedPassword } from "../Helper/userHelper.js";
import userModel from "../models/userModel.js";


const registerController = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      if (!name || !email || !password) {
         return res
            .status(400)
            .send({ success: false, message: "all fields are required" });
      }

      // checking user email already exist or not

      const isExist = await userModel.findOne({email});
      if (isExist) {
         return res
            .status(400)
            .send({ success: false, message: "Email already exist" });  // returning error if email already exist   
      }

      // encrypting user password
      const hashedPassword = await encrypedPassword (password);

      // creating new user
      const newUser = await userModel.create({ name,email,password:hashedPassword });

      return res
         .status(201)
         .send({
            success: true,
            message: "User Registration successful", newUser
         })

   } catch (error) {
      console.log(`register controller error ${error}`)
      return res
         .status(400)
         .send({
            success: false,
            message: "error in registerController"
         })
   }
};



export {registerController};