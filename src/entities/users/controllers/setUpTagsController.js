// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
// Utils
import { logger } from '../../../utils';
import {setUpTagsModule} from '../modules';


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
const setUpTagsController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      message,
      updatedTagsUser
    } = await setUpTagsModule( req );

    res.status( statusCode ).json({
      ok,
      message,
      updatedTagsUser
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpTagsLocationByIdController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default setUpTagsController;
