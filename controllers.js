const User = require("./model");
const jwt = require("jsonwebtoken")

//registers all of the users
const registerUser = async (req,res) => {
console.log("Register user called and initiated")

    try {
        const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password: req.body.password

        })



        res.status(201).json({
            message: "Succesfully registered",
            user: {username:req.body.username, email:req.body.email}
        });
    }
    catch (error) {
        res.status(501).json({errorMessage:error.message, error:error})       
    }
};

//retrieves users
const getAllUsers = async (req, res) => {
    console.log("Getting all the users")
    try {








    const users = await User.findAll();
      // remove passwords from users object
    for (let user of users) {
        user.password = "";
    }

    res.status(200).json({ message: "success", users: users });
    } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
    }
};


//handles the login function within the program and either prevents logins or allows them based on bcrypt functionality 
const login = async (req, res) => {
    try { 
        
        
        // handles persistant login
        if (req.authUser) {
            res.status(200).json({
                message: "success", 
                user:{
                    username: req.authUser.username,
                    email: req.authUser.email
                }
            })
            return res.json({user: req.authUser})
        }
        // handles manual login
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET)
        res.status(200).json ({
            message: "success",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token
            }
        })
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }
}

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
    return res.status(404).send('User not found') 
    }
    res.send(user)
}



const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).send('User not found')
    }
  
    await user.destroy()
    res.send('User deleted') 
  }



const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) { 
    return res.status(404).send('User not found')
  }

  // Update user properties
  user.username = req.body.username 
  user.save()
  
  res.send(user)
}


module.exports = {registerUser,
getAllUsers,
login,
updateUser,
deleteUser,
getUserById};