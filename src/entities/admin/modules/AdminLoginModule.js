// Express
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  checkAdminUserService,
  checkUserBlockedService,
  checkValidPasswordService,
  findUserByEmailService,
} from '../services';
// Utils
import {
  generateJWT,
  logger,
  messages,
  statusCodes
} from '../../../utils';



const AdminLoginModule = async (
  req = request
) => {
  const {
    email,
    password
  } = req.body;

  try {
    await db.connect();
    const { user } = await findUserByEmailService( email );

    if ( !user ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: messages.UNAUTHORIZED
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
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: messages.UNAUTHORIZED
      }
    }

    if ( !userIsAdmin ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: messages.UNAUTHORIZED
      }
    }

    if ( !validPassword ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.UNAUTHORIZED,
        ok: false,
        message: messages.UNAUTHORIZED
      }
    }

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      user,
      token
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'AdminLoginModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default AdminLoginModule;
