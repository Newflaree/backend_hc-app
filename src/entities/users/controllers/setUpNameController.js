// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { setUpNameModule } from '../modules';
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
const setUpNameController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      message,
      updatedUserName
    }= await setUpNameModule( req );

    res.status( statusCode ).json({
      ok,
      message,
       updatedUserName
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpNameController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default setUpNameController;
