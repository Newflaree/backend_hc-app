// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  getUserByIdService,
  updateLocationService
} from '../services';
// Utils
import {
  logger,
  messages,
  statusCodes
} from '../../../utils';


/**
 * Module Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const setUpLocationModule = async ( req = request ) => {
  const { id } = req.user;
  const { latitude, longitude } = req.body;

  try {
    await db.connect();
    const { user: currentUser } = await getUserByIdService( id );

    if ( !currentUser ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    if ( currentUser.isBlocked ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    const { updatedLocationUser } = await updateLocationService( id, latitude, longitude );

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      updatedLocationUser
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'setUpLocationModule' );
    
    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default setUpLocationModule;
