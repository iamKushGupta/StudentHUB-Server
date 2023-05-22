require("dotenv").config();
const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const DataController = require("../controllers/data");

const TEST_USER = {
    username: "test123",
    email: "test@test.com",
    password: "Password@1234",
    profilePic: "test",
};

describe("Data Controller", function () {
    before(function (done) {
        mongoose.set("strictQuery", false);
        mongoose
        .connect(process.env.TEST_DB_URL)
        .then((result) => {
            const user = new User(TEST_USER);
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

	it("should return a 200 status code for getting issues", function (done) {
        const req = {
                userId: TEST_USER._id.toString(),
            };

        const res = {
            statusCode: 500,
            userData: {},
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };
        
        DataController.getIssues(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Posts fetched!");
            done();
        });
    });

    // getSuggestedUsers

    it("should return a 200 status code fetching Suggested Users", function (done) {

            const req = {
            userId: TEST_USER._id.toString(),
        };
        
        const res = {
            statusCode: 500,
            userData: {},
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };

        DataController.getSuggestedUsers(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Suggested users fetched!");
            done();
        });
    });

// getTrendingIssues

	it("should return a 200 status code for fetching Trending Issues", function (done) {
        const req = {
            params: {
                username: TEST_USER.username,
            },
        };	
        const res = {
            statusCode: 500,
            userData: [],
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };

        DataController.getTrendingIssues(req, res, () => {}).then(() => {
                    expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Trending issues fetched!");
            done();
        });
	});

// getCategoryIssues

	it("should return a 200 status code for fetching Category Issues", function (done) {
        const req = {
            params: {
                category: "electricity",
            },
        };  
        const res = {
            statusCode: 500,
            userData: [],
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };

        DataController.getCategoryIssues(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Category issues fetched!");
            done();
        });
    });

    // getNotifications

    it("should return a 200 status code for fetching Notifications", function (done) {
        const req = {
            userId: TEST_USER._id.toString(),
        };
        const res = {
            statusCode: 500,
            userData: [],
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };

        DataController.getNotifications(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Notifications fetched!");
            done();
        });
    });

    // getBookmarks

    it("should return a 200 status code for fetching Bookmarks", function (done) {
        const req = {
            userId: TEST_USER._id.toString(),
        };
        const res = {
            statusCode: 500,
            userData: [],
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userData = data;
            },
        };

        DataController.getBookmarks(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userData).to.have.property("message", "Bookmarks fetched!");
            done();
        });
    });

    

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
