const crypto = require("crypto");
var geoip = require("geoip-lite");
const User = require("../models/user");
const Review = require("../models/review");
const ladnMarks = require("../models/landmar");
const Facility = require("../models/facility.js");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodeMailer");
var logger = require("../logs/logger");
require("dotenv").config();
const sendgridTransport = require("nodemailer-sendgrid-transport");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const { validationResult } = require("express-validator");
const facility = require("../models/facility.js");
exports.login = (req, res, next) => {
  console.log("This is the users IP address");
  console.log(req.ip);
  var ip = req.ip;
  var geo = geoip.lookup(ip);
  console.log("This is the geo location object that we extracted from the IIP");
  console.log(ip);
  //now we can extract coordinates and use them
  //this will give the local IP and therefore extracting the coordinates is not a good idea
  //then attach the latitude and longituide to the sessions object
  //use test case coordinates
  //while rendering the data fliter the facilities based on the nearest landmark coordinates
  //this is done based on the euclidean distance
  //this is a test IP setting the curr IP for haldwani to test the code

  //finding the nearest landmark for this prop
  //be sure to make an index on your database before running this qery
  if (req.session.isLoggedIn === true) {
    ladnMarks
      .find({
        location: {
          $near: {
            $geometry: {
              type: "point",
              coordinates: [76.638958, 12.2840288],
            },
          },
        },
      })
      .limit(1)
      .exec()
      .then((landmark) => {
        req.session.LMLong = landmark[0].location.coordinates[0];
        req.session.LMLatd = landmark[0].location.coordinates[1];
        req.session.sort = -1;
        req.session.distance = 100;
        req.session.rating = 5;
        res.redirect("/home");
      })
      .catch((err) => {
        res.render("500.ejs");
        logger.log({
          level: "error",
          message: `500 || ${err} || login handler`,
        });
      });
  } else {
    res.render("login.ejs", {
      pageTitle: "Login",
      error1: req.flash("NoUser"), //no user found
      error2: req.flash("WrongPassword"), //password error
      user: "",
    });
  }
};
exports.signup = (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "signup",
    error: "",
    user_name: "",
    email: "",
    contact: "",
  });
};

exports.admin_service = (req, res, next) => {
  req.body.user = req.session.userId; //this is not working we need to extract the user objrct id from the sessions
  User.findById(req.body.user, { title: 1, image: 1, rating: 1 })
    .populate("facility")
    .then((user) => {
      res.render("admin_service", {
        pageTitle: "admin",
        facilities: user.facility,
      });
    })
    .catch((err) => {
      logger.error({
        level: "error",
        message: `500 || ${err} || admin services handler`,
      });
    });
};

exports.addUser = (req, res, next) => {
  const Errors = validationResult(req).errors;
  if (Errors.length > 0) {
    return res.status(422).render("signup.ejs", {
      pageTitle: "signup",
      error: Errors[0],
      user_name: req.body.user_name,
      email: req.body.email,
      contact: req.body.contact,
    });
  }
  if (req.body.password === req.body.confirm) {
    bcrypt
      .hash(req.body.password, 13)
      .then((hashedPassword) => {
        User.create({
          name: req.body.user_name,
          email: req.body.email,
          contact: req.body.contact,
          password: hashedPassword,
          facility: [],
        }).then((user) => {
          res.render("login.ejs", {
            pageTitle: "Login",
            error1: req.flash("NoUser"), //no user found
            error2: req.flash("WrongPassword"), //password error
            user: req.body.user_name,
          });
          let mailOptions = {
            to: req.body.email,
            from: process.env.MAIL_FROM,
            subject: "Signup Confirmation",
            html: `<h1>Hey user these are your credentials</h1>
                    <ul>
                    <li><h3>User name: ${req.body.user_name}</h3></li>
                    <li><h3>Email : ${req.body.email}</h3></li>
                    <li><h3>Password: ${req.body.password}</h3></li>
                    
                    </ul>`,
          };
          return transporter
            .sendMail(mailOptions)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => logger.log({ level: "error", message: err }));
        });
      })
      .catch((err) => {
        logger.error(`500 || ${err} || create user handler`);
      });
  }
};
exports.validateUser = (req, res, next) => {
  User.find({
    name: req.body.user_name,
  })
    .then((user) => {
      if (user.length > 0) {
        return bcrypt
          .compare(req.body.password, user[0].password)
          .then((matched) => {
            if (matched === true) {
              req.session.isLoggedIn = true;
              req.session.userId = user[0]._id;
              ladnMarks
                .find({
                  location: {
                    $near: {
                      $geometry: {
                        type: "point",
                        coordinates: [79.4890954, 29.1946264],
                      },
                    },
                  },
                })
                .limit(1)
                .exec()
                .then((landmark) => {
                  req.session.LMLong = landmark[0].location.coordinates[0];
                  req.session.LMLatd = landmark[0].location.coordinates[1];
                  req.session.sort = -1;
                  req.session.distance = 100;
                  req.session.rating = 5;
                  res.redirect("/home");
                })
                .catch((err) => {
                  logger.log({
                    level: "error",
                    message: `500 || ${err} || user validation handler`,
                  });
                  res.render("500.ejs");
                });
            } else {
              req.flash("WrongPassword", "Wrong Password!!");
              res.render("login.ejs", {
                pageTitle: "Login",
                error1: req.flash("NoUser"), //no user found
                error2: req.flash("WrongPassword"), //password error
                user: req.body.user_name,
              });
            }
          });
      } else {
        req.flash("NoUser", "No user found!!");
        res.statusCode = 420;
        res.redirect("/");
      }
    })
    .catch((err) => {
      logger.log({
        level: "error",
        message: `500 || ${err} || user validation handler`,
      });
    });
};

exports.addProperty = (req, res, next) => {
  res.render("add_property.ejs", {
    pageTitle: "Add property",
    error: "",
    prop_name: "",
    address: "",
    contact: "",
    email: "",
    location: "",
    image: "",
    desc: "Add a description of your property",
  });
};

exports.registerProp = (req, res, next) => {
  const imageUrl = req.file; //now we access the file field in the incoming request
  // console.log('*********************************************************************************');
  // console.log('This is the image file data we have which is a buffer basically');
  // console.log(imageUrl) //don't know for sure but you need to use some other name then the one you are using for file
  // console.log('*********************************************************************************');
  const Errors = validationResult(req).errors;
  if (imageUrl) {
    req.session.image = imageUrl.path; //this is the path to the facility image
    if (Errors.length > 0) {
      return res.status(422).render("add_property.ejs", {
        pageTitle: "Add property",
        error: Errors[0],
        prop_name: req.body.prop_name,
        location: req.body.location,
        image: req.body.image,
        desc: req.body.desc,
        address: req.body.address,
        email: req.body.email,
        contact: req.body.contact,
      });
    }
    req.body.user = req.session.userId;
    //the gmail link string needs to be preprocessed to extract the coordinates
    var link = req.body.location;
    //console.log(`THis is the original link ${link}`);
    link = link.substring(link.indexOf("@") + 1);
    //console.log(`This is the link after first preprocessing ${link}`)
    link = link.split(",");
    //these are the coordinates and will be used
    //to construct the geoJSON object
    const latd = parseInt(link[0]);
    const long = parseInt(link[1]);
    //  console.log(`Latitude:${latd} and longitude:${long}`)
    const facility = new Facility({
      title: req.body.prop_name,
      Glocation: req.body.location,
      property_type: req.body.prop,
      image: req.session.image,
      description: req.body.desc,
      rating: 5.0,
      location: {
        type: "Point",
        coordinates: [long, latd], //this is the geoJson notation that should be used
        //[langitutde and latitude]
      },
    });
    facility
      .save()
      .then((property) => {
        req.body.facility = property._id;
        return User.findById(req.body.user);
      })
      .then((user) => {
        const facilities = user.facility;
        facilities.push(req.body.facility);
        user.facility = facilities;
        return user.save();
      })
      .then((result) => {
        req.session.FacID = result._id;
        console.log("Facility added successfully!!");
        res.redirect("/admin");
        //need to add an async req to add the facility to the closest landmark
        return ladnMarks.find({});
      })
      .then((LM) => {
        // console.log('These are all the landmarks that we found');
        var distance = 10000000; //this will be used to calculate the min distacned landmark

        LM.forEach((mark) => {
          //calculating the distance for each landmark
          //using the general distance(euclidean to calculate the distance)
          var dist = Math.sqrt(
            Math.pow(mark.location.coordinates[0] - long, 2) +
              Math.pow(mark.location.coordinates[1] - latd, 2)
          );
          if (distance > dist) {
            distance = dist;
            req.session.LMID = mark._id;
          }
        });
        return ladnMarks.findOneAndUpdate(
          { _id: req.session.LMID },
          { $push: { facilities: req.session.FacID } }
        );
      })
      .then((result) => {
        //console.log('The facility is added to one of the nearest landmarks')
        //console.log(result);
      })

      .catch((err) =>
        logger.log({
          level: "error",
          message: `500 || ${err} || prop registration handler`,
        })
      );
  } else {
    return res.status(422).res.render("add_property.ejs", {
      pageTitle: "Add property",
      error: "Use a file of valid format",
      prop_name: req.body.prop_name,
      location: req.body.location,
      image: "",
      desc: req.body.desc,
    });
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
// this handler is for forgot password
exports.ChangingPassword = async (req, res, next) => {
  //attaching the current user to the req
  res.render("forgot.ejs", {
    error: "",
    message: "",
  });
};
exports.remindPassword = async (req, res, next) => {
  let email = req.body.email;
  const result = await User.find({ email: email });
  if (result.length > 0) {
    let mailOptions = {
      to: email,
      from: process.env.MAIL_FROM,
      subject: "Password Change",
      text: "Use the link to change the password if not sent by you \n Then sorry my friend you are fucked",
      html: `<h1>Use this link to change the password</h1>
                <a href='http://localhost:4000/ConfirmChange1/${email}'>Change password</a>`,
    };
    //since this sending of email might take some time therefore processing it asynchronously
    return transporter
      .sendMail(mailOptions)
      .then((result) => {
        console.log("mail sent successfully");
        //render the same page with a message
        res.render("forgot.ejs", {
          error: "",
          message: "Check your email mail is sent!!",
        });
      })
      .catch((err) => {
        logger.log({
          level: "error",
          message: `500 || ${err} || sending mail failed for password change  handler`,
        });
        res.render("forgot.ejs", {
          error: "",
          message: "failed to send mail try again",
        });
      });
  } else {
    res.render("forgot.ejs", {
      error: "No such email found!",
      message: "",
    });
  }
};
exports.changePassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.status(422).res.render("passwordChange1.ejs", {
        user: req.session.userId,
        message: "",
        error: "Something went wrong on our side",
      });
    }
    req.session.token = buffer.toString("hex");
  });
  error = User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        return user;
      } else {
        req.flash("passwordChange", "No such user was found");
        res.render("passwordChange1.ejs", {
          user: req.session.userId,
          message: "",
          error: req.flash("passwordChange"),
        });
      }
    })
    .then((user) => {
      req.session.email = user.email;
      user.resetToken = req.session.token;
      user.resetTokenExpiration = Date.now() + 60000;
      return user.save();
    })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((matched) => {
        if (matched === true) {
          let mailOptions = {
            to: req.session.email,
            from: process.env.MAIL_FROM,
            subject: "Password Change",
            text: "Use the link to change the password if not sent by you \n Then sorry my friend you are fucked",
            html: `<h1>Use this link to change the password</h1>
                                <a href='http://localhost:4000/ConfirmChange/${req.session.userId}/${req.session.token}'>Change password</a>`,
          };
          //since this sending of email might take some time therefore processing it asynchronously
          return transporter
            .sendMail(mailOptions)
            .then((result) => {
              console.log("mail sent successfully");
              //render the same page with a message
              res.render("passwordChange1.ejs", {
                user: req.session.userId,
                message:
                  "A mail has been sent to your email id with password reset link",
                error: "",
              });
            })
            .catch((err) => {
              logger.log({
                level: "eror",
                message: `500 || ${err} || sending mail failed in the reset password handler`,
              });
              res.render("passwordChange1.ejs", {
                user: req.session.userId,
                message: "Sending mail failed please try again",
                error: "",
              });
            });
        } else {
          req.flash("passwordChange", "Wrong Password");
          res.render("passwordChange1.ejs", {
            user: req.session.userId,
            message: "",
            error: req.flash("passwordChange"),
          });
        }
      });
    })
    .catch((err) => {
      logger.log({ level: "error", message: err });
    });
};

exports.confirmPasswordChange = (req, res, next) => {
  User.findById(req.params.userId)
    //if you want to include a time restraint you can do like this
    //User.find({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then((user) => {
      if (user.resetToken == req.params.token) {
        let currDate = new Date();
        if (user.resetTokenExpiration.getTime() <= currDate.getTime()) {
          res.render("passwordChange2.ejs", {
            userId: user._id,
            error: "",
          });
        } else {
          res.render("passwordChange1.ejs", {
            user: req.session.userId,
            message: "",
            error: req.flash("Timeout error"),
          });
        }
      }
    })
    .catch((err) => {
      logger.log({
        level: "error",
        message: `500 || ${err} || in confirm password change handler`,
      });
    });
};

exports.confirmPasswordChange1 = (req, res, next) => {
  User.find({ email: req.params.email })
    //if you want to include a time restraint you can do like this
    //User.find({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
    .then((user) => {
      if (user) {
        res.render("passwordChange2A.ejs", {
          email: req.params.email,
          error: "",
        });
      } else {
        res.render("forgot.ejs", {
          message: "",
          error: req.flash("Timeout error"),
        });
      }
    })
    .catch((err) => {
      logger.log({
        level: "error",
        message: `500 || ${err} || in confirm passwor change 1  handler`,
      });
      res.render("500.ejs");
    });
};
exports.confirmChange = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("passwordChange2.ejs", {
      userId: req.body.userId,
      error: errors.errors[0].msg,
    });
  } else {
    User.findById(req.body.userId)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password).then((matched) => {
          if (matched === true) {
            return res.status(422).render("passwordChange2.ejs", {
              userId: req.body.userId,
              error: "This is same as your old password",
            });
          } else {
            return bcrypt.hash(req.body.password, 13).then((password) => {
              req.session.currPassword = password;
              User.findById(req.body.userId)
                .then((user) => {
                  user.password = req.session.currPassword;
                  req.session.currPassword = "";
                  return user.save();
                })
                .then((result) => {
                  console.log(result);
                  console.log("The password was changed successfully!!");
                  res.render("login.ejs", {
                    pageTitle: "Login",
                    error1: "", //no user found
                    error2: "", //password error
                    user: "",
                  });
                })
                .catch((err) => {
                  logger.log({
                    level: "error",
                    message: `500 || ${err} || confirm change  handler`,
                  });
                  return res.status(422).render("passwordChange2.ejs", {
                    userId: req.body.userId,
                    error: "Faield to update password",
                  });
                });
            });
          }
        });
      })
      .catch((err) => {
        logger.log({
          level: "error",
          message: `500 || ${err} || confirm change handler handler`,
        });
        return res.status(422).render("passwordChange2.ejs", {
          userId: req.body.userId,
          error: "Try again",
        });
      });
  }
};
exports.confirmChange1 = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("passwordChange2.ejs", {
      email: req.body.email,
      error: errors.errors[0].msg,
    });
  } else {
    User.find({ email: req.body.email })
      .then((user) => {
        user = user[0];
        bcrypt.compare(req.body.password, user.password).then((matched) => {
          if (matched === true) {
            return res.status(422).render("passwordChange2A.ejs", {
              email: req.body.email,
              error: "This is same as your old password",
            });
          } else {
            let userName = "";
            return bcrypt
              .hash(req.body.password, 14)

              .then((password) => {
                User.find({ email: req.body.email })
                  .then((user) => {
                    user = user[0];
                    userName = user.user;
                    user.password = password;
                    return user.save();
                  })
                  .then((result) => {
                    console.log(result);
                    console.log("The password was changed successfully!!");
                    res.render("login.ejs", {
                      pageTitle: "Login",
                      error1: "", //no user found
                      error2: "", //password error
                      user: userName,
                    });
                  })
                  .catch((err) => {
                    logger.log({
                      level: "error",
                      message: `500 || ${err} || confirm change 1 handler`,
                    });
                    return res.status(422).render("passwordChange2A.ejs", {
                      email: req.body.email,
                      error: "Failed to update password",
                    });
                  });
              });
          }
        });
      })
      .catch((err) => {
        logger.log({
          level: "error",
          message: `500 || ${err} || confirm change 1 handler`,
        });
        return res.status(422).render("passwordChange2A.ejs", {
          email: req.body.email,
          error: "Try again",
        });
      });
  }
};
exports.reviews = async (req, res, next) => {
  const facs = await User.findById(req.session.userId).populate("facility", {
    title: 1,
    image: 1,
    rating: 1,
  });
  let facilities = [];
  for (let facility in facs.facility) {
    facility = facs.facility[facility];
    let review = await Review.find(
      { facility: facility.title },
      { rating: 1, content: 1 },
      { sort: { created_at: -1 } }
    )
      .limit(3)
      .populate("user", { name: 1 });
    facilities.push({
      title: facility.title,
      image: facility.image,
      rating: facility.rating,
      reviews: review,
    });
  }
  res.render("reviews.ejs", {
    title: "Review",
    facilities: facilities,
  });
};
exports.facReview = async (req, res, next) => {
  let reviews = await Review.find(
    { facility: req.params.facility },
    { rating: 1, content: 1 },
    { sort: { created_at: -1 } }
  ).populate("user", { name: 1, _id: -1 });

  let avg = 0;
  let star1 = 0,
    star2 = 0,
    star3 = 0,
    star4 = 0,
    star5 = 0;
  reviews.forEach((review) => {
    avg += review.rating;
    if (review.rating == 1) star1++;
    if (review.rating == 2) star2++;
    if (review.rating == 3) star3++;
    if (review.rating == 4) star4++;
    if (review.rating == 5) star5++;
  });
  star1 = star1 / avg;
  star2 = star2 / avg;
  star3 = star3 / avg;
  star4 = star4 / avg;
  star5 = star5 / avg;
  avg /= reviews.length;
  res.render("fac-reviews.ejs", {
    facility: req.params.facility,
    title: "Stats",
    reviews: reviews,
    avgRating: avg,
    star1: star1 * 100,
    star2: star2 * 100,
    star3: star3 * 100,
    star4: star4 * 100,
    star5: star5 * 100,
  });
};
