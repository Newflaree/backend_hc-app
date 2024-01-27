// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  checkUserBlockedService,
  checkValidPasswordService,
  findUserByEmailService
} from '../services';
// Utils
import {
  generateJWT,
  logger,
  statusCodes
} from '../../../utils';


const authLoginModule = async (
  req = request
) => {
  const { email, password } = req.body;

  try {
    await db.connect();
    const { user } = await findUserByEmailService( email );

    if ( !user ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    const [
      userIsBlocked,
      validPassword,
      token
    ] = await Promise.all([
      checkUserBlockedService( email ),
      checkValidPasswordService( password, user.password ),
      generateJWT( user._id )
    ]);

    if ( userIsBlocked ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    if ( !validPassword ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: 'Correo electrónico o contraseña incorrectos'
      }
    }

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      user,
      token
    }

  } catch ( error ) {
    db.disconnect();
    logger.consoleErrorsHandler( error, 'authLoginModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default authLoginModule;
