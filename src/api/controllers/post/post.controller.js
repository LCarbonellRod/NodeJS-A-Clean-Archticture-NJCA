import initTracer from '@yp-chassis/chassisjs';

import logger from "../../../loaders/logger";

async function getResponse(req , res , next) {
    res.json({ title:"Luis", body: "carbonell"})
    try {
        console.log("begin")
        logger.log("info" , "asd");
        const tracer = initTracer("hello-world");
        logger.log("info", "tracer")
        var span = tracer.startSpan("formatString")
        span.log({
            event: "string-format",
            value: "helloStr",
        });
        span.finish();
        console.log("end")
    }
    catch (e)
    {
        console.log(e);
    }

};


async function paramsPostId(req , res , next , postId){
    console.log(postId)
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
    paramsPostId,
    getPost,
    getResponse
};

export default actions;