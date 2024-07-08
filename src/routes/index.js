const express = require('express');
const userAuthRoute = require('./userAuth.route')
const taskRoute = require('./task.route')
const todoRoute = require('./todo.route')


const firebaseAuthMiddleware = require('../middlewares/firebaseAuth')
const mongoAuthMiddleware = require('../middlewares/mongoAuth')

const router = express.Router();

const defaultRoutes = [
    {
        path: '/userAuth',
        route: userAuthRoute,
    },
    {
        path: '/task',
        route: taskRoute,
        middlewares: [firebaseAuthMiddleware, mongoAuthMiddleware]
    },
    {
        path: '/todo',
        route: todoRoute,
        middlewares: [firebaseAuthMiddleware, mongoAuthMiddleware]
    },

];


defaultRoutes.forEach((route) => {
    router.use(route.path, ...(route.middlewares || []), route.route);
});

module.exports = router;
