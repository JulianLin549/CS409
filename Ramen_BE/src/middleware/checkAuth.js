//all the middle goes here
const Store = require('../models/store');
const Comment = require('../models/comment');
const User = require('../models/user');
const Review = require("../models/review");
const userRole = require("../enums/user-role");
const response = require('../modules/responseMessage');
passport = require('passport');

const middlewareObj = {}

middlewareObj.jwtAuth = async (req, res, next) => {
    passport.authenticate('jwt',
        {session: false, failWithError: true},
        (err, user, info) => {
            if (err) return next(err);
            if (user) {
                req.user = user;
                next();
            } else {
                return response.unAuthorized(res, "Please retry to log in.")
            }
        })(req, res, next);
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return response.unAuthorized(res, "You must log in to see.");
    }
}

middlewareObj.isAdmin = async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.userRole !== userRole.ADMIN) return response.forbidden(res, "Failed Admin Authorization.")
        next();
    } else {
        return response.unAuthorized(res, "You must log in to see.")
    }
}


middlewareObj.isStoreOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        let foundUser = await User.findById(req.user._id);
        let foundStore = await Store.findById(req.params.id);
        if (foundStore) response.notFound(res, "Failed to find store")

        if (foundUser.userRole === userRole.ADMIN || (foundUser.userRole === userRole.STORE_OWNER && foundStore.owners.contains(req.user._id))) {
            next();
        } else {
            return response.forbidden(res, "The user is not owner");
        }
    } else {
        return response.unAuthorized(res, "You must log in to see");
    }
};


middlewareObj.isCommentOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const commentId = req.body?.commentId;
        let foundComment = await Comment.findById(commentId);
        if (!foundComment) return response.notFound(res, "Failed to find comment")

        if (req.user._id.equals(foundComment.author)) {
            res.locals.foundComment = foundComment;
            next()
        } else {
            return response.forbidden(res, "User is not the commenter");
        }

    } else {
        return response.unAuthorized(res, "You must log in to see");
    }
};


middlewareObj.isReviewOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const reviewId = req.body?.reviewId;
        let foundReview = await Review.findById(reviewId);
        if (!foundReview) return response.notFound(res, "Failed to find the review")

        if (req.user._id.equals(foundReview.author)) {
            res.locals.foundReview = foundReview;
            next()
        } else {
            return response.forbidden(res, "The user is not the owner of the review");
        }

    } else {
        return response.unAuthorized(res, "You must log in to see");
    }
};


module.exports = middlewareObj;