// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import { getUserByIdService } from '../services';
// Utils
import {
  logger,
  messages,
  statusCodes,
} from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getUserByIdModule = async ( req = request ) => {
  const { id } = req.params;

  try {
    await db.connect();

    const { user } = await getUserByIdService( id );

    if ( !user || user.isBlocked ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      };
    }

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      user
    };
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'getUserByIdModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default getUserByIdModule;
