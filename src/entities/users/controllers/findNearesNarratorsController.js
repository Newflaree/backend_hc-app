// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { findNearesNarratorsModule } from '../modules';
// Utils
import {
  logger,
  statusCodes,
  messages
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
const findNearesNarratorsController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      narrators
    } = await findNearesNarratorsModule( req );

    res.status( statusCode ).json({
      ok,
      narrators
    });
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'findNearesNarratorsController' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      message: messages.SERVER_ERROR
    });
  }
}

export default findNearesNarratorsController;
