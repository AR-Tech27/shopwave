import { encrypedPassword, matchPassword } from "../Helper/userHelper.js";
import userModel from "../models/userModel.js";


const registerController = async (req, res) => {

   try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         return res
            .status(400)
            .send({ success: false, message: "all fields are required" });
      }

      // checking user email already exist or not

      const isExist = await userModel.findOne({ email });
      if (isExist) {
         return res
            .status(400)
            .send({ success: false, message: "Email already exist" });  // returning error if email already exist   
      }

      // encrypting user password
      const hashedPassword = await encrypedPassword(password);

      // creating new user
      const newUser = await userModel.create({ name, email, password: hashedPassword });

      return res
         .status(201)
         .send({
            success: true,
            message: "User Registration successful",
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




const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      // check validation
      if (!email || !password) {
         return res
            .status(400)
            .send({ success: false, message: "all fields are required" });
      }
      // check user email is present in database or not
      const user = await userModel.findOne({ email });
      if (!user) {
         return res
            .status(401)
            .send({ success: false, message: "email not registered" });
      }

      // matching password
      const isMatch = await matchPassword(password, user.password);
      if (!isMatch) {
         return res
            .status(401)
            .send({ success: false, message: "incorrect email/password" });
      }

      
      // remove password field to send user data password from backend to frontend
      user.password = undefined;

      // return succesfull response
      return res
         .status(200)
         .send({ success: true, message: "login succesful",user });



   } catch (error) {
      console.log(`loginController error ${error}`)
      return res
         .status(400)
         .send({
            success: false,
            message: "error in loginController"
         })
   }
};



export { registerController, loginController };