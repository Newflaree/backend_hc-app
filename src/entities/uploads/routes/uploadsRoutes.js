// ExpressJS
import { Router } from 'express';
// Controllers
import { uploadCloudinaryImageController } from '../controllers';
// Middlewares
import {
  validateFields,
  validateJWT
} from '../../../middlewares';


const router = Router();

router.put( '/image', [
  validateJWT,
  validateFields
], uploadCloudinaryImageController );



export default router;
