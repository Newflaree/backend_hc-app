// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
import { setUpInitStatusModule } from '../modules';
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
const setupInitStatusController = async ( req = request, res = response ) => {
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

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default setupInitStatusController;
