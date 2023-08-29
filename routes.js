const{ Router } = require("express");
const userRouter = Router();

const {registerUser, login, getAllUsers} = require("./controllers");
const {hashPass, comparePass, tokenCheck } = require("../middleware"); 


userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/getUsers", tokenCheck, getAllUsers);
userRouter.get("/users/authCheck", tokenCheck, login)
userRouter.get()
userRouter.put()
userRouter.delete()
module.exports = userRouter;
