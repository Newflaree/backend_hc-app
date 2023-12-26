// ExpressJS
import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
// Middlewares
import { validateFields } from '../../../middlewares';


const router = Router();

// PATH: /api/admin/login
router.post( '/login', [
  check( 'email', 'La dirección de correo es un campo requerido' ).isEmail(),
  check( 'password', 'La contraseña debe ser de mínimo 6 carácteres' ).isLength({ min: 6 }),
  validateFields
], (req, res) => {
  res.status( 200 ).json({
    message: 'Admin Logged'
  });
});


export default router;
