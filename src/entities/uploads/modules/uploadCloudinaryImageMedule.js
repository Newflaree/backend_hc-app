// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
// Utils
import {
  logger,
  statusCodes
} from '../../../utils';


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
      statusCode: statusCodes.SUCCESS,
      ok: true,
      message: 'uploadCloudinaryImageModule'
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'uploadCloudinaryImageModule' );
    
    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default uploadCloudinaryImageModule;
