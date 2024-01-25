// Express
import { request, response } from 'express';
// Modules
import { AdminLoginModule } from '../modules';
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
const AdminLoginController = async ( req = request, res = response ) => {
  try {
    const {
      statusCode,
      ok,
      message,
      user,
      token
    } = await AdminLoginModule( req );

    res.status( statusCode ).json({
      ok,
      user,
      token,
      message,
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'AdminLoginController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default AdminLoginController;
