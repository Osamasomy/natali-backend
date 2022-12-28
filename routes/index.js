
const express = require('express');
const Joi = require('@hapi/joi')
// const multer = require('multer');
const mongoose = require('mongoose');

var nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const CompensationReport = require('../models/CompensationReport');
const EsppReport = require('../models/EsppReport');
const VestingSchedule = require('../models/VestingScheduleReport');
const HealthCareReport = require('../models/HealthCareReport');
const EmailVerification = require('../models/EmailVerification');

const baseEmail="compaim16@gmail.com"
const basePassword="hrlnrxwpwlhtuutl"       


const userSignupValidate = Joi.object({
    fname:    Joi.string().required(),
    email:    Joi.string().required().email(),
    password: Joi.string().required(),
});


const userLoginValidate = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
})


router.post('/signup', async (req, res) => {
    
    // validate api params for empty values
    const { error } = userSignupValidate.validate({
        fname:    req.body.fname,
        email:    req.body.email,
        password: req.body.password,
    });
    if (error) {
        return res.status(400).send({
            success: false,
            message: error.details[0].message
        });
    }
    
    let { lname, fname, email, number, image, password } = req.body
    try {

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({
                success: false,
                message: "Email already exists"
            })
        }
        
        
        let userNumber = await User.findOne({ number })
        
        if (userNumber) {
            return res.status(400).json({
                success: false,
                message: "User Number already exists"
            });
        };
        
        user = await new User({lname, fname, email, number, image, password})
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        user.password = hash;
        await user.save()
        return res.json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });
    }
})

router.post('/login', async (req, res) => {


    let { email, password } = req.body;
    
    // validate api params for empty values
    const { error } = userLoginValidate.validate(req.body);
    if (error) {
        return res.status(400).send({
            success: false,
            message: error.details[0].message
        });
    }

    try {
        let user = {};
        email = email.toLowerCase();
        user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.`
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        
        user.password = "It's always a mystery"
        return res.json({
            success: true,
            // token,
            user
        });

    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });
    }
});


/**
 * User Profile
 */

router.put("/profile/:id", async (req,res)=>{
    const id = req.params.id
    User.findOneAndUpdate({_id: id},req.body,{new: true},(err, doc)=>{
        if(err){
            return res.status(400).send({
                success: false,
                message: err
            });
            
        }
        return res.status(200).send({
            success: true,
            user: doc
        });
    })
})


/**
 * Compensations
 */

router.post("/compensationReport", async (req, res)=>{
    try {
        const cr = await new CompensationReport(req.body);
        await cr.save()
        return res.json({
            success: true,
            cr: cr,
        });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.get("/compensationReport/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const rep = await CompensationReport.find({ userID : id  });
        if (!rep) {
            return res.status(400).json({
                success: false,
                message: "No user Found"
            });
        }else{
            return res.status(400).json({
                success: true,
                data: rep,
                // message: "No user Found"
            });
        }
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.delete("/compensationReport/:id", async (req, res)=>{
    const id = req.params.id
    console.log(id);
    try {

        CompensationReport.findOneAndDelete({ _id : id  }, function (err, docs) {
            console.log(err,"<-----")
            if (err){
                // console.log(err)
                return res.status(400).json({
                    success: false,
                    message: "No user Found",
                    error: err
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                });
            }
        })        
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

/**
 * Vesting Schedule
 */

router.post("/vestingSchedule", async (req, res)=>{
    try {
        const cr = await new VestingSchedule(req.body);
        await cr.save()
        return res.json({
            success: true,
            cr: cr,
        });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.get("/vestingSchedule/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const rep = await VestingSchedule.find({ userID : id  });
        if (!rep) {
            return res.status(400).json({
                success: false,
                message: "No user Found"
            });
        }else{
            return res.status(400).json({
                success: true,
                data: rep,
                // message: "No user Found"
            });
        }
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.delete("/vestingSchedule/:id", async (req, res)=>{
    const id = req.params.id
    try {
        VestingSchedule.findOneAndDelete({ _id : id  }, function (err, docs) {
            if (err){
                // console.log(err)
                return res.status(400).json({
                    success: false,
                    message: "No user Found",
                    error: err
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                });
            }
        })        
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})


/**
 * ESPP REPORT
 */

 router.post("/espp", async (req, res)=>{
    try {
        const data = await new EsppReport(req.body);
        await data.save()
        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.get("/espp/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const rep = await EsppReport.find({ userID : id  });
        if (!rep) {
            return res.status(400).json({
                success: false,
                message: "No user Found"
            });
        }else{
            return res.status(400).json({
                success: true,
                data: rep,
                // message: "No user Found"
            });
        }
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.delete("/espp/:id", async (req, res)=>{
    const id = req.params.id
    
    try {

        EsppReport.findOneAndDelete({ _id : id  }, function (err, docs) {
            
            if (err){
                // console.log(err)
                return res.status(400).json({
                    success: false,
                    message: "No user Found",
                    error: err
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                });
            }
        })        
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

/**
 * Health Care Report
 */

 router.post("/healthCare", async (req, res)=>{
    try {
        const data = await new HealthCareReport(req.body);
        await data.save()
        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.get("/healthCare/:id", async (req, res)=>{
    const id = req.params.id
    try {
        const rep = await HealthCareReport.find({ userID : id  });
        if (!rep) {
            return res.status(400).json({
                success: false,
                message: "No user Found"
            });
        }else{
            return res.status(400).json({
                success: true,
                data: rep,
                // message: "No user Found"
            });
        }
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})

router.delete("/healthCare/:id", async (req, res)=>{
    const id = req.params.id
    
    try {

        HealthCareReport.findOneAndDelete({ _id : id  }, function (err, docs) {
            
            if (err){
                // console.log(err)
                return res.status(400).json({
                    success: false,
                    message: "No user Found",
                    error: err
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                });
            }
        })        
        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });   
    }    
})


router.put('/forgot-password', async function (req, res, next) {
    
    let { email } = req.body
    try {
        email = email.toLowerCase();
        email = await email.split(" ").join("");
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid email"
            });
        }

        const randomID = (count) => {
            var chars = '0123456789'.split('');
            var result = '';
            for (var i = 0; i < count; i++) {
                var x = Math.floor(Math.random() * chars.length);
                result += chars[x];
            }
            return result;
        }
        let tokenemail = randomID(4);
        
        emailVerify = await new EmailVerification({
            createdBy: user.id,
            token: tokenemail
        })
        emailVerify.save();
        let transporter = nodemailer.createTransport({
            // host: "smtp.mail.us-east-1.awsapps.com",
            // host: 'smtp.gmail.com',
            service: "gmail",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                user: baseEmail, // generated ethereal user
                pass: basePassword, // generated ethereal password
            },
        });

        let mailOptions = {
            from: baseEmail,
            to: email,
            subject: 'New Password Request',
            text: 'Hello,\n\n' + 'Please change your password with this token: ' + tokenemail + '.\n'
        };
        
        await transporter.sendMail(mailOptions)
        
        return res.json({
            success: true,
            userid: user._id,
            tokenemail,
            message: "Please check your email for new password"
        })
    }
    catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });
    }
});

router.put('/confirmpassword/:_id', async function (req, res) {
    let { token, password } = req.body
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params._id);
    if (!isValidObjectId) {
        return res.status(400).json({ success: false, message: 'Invalid object id' });
    }
    if (Object.keys(req.body).length < 1) {
        return res.status(400).json({ success: false, message: 'Fields required in body' });
    }
    try {
        const user = await EmailVerification.find({ createdBy: req.params._id }).sort({ _id: -1 })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user Found"
            });
        }
        if (token == user[0].token) {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);


            password = hash;
            let passwordBody = {
                password
            }

            const updatedUser = await User.findByIdAndUpdate(req.params._id, passwordBody, { new: true, runValidators: true });
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'AdminUser not found' });
            }
            return res.json({
                success: true,
                message: "Password Reset Succesfully"
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Enter Right Code"
            });
        }
    }
    catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({
            message: error.message,
            success: false,
            error: "Internal server error"
        });
    }
});



module.exports = router;