// Express
import {
  request,
  response
} from 'express';
// Modules
import { authRenewTokenModule } from '../modules';
// Utils
import {
  logger,
  messages,
  statusCodes,
} from '../../../utils';


/**
 *
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
const authRenewTokenController = async (
  req = request,
  res = response
) => {
  try {
    const {
      ok,
      statusCode,
      message,
      user,
      token
    } = await authRenewTokenModule( req );

    res.status( statusCode ).json({
      ok,
      message,
      user,
      token
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'authRenewTokenController' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      msg: messages.SERVER_ERROR
    });
  }
}

export default authRenewTokenController;
