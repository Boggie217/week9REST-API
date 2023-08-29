const bcrypt =require ("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../users/model");

const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = await bcrypt.hash(req.body.password,parseInt(saltRounds)
    );

        next();
        } catch (error) {res.status(501).json({ errorMessage: error.message, error: error });
        }
};






const comparePass = async (req, res, next) => {

    try {
    req.user = await User.findOne({ where: { username: req.body.username} });

const match = await bcrypt.compare(req.body.password, req.user.password);

    if (!match) {
    throw new Error("Username or password do not match");

}
next();}
catch (error) {
    res.status(500).json({ errorMessage: error.message, error: error});
    }
};


const tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        console.log(token )
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log(decodedToken)

        const user = await User.findOne({where: {id: decodedToken.id}})
        console.log(user)

        if (!user) {
            throw new Error("User is not authorised")
        }
        
        req.authUser = user
        next()

        
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}





module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}