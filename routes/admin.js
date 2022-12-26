// const express = require('express');
// var nodemailer = require('nodemailer');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();
// const User = require('../models/User');
// const AdminUser = require('../models/AdminUser');
// const Notification = require('../models/Notification');
// const Posts = require('../models/Posts');
// const Pet = require('../models/Pet');
// const Event = require('../models/Event');
// const Inbox = require('../models/Inbox');
// const Chat = require('../models/Chat');

// const Comments = require('../models/Comments');
// const CommunityComment = require('../models/CommunityComment');
// const Likes = require('../models/Likes');
// const EmailVerification = require('../models/EmailVerification');
// const Community = require('../models/Community')
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const JWT_SECRET = process.env.JWT_SECRET || config.get('JWT_SECRET');
// const jwt = require('jsonwebtoken');
// const Joi = require('@hapi/joi')
// const mongoose = require('mongoose');
// const auth = require('../middlewares/authAdmin');
// var admin = require('firebase-admin');

// var serviceAccount = require("../config/petsociety.json");
// const Report = require('../models/Report');
// const Agora = require("agora-access-token");

// const baseUrl="https://api.thepetsociety.app/"


// const baseEmail="noreply@thepetsociety.app" //this is the email from where every email will be sent
// const basePassword="qX6v3HWqGGMaP3z" //enter email password

// const userSignupValidate = Joi.object({
//     fname: Joi.string().required(),
//     lname: Joi.string(),
//     email: Joi.string().required(),
//     number: Joi.string().required(),
//     image: Joi.string(),
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     location: Joi.string(),
//     description: Joi.string(),
//     dob: Joi.date(),
//     token: Joi.string(),
//     deviceToken: Joi.string(),
//     zipCode:Joi.string()
// });
// const userLoginValidate = Joi.object({
//     email: Joi.string(),
//     username: Joi.string(),
//     password: Joi.string().required()
// })

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// router.get('/test-image-upload', (req, res) => {
//     res.send(`<form method="POST" action="/admin/api/upload-image" enctype="multipart/form-data">
//     <div>
//         <label>Select your file please:</label>
//         <input type="file" name="image" />
//     </div>
//     <div>
//         <input type="submit" name="btn_upload_profile_pic" value="Upload" />
//     </div>
//   </form>`);
// })

// router.post('/upload-image', (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     const maxSize = 1024 * 1024 * 32;
//     let upload = multer({ storage: storage, limits: { fileSize: maxSize } }).single('image');

//     upload(req, res, function (err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an file to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }
//         // Display uploaded video for user validation
//         res.json({
//             success: true,
//             url: baseUrl + req.file.path
//         });
//     });
// });

// router.get('/test-video', (req, res) => {
//     res.send(`<form method="POST" action="/api/upload-video" enctype="multipart/form-data">
//     <div>
//         <label>Select your file please:</label>
//         <input type="file" name="video" />
//     </div>
//     <div>
//         <input type="submit" name="btn_upload_profile_pic" value="Upload" />
//     </div>
//   </form>`);
// })
// router.post('/upload-video', (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     const maxSize = 1024 * 1024 * 32;
//     let upload = multer({ storage: storage, limits: { fileSize: maxSize } }).single('video');

//     upload(req, res, function (err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an file to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }
//         // Display uploaded video for user validation
//         res.json({
//             success: true,
//             url: baseUrl + req.file.path
//         });
//     });
// });

// router.post('/signup', async (req, res) => {
//     // check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "number", "image", "password", "location", "description", "role"];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     // check empty body 
//     // if (Object.keys(req.body).length < 1) {
//     //     return res.status(400).json({ success: false, message: 'Please provide all fields' });
//     // }

//     // // validate api params for empty values
//     // const { error } = userSignupValidate.validate(req.body);
//     // if (error) {
//     //     return res.status(400).send({
//     //         success: false,
//     //         message: error.details[0].message
//     //     });
//     // }
//     let { name, email, number, image, password, location, description, role } = req.body
//     try {

//         let user = await AdminUser.findOne({ email })
//         if (user) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Email already exists"
//             })
//         }
//         user = await new AdminUser({
//             name, email, number, image, password, location, description, role
//         });

//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);


//         user.password = hash;

//         await user.save()


//         const payload = {
//             user: {
//                 email,
//                 id: user.id
//             }
//         };

//         const token = await jwt.sign(payload, JWT_SECRET, {
//             expiresIn: "365d"
//         });
//         return res.json({
//             success: true,
//             message:"Account Created Succesfully",
//             user,
//             token,
//         });
//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// })

// router.post('/login', async (req, res) => {


//     let { email, password } = req.body;
//     // check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["email", "password"];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     // check empty body 
//     if (Object.keys(req.body).length < 1) {
//         return res.status(400).json({ success: false, message: 'Please provide all fields' });
//     }

//     // validate api params for empty values
//     const { error } = userLoginValidate.validate(req.body);
//     if (error) {
//         return res.status(400).send({
//             success: false,
//             message: error.details[0].message
//         });
//     }

//     try {
//         let user;
//         email = email.toLowerCase();
//         email = await email.split(" ").join("");
//         user = await AdminUser.findOne({ email }).populate('followers', { password: 0 }).populate('follows', { password: 0 }).populate('pets').populate('block').populate('requests', { password: 0 }).populate('myRequests', { password: 0 });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide valid email"
//             });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid password"
//             });
//         }
//         const payload = {
//             user: {
//                 email: user.email,
//                 id: user._id
//             }
//         };

//         const token = await jwt.sign(payload, JWT_SECRET, {
//             expiresIn: "365d"
//         });

//         user.password = "It's always a mystery"
//         return res.json({
//             success: true,
//             token,
//             user
//         });

//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.post('/community', auth, async (req, res) => {
//     let {
//         description,
//         image,
//         title,
//         zipCode
//     } = req.body;
//     if (image == undefined || image == "" || image == false) {
//         image = ""
//     }
//     try {
//         community = await new Community({
//             description,
//             image,
//             title,
//             zipCode,
//             comments: 0,
//             createdBy: req.user.id,
//         });
//         await community.save()
//         return res.json({
//             success: true,
//             message: "Community Topic Created",
//             community
//         });
//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.get('/community', auth, async (req, res) => {
//     try {
//         const community = await Community.find({}).populate('user', { password: 0 })
//         return res.json({
//             success: true,
//             community
//         });

//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// })

// router.get('/users', auth, async (req, res) => {
//     try {
//         const users = await User.find({}).select("-password");
//         return res.json({
//             success: true,
//             users
//         });

//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// })

// router.get('/reports', auth, async (req, res) => {
//     try {
//         const reports = await Report.find({}).populate('user', { password: 0 }).populate('createdBy', { password: 0 }).populate('pet')
//         return res.json({
//             success: true,
//             reports,
//         });

//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// })


// router.put('/forgot-password', async function (req, res, next) {
//     let { email } = req.body
//     try {
//         email = email.toLowerCase();
//         email = await email.split(" ").join("");
//         let user = await AdminUser.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide valid email"
//             });
//         }

//         const randomID = (count) => {
//             var chars = '0123456789'.split('');
//             var result = '';
//             for (var i = 0; i < count; i++) {
//                 var x = Math.floor(Math.random() * chars.length);
//                 result += chars[x];
//             }
//             return result;
//         }
//         let tokenemail = randomID(4);
//         emailVerify = await new EmailVerification({
//             createdBy: user.id,
//             token: tokenemail
//         })
//         emailVerify.save();
//         let transporter = await nodemailer.createTransport({
//             host: "smtp.mail.us-east-1.awsapps.com",
//             port: 465,
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 user: baseEmail, // generated ethereal user
//                 pass: basePassword, // generated ethereal password
//             },
//         });

//         let mailOptions = {
//             from: baseEmail,
//             to: email,
//             subject: 'New Password Request',
//             text: 'Hello,\n\n' + 'Please change your password with this token: ' + tokenemail + '.\n'
//         };
//         await transporter.sendMail(mailOptions)
        
//         return res.json({
//             success: true,
//             userid: user._id,
//             tokenemail,
//             message: "Please check your email for new password"
//         })
//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.put('/email-test', async function (req, res, next) {
//     let { email } = req.body
//     try {

//         let transporter = await nodemailer.createTransport({
//             host: "smtp.mail.us-east-1.awsapps.com",
//             port: 465,
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 user: baseEmail, // generated ethereal user
//                 pass: basePassword, // generated ethereal password
//             },
//         });

//         let mailOptions = {
//             from: baseEmail,
//             to: email,
//             subject: 'New Password Request',
//             text: 'Hello,\n\n' + 'Please change your password with this token: ' + '.\n'
//         };
//         await transporter.sendMail(mailOptions)

//         return res.json({
//             success: true,
//             message: "Please check your email for new password"
//         })
//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.put('/confirmpassword/:_id', async function (req, res) {
//     let { token, password } = req.body
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params._id);
//     if (!isValidObjectId) {
//         return res.status(400).json({ success: false, message: 'Invalid object id' });
//     }
//     if (Object.keys(req.body).length < 1) {
//         return res.status(400).json({ success: false, message: 'Fields required in body' });
//     }
//     try {
//         const user = await EmailVerification.find({ createdBy: req.params._id }).sort({ _id: -1 })
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No user Found"
//             });
//         }
//         if (token == user[0].token) {

//             const salt = await bcrypt.genSalt(10);
//             const hash = await bcrypt.hash(password, salt);


//             password = hash;
//             let passwordBody = {
//                 password
//             }

//             const updatedUser = await AdminUser.findByIdAndUpdate(req.params._id, passwordBody, { new: true, runValidators: true });
//             if (!updatedUser) {
//                 return res.status(404).json({ success: false, message: 'AdminUser not found' });
//             }
//             return res.json({
//                 success: true,
//                 message: "Password Reset Succesfully"
//             });
//         }
//         else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Enter Right Code"
//             });
//         }
//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.put('/changepassword', auth, async (req, res) => {


//     let { password, newPassword } = req.body;
//     // check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["password", "newPassword"];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     // check empty body 
//     if (Object.keys(req.body).length < 1) {
//         return res.status(400).json({ success: false, message: 'Please provide all fields' });
//     }

//     try {
//         let user;
//         user = await AdminUser.findOne({ _id: req.user.id });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "AdminUser can not be found"
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid password"
//             });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(newPassword, salt);
//         const changePassword = {
//             password: hash
//         }
//         const updatedUser = await AdminUser.findByIdAndUpdate(req.user.id, changePassword, { new: true, runValidators: true });
//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: 'Client not found' });
//         }
//         return res.json({
//             success: true,
//             message: "Your Password Has Been Changed Successfully",
//         });

//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.delete('/disableuser/:id', auth, async (req, res) => {
//     try {
//         const deleteUser = await AdminUser.findByIdAndDelete(req.params.id);
//         if (!deleteUser) {
//             return res.status(400).json({ success: false, message: 'AdminUser not found' });
//         }

//         return res.json({ success: true, message: 'AdminUser deleted successfully!' });
//     }
//     catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }
// });

// router.put('/updateprofile', auth, async (req, res) => {
//     //check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = [
//         "fname", "number", "image", "username", "location", "description", "dob", "lname", "token", "deviceToken"

//     ];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     try {
//         const updatedUser = await AdminUser.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: 'AdminUser not found' });
//         }
//         return res.json({
//             success: true,
//             message: "AdminUser Updated",
//             updatedUser
//         });
//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: "Internal server error",
//             success: false,
//             error: error.message

//         });
//     }

// });

// router.put('/updateuser/:id', auth, async (req, res) => {
//     //check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = [
//         "fname", "number", "image", "username", "location", "description", "dob", "lname", "token", "deviceToken","status"

//     ];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//         const users = await User.find({}).select("-password");
//         return res.json({
//             success: true,
//             message: "User Updated",
//             updatedUser,
//             users
//         });
//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: "Internal server error",
//             success: false,
//             error: error.message

//         });
//     }

// });

// router.put('/community/:id', auth, async (req, res) => {
//     //check allowed params
//     const updates = Object.keys(req.body);
//     const allowedUpdates = [
//     "description",
//     "image",
//     "title",
//     "status",
//     "zipCode"
//     ];
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperations) {
//         return res.status(400).json({ success: false, message: 'Invalid API Paramaters' });
//     }

//     try {
//         const updatedCommunity = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!updatedCommunity) {
//             return res.status(404).json({ success: false, message: 'Community not found' });
//         }
//         const community = await Community.find({}).populate('user', { password: 0 })
//         return res.json({
//             success: true,
//             message: "Community Updated",
//             updatedCommunity,
//             community
//         });
//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: "Internal server error",
//             success: false,
//             error: error.message

//         });
//     }

// });

// router.get('/communitycomments/:id', auth, async function (req, res) {
//     try {
//         const communityComments = await CommunityComment.find({ community: req.params.id }).populate('user', { password: 0 }).populate('community').sort({ _id: -1 })
//         return res.json({
//             success: true,
//             communityComments
//         });

//     } catch (error) {
//         console.log('Error:', error.message);
//         res.status(500).json({
//             message: error.message,
//             success: false,
//             error: "Internal server error"
//         });
//     }

// });

// module.exports = router;