// Express
import { request } from 'express';
// Services
import {
  checkAdminUserService,
  checkUserBlockedService,
  checkValidPasswordService,
  findUserByEmailService,
} from '../services';
import { db } from '../../../config';
// Utils
import { logger, generateJWT } from '../../../utils';



const AdminLoginModule = async ( req = request ) => {
  const { email, password } = req.body;

  try {
    await db.connect();
    const { user } = await findUserByEmailService( email );

    if ( !user ) {
      await db.disconnect();

      return {
        statusCode: 401,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    const [
      userIsBlocked,
      userIsAdmin,
      validPassword,
      token
    ] = await Promise.all([
      checkUserBlockedService( email ),
      checkAdminUserService( email ),
      checkValidPasswordService( password, user.password ),
      generateJWT( user._id )
    ]);
    await db.disconnect();

    if ( userIsBlocked ) {
      await db.disconnect();

      return {
        statusCode: 401,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    if ( !userIsAdmin ) {
      await db.disconnect();

      return {
        statusCode: 401,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    if ( !validPassword ) {
      await db.disconnect();

      return {
        statusCode: 401,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    return {
      statusCode: 200,
      ok: true,
      user,
      token
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'AdminLoginModule' );

    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default AdminLoginModule;
