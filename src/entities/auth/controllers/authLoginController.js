// ExpressJS
import {
  request,
  response,
} from 'express';
// Modules
import { authLoginModule } from '../modules';
// Utils
import { logger } from '../../../utils';


/**
 * Handler description
 *
 * PATH: /api/...
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const authLoginController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      message,
      user,
      token
    } = await authLoginModule( req )

    res.status( statusCode ).json({
      ok,
      message,
      user,
      token
    });
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'authLoginController' );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default authLoginController;
