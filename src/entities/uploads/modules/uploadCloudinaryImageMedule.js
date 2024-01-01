// ExpressJS
import { request } from 'express';
// Services
// Utils
import { logger } from '../../../utils';


/**
 * Module Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const uploadCloudinaryImageModule = async ( req = request ) => {
  const { id } = req.user;

  console.log( req.files );

  try {
    // TODO: Find User on DB
    // TODO: Check if User exists
    // TODO: Check if User isBlocked
    // TODO: Upload Image to Cloudinary

    return {
      statusCode: 200,
      ok: true,
      message: 'uploadCloudinaryImageModule'
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'uploadCloudinaryImageModule' );
    
    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default uploadCloudinaryImageModule;
