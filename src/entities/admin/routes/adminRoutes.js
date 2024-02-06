// ExpressJS
import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import { AdminLoginController } from '../controllers';
// Middlewares
import { validateFields } from '../../../middlewares';


const router = Router();

// PATH: /api/admin/login
router.post( '/login', [
  check( 'email', 'La dirección de correo es un campo requerido' ).isEmail(),
  check( 'password', 'La contraseña debe ser de mínimo 6 carácteres' ).isLength({ min: 6 }),
  validateFields
], AdminLoginController );
// TODO: PATH: /api/admin/getAllLocutors
// TODO: PATH: /api/admin/getAllUsers
// TODO: PATH: /api/admin/deleteUserById
// TODO: PATH: /api/admin/updateRoleById
// TODO: PATH: /api/admin/


export default router;
