// Express
import { request, response } from 'express';
// Modules
import { authRegisterModule } from '../modules';
// Utils
import {
  logger,
  statusCodes
} from '../../../utils';


/**
 * Handler description
 *
 * PATH: /api/auth/register
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const authRegisterController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      User,
      message,
      token,
      error,
    } = await authRegisterModule( req );

    res.status( statusCode ).json({
      ok,
      User,
      message,
      token,
      error
    });
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'authRegisterController' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      message: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default authRegisterController;
