import bcrypt from "bcrypt";


const encrypedPassword = async (plainPassword) => {
    const saltRounds = 10;
    const encrypedPassword = await bcrypt.hash(plainPassword,saltRounds);
    return encrypedPassword;
};



export {encrypedPassword}