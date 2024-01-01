// ExpressJS
import {
  request,
  response
} from 'express';
// Utils
import { logger } from '../../../utils';
import {uploadCloudinaryImageMedule} from '../modules';


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
const uploadCloudinaryImageController = async (
  req = request,
  res = response
) => {
  try {
    const {
      statusCode,
      ok,
      message
    } = await uploadCloudinaryImageMedule( req );

    res.status( statusCode ).json({
      ok,
      message
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'uploadCloudinaryImageController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default uploadCloudinaryImageController;
