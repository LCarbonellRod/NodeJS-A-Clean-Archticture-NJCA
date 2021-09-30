import { Router } from 'express';
import actions from './post.controller';
const keycloak = require('../../../loaders/keycloak-config').getKeycloak();


// Define router.. 
var router = Router();


router.route('/new')
    .post(actions.createPost);

router.route('/load/:postId')
    .get(actions.getPost)

router.route('/getResponse')
    .get(actions.getResponse);

router.route('/anonymous')
    .get(actions.anonymous);

router.route('/user')
    .get(keycloak.protect('user'), actions.user);

router.route('/admin')
    .get(keycloak.protect('admin'), actions.admin);

router.route('/allUser')
    .get(keycloak.protect(['admin', 'user']), actions.allUser);




export default router;