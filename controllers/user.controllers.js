const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// const Secretekey = process.env.SECRET_KEY;
const SECRETE_KEY = "ca1ae63dd8cdf8c70b94d104202a01624123c1a3f89dfac99b771bf1c029e83a";
const uuid = require("uuid");


const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;
        const hashpass = bcrypt.hashSync(password , 10);
        const response = await User.create({id:uuid.v4(), email: email, password:hashpass});
        res.json({
            success : true
        })
    } catch (error) {
        res.json({
            success : false
        })
    }
}

const login = async (req, res) => {
    try {
        const { fullname, password } = req.body;
        const user = await User.findOne({ fullname });
        if (!user) {
          return res.json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.json({ error: 'Invalid credentials' });
        }
        const webToken = jsonwebtoken.sign({fullname:user.fullname}, Secretekey, {expiresIn : '1 Hour'})
        res.json({ 
            success: true,
          webToken 
        });
      } 
      catch (error) {
        res.json({ 
            success : false
      });
      }
}

const getUserName = async (req, res) => {
    try {
        const userId = req.userId;
        const response = await User.findById(userId);

        if(!response){
            res.json({
                message:"Invalid User ID"
            })
        }
        res.json({
            fullname : response.fullname,
            response

        })

    } catch (error) {
        res.json({
                message:"internal server error"
        })
    }
}


module.exports = {
    signup,
    login,
    getUserName
}