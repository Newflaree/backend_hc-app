// ExpressJS
import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  authLoginController,
  authRegisterController
} from '../controllers';
// Middlewares
import { validateFields } from '../../../middlewares';


const router = Router();

// PATH: /api/auth/register
router.post( '/register', [
  check( 'name', 'El nombre es un campo requerido' ).not().isEmpty(),
  check( 'email', 'La dirección de correo es un campo requerido' ).isEmail(),
  check( 'password', 'La contraseña debe ser de mínimo 6 carácteres' ).isLength({ min: 6 }),
  validateFields
], authRegisterController );


// PATH: /api/auth/login
router.post( '/login', [
  check( 'email', 'La dirección de correo es un campo requerido' ).isEmail(),
  check( 'password', 'La contraseña debe ser de mínimo 6 carácteres' ).isLength({ min: 6 }),
  validateFields
], authLoginController );


export default router;
