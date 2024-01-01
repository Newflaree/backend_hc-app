// ExpressJS
import {
  request,
  response
} from 'express';



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
    res.status( 200 ).json({
      ok: true,
      msg: 'uploadCloudinaryImageController'
    });
  
  } catch ( error ) {
    // TODO: Implement consoleErrorsHandler()

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default uploadCloudinaryImageController;
