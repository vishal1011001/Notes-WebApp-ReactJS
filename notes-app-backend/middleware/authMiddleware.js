import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../models/UserModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //get token from req header
      token = req.headers.authorization.split(' ')[1];
      
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user by id from token
      req.user = await userModel.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }


  if(!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
})


export {protect};