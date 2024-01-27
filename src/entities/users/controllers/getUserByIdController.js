// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { getUserByIdModule } from '../modules';
// Utils
import {
  logger,
  messages,
  statusCodes
} from '../../../utils';


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

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      message: messages.SERVER_ERROR
    });
  }
}

export default getUserByIdController;
