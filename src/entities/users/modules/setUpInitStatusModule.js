// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  getUserByIdService,
  setUpInitStatusService
} from '../services';
// Utils
import {
  logger,
  messages,
  statusCodes
} from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const setUpInitStatusModule = async ( req = request ) => {
  const { id } = req.user;

  try {
    await db.connect();
    const { user } = await getUserByIdService( id );

    if ( !user ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    if ( user.isBlocked ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    const {
      statusCode,
      ok,
      message,
      updatedStatusUser
    } = await setUpInitStatusService( req );

    await db.disconnect();

    return {
      statusCode,
      ok,
      updatedStatusUser,
      message
    }

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'setUpInitStatusModuleService' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default setUpInitStatusModule;
