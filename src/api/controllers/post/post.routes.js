import { Router } from 'express';
import actions from './post.controller';


// Define router.. 
var router = Router();

router.param('postId' ,  actions.paramsPostId);



router.route('/new')
    .post(actions.createPost);

router.route('/load/:postId')
    .get(actions.getPost)

router.route('/getResponse')
    .get(actions.getResponse);


    

export default router;