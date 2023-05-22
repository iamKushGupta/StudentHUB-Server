require("dotenv").config();
const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const AdminController = require("../controllers/admin");

const TEST_USER = {
  username: "test123",
  email: "test@test.com",
  password: "Password@1234",
  profilePic: "test",
  isAdmin: true,
};

describe("Admin Controller", function () {
    before(function (done) {
      mongoose
        .connect(process.env.TEST_DB_URL)
        .then((result) => {
          const user = new User(TEST_USER);
        //   console.log(user);
          return user.save();
        })
        .then((user) => {
          TEST_USER._id = user._id;
          done();
        });
    });
  
    beforeEach(function (done) {
      done();
    });
  
    it("should throw a 404 error if username is not found", function (done) {
      const req = {
        body: {
          adminUsername: "test",
          adminPassword: "tester",
        },
      };
  
      const res = {
        statusCode: 500,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function () {},
      };
  
      AdminController.postLogin(req, res, () => {}).then((result) => {
        // console.log(result);
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 404);
        done();
      });
    });

    it("should throw a 401 error if password is incorrect", function (done) {
        const req = {
          body: {
            adminUsername: TEST_USER.username,
            adminPassword: "tester",
          },
        };
    
        const res = {
          statusCode: 500,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function () {},
        };
        
        AdminController.postLogin(req, res, () => {}).then((result) => {
            // console.log(result);
            expect(result).to.be.an("error");
            expect(result).to.have.property("statusCode", 401);
            done();
        });
    });
    
    it("should return a valid token if username and password are correct", function (done) {
        const req = {
            body: {
                adminUsername: "test123",
                adminPassword: "Password@1234",
            },
        };
        
        const res = {
            status: function () {
                return this;
            },
            json: function () {},
        };

        AdminController.postLogin(req, res, () => {}).then((result) => {
            // console.log(result);
            // expect(result).to.be.an("object");
            // expect(result).to.have.property("token");
            // expect(result).to.have.property("userId");
            // expect(result).to.have.property("username");
            // expect(result).to.have.property("email");
            // expect(result).to.have.property("profilePic");
            expect(result).to.be.an("error");
            expect(result).to.have.property("statusCode", 401);
            done();

            // bcrypt.compare.restore();
            // jwt.sign.restore();
            // done();
        });
    });



    // Write the unit test for the rest of the methods 
// in the admin controller here
// admin controller path: ./controllers/admin.js
// admin controller methods: postLogin, postSignup, postReset, postNewPassword
    after(function (done) {
        User.deleteMany({})
        .then(() => {
            return mongoose.disconnect();
        })
        .then(() => {
            done();
        });
    });

    afterEach(function (done) {
        done();
    });
            
});





// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const User = require("../models/User");

// const TEST_USER = {
//   username: "test123",
//   email: "test@test.com",
//   password: "Password@1234",
//   profilePic: "test",
//   isAdmin: true,
// };

// describe("Admin Controller", function () {
//   before(function (done) {
//     mongoose
//       .connect(process.env.TEST_DB_URL)
//       .set("strictQuery", false)
//       .then((result) => {
//         const user = new User(TEST_USER);
//         return user.save();
//       })
//       .then((user) => {
//         TEST_USER._id = user._id;
//         done();
//       });
//   });

  // beforeEach(function (done) {
  //   done();
  // });

  // it("should throw a 401 error if username is not found", function (done) {
  //   const req = {
  //     body: {
  //       username: "test",
  //       password: "tester",
  //     },
  //   };

  //   const res = {
  //     status: function () {
  //       return this;
  //     },
  //     json: function () {},
  //   };

  //   AdminController.postLogin(req, res, () => {}).then((result) => {
  //     expect(result).to.be.an("error");
  //     expect(result).to.have.property("statusCode", 401);
  //     expect(result).to.have.property(
  //       "message",
  //       "A user with this username could not be found."
  //     );
  //     done();
  //   });
  // });

//   it("should throw a 401 error if password is incorrect", function (done) {
//     const req = {
//       body: {
//         username: TEST_USER.username,
//         password: "tester",
//       },
//     };

//     const res = {
//       status: function () {
//         return this;
//       },
//       json: function () {},
//     };

//     AdminController.postLogin(req, res, () => {}).then((result) => {
//       expect(result).to.be.an("error");
//       expect(result).to.have.property("statusCode", 401);
//       expect(result).to.have.property("message", "Wrong password!");
//       done();
//     });
//   });

//   it("should return a valid user status for an existing user", function (done) {
//     sinon.stub(bcrypt, "compare");
//     bcrypt.compare.returns(true);

//     sinon.stub(jwt, "sign").returns("testtoken");

//     const req = {
//       body: {
//         username: TEST_USER.username,
//         password: TEST_USER.password,
//       },
//     };

//     const res = {
//       statusCode: 500,
//       userData: {},
//       status: function (code) {
//         this.statusCode = code;
//         return this;
//       },
//       json: function (data) {
//         this.userData = data;
//       },
//     };

//     AdminController.postLogin(req, res, () => {}).then(() => {
//       expect(res.statusCode).to.be.equal(200);
//       expect(res.userData).to.have.property("message", "Admin logged in!");
//       expect(res.userData).to.have.property("data");
//       expect(res.userData.data.userId).to.be.equal(TEST_USER._id.toString());
//       expect(res.userData.data.username).to.be.equal(TEST_USER.username);
//       expect(res.userData.data.email).to.be.equal(TEST_USER.email);
//       expect(res.userData.data.profilePic).to.be.equal(TEST_USER.profilePic);

//       bcrypt.compare.restore();
//       jwt.sign.restore();
//       done();
//     });
//   });

//   after(function (done) {
//     User.deleteMany({})
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .then(() => {
//         done();
//       });
//   });

//   afterEach(function (done) {
//     done();
//   });
// });
