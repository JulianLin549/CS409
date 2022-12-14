const express = require('express'),
    router = express.Router(),
    log = require('../../modules/logger'),
    passport = require('passport'),
    middleware = require('../../middleware/checkAuth'),
    response = require('../../modules/responseMessage'),
    userService = require('../../service/user.service'),
    pagination = require('../../utils/pagination'),
    config = require("../../config/global-config"),
    User = require('../../models/user');
    bcrypt = require("bcrypt")


router.post('/login',
    async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = await User.findOne({'username': username});
            if (user == null) {
                return response.unAuthorized(res, "Not found user!");
            }
            const isValid =  await bcrypt.compare(password, user.password);
            if (!isValid) {
                return response.unAuthorized(res, "Wrong username or password!");
            }
            const token = await userService.signToken(user);
            res.cookie('access_token',token, { 
                maxAge: 900000, 
                httpOnly: true,
                sameSite : "none",
                secure: true,
                });
            //console.log(token);
            response.success(res, {user, token});
        } catch (error) {
            log.info(error)
            response.badRequest(res, error);
        }
    }
)

router.post('/signup',
    async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            let user = await User.findOne({'username': username});
            if (user != null) {
                return response.badRequest(res, "Username has been used!");
            }
            const hashedPassword = await bcrypt.hash(password, salt);
            user = new User({
                username: username,
                password: hashedPassword,
            })
            user = await user.save();
            const token = await userService.signToken(user);
            res.cookie('access_token',token, { 
                maxAge: 900000, 
                httpOnly: true,
                sameSite : "none",
                secure: true,
                });
            response.success(res, {user, token});
        } catch (error) {
            log.info(error)
            response.badRequest(res, error);
        }
    }
)

router.get('/userInfo', middleware.jwtAuth,
    async (req, res, next) => {
        if (req.user) {
            let {password, __v, ...user} = req.user._doc; //remove password and other sensitive info from user object
            response.success(res, user);
        }
        response.notFound(res, "Failed to find the user");
    });

router.get('/unReadNotiCount', middleware.jwtAuth,
    async (req, res, next) => {
        if (req.user) {
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            res.writeHead(200, headers);

            setInterval(async () => {
                const count = await userService.notificationCount(req.user._id);
                res.write("data: " + count + "\n\n")
            }, 1000 * 10)
        } else {
            response.notFound(res, "Failed to find the user");
        }
    });


router.get('/notifications', middleware.jwtAuth, async (req, res, next) => {
    try {
        if (req.user) {
            const {perPage, pageNumber} = pagination(req.query.page);
            const {notifications, count} = await userService.getNotifications(req.user, req.query.page)

            response.success(res, {
                notifications: notifications,
                current: pageNumber,
                pages: Math.ceil(count / perPage),
            });

            for await (let notification of notifications) {
                notification.isRead = true;
                await notification.save();
            }
            return null;
        } else {
            response.notFound(res, "Failed to find the user");
        }
    } catch (error) {
        log.error(error);
        return response.internalServerError(res, error.message);
    }
});

router.get('/followedStore', middleware.jwtAuth, async (req, res, next) => {

    try {
        const {perPage, pageNumber} = pagination(req.query.page);
        if (req.user) {
            const {followedStores, count} = await userService.getFollowedStores(req.user, req.query.page)

            return response.success(res, {
                stores: followedStores,
                current: pageNumber,
                pages: Math.ceil(count / perPage),
            });
        } else {
            return response.notFound(res, "Failed to find the user");
        }

    } catch (error) {
        log.error(error);
        return response.internalServerError(res, error.message);
    }
});


router.get('/reviewedStore', middleware.jwtAuth, async (req, res, next) => {
    try {
        const {perPage, pageNumber} = pagination(req.query.page);
        if (req.user) {
            const {reviews, count} = await userService.getReviewedStores(req.user, req.query.page);
            return response.success(res, {
                reviews: reviews,
                current: pageNumber,
                pages: Math.ceil(count / perPage),
            });
        } else {
            return response.notFound(res, "Failed to find the user");
        }

    } catch (error) {
        log.error(error);
        return response.internalServerError(res, error.message);
    }
});

router.get('/isUserInRamenGroup', passport.authenticate('facebookToken', {session: false}),
    async (req, res) => {
        const isUserInGroup = await  userService.isUserInRamenGroup(req.user);
        response.success(res, {isUserInGroup});
    });

module.exports = router