var chassis = require('@yp-chassis/chassisjs');
var initTracer = chassis.InitTracer;

import logger from "../../../loaders/logger";

async function getResponse(req , res , next) {

    try {
        res.json({ title:"This is a test", body: "response test"})
        logger.log("info", "begin")
        const tracer = initTracer("jaeger-title-tracer");
        logger.log("info", "tracer")
        var span = tracer.startSpan("span-example")
        span.log({
            event: "string-format",
            value: "helloStr",
        });
        span.log({
            event: "date-of-send",
            value: new Date().toISOString()
        })
        span.finish();
        logger.log("info", "end")
    }
    catch (e)
    {
        console.log(e);
    }

};

async function anonymous(req , res , next){
    res.json({ title: "Hello Anonymous"});
};

async function user(req , res , next){
    res.json({ title:"Hello", body: "User"})
};

async function admin(req , res , next){
    res.json("Hello Admin");
};

async function allUser(req , res , next){
    res.json("Hello All User");
};


async function createPost(req , res , next) {
    let user = req.body;
    let newUser = await userApps.createUser.execute(user);
    if (newUser.error != false) {
        res.json({
            code: newUser.code,
            message: newUser.message,
            error: newUser.error,
            data: false
        });
    } else {
        res.json({
            error: false,
            message: '',
            data: newUser,
            total: 1
        });
    }
};



async function getPost(req, res, next){

};


const actions = {
    createPost,
    getPost,
    getResponse,
    anonymous,
    user,
    admin,
    allUser
};

export default actions;