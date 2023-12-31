// ExpressJS
import { request, response } from 'express';
// Utils
import { logger } from '../../../utils';
import {getUserByIdModule} from '../modules';



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
const getUserByIdController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      user,
      message
    } = await getUserByIdModule( req );

    res.status( statusCode ).json({
      ok,
      user,
      message
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'getUserByIdController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default getUserByIdController;
