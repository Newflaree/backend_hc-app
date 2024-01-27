// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { setUpLocationModule } from '../modules';
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
const setUpLocationController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      message,
      updatedLocationUser
    } = await setUpLocationModule( req );

    res.status( statusCode ).json({
      ok,
      message,
      updatedLocationUser
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpTagsLocationByIdController' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      message: messages.SERVER_ERROR
    });
  }
}

export default setUpLocationController;
