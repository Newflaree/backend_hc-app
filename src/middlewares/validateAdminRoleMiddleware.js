// Express
import { request, response } from 'express';
import {logger} from '../utils';


export const validateAdminRole = async ( req = request, res = response, next ) => {
  const { id } = req.params;

  if ( req.user ) return res.status( 500 ).json({
    ok: false,
    message: 'Correo electrónico o contraseña incorrectos'
  })

  try {
    const { role, id } = req.user;

    if ( role !== 'ADMIN_ROLE' && id !== id ) return res.status( 401 ).json({
      ok: false,
      message: 'Correo electrónico o contraseña incorrectos'
    });

    console.log( 'Is Admin' );

    next();
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'validateAdminRoleMiddleware' );

    res.status( 401 ).json({
      ok: false,
      message: 'Token no válido'
    });
  }
}
