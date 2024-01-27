// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { setUpInitStatusModule } from '../modules';
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
const setupInitStatusController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      updatedStatusUser,
      message
    } = await setUpInitStatusModule( req )

    res.status( statusCode ).json({
      ok,
      updatedStatusUser,
      message
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setupInitStatusController' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      msg: messages.SERVER_ERROR
    });
  }
}

export default setupInitStatusController;
