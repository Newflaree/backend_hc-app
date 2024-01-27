// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  getUserByIdService,
  updateUserNameService
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
const setUpNameModule = async ( req = request ) => {
  const { name } = req.body;
  const { id } = req.user;

  try {
    await db.connect();
    const currentUser = await getUserByIdService( id );

    if ( !currentUser ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    if ( currentUser.isBlockek ) {
      await db.disconnect();

      return {
        statusCode: statusCodes.BAD_REQUEST,
        ok: false,
        message: messages.USER_NOT_EXISTS
      }
    }

    const { updatedUserName } = await updateUserNameService( id, name );

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      updatedUserName
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'setUpNameModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default setUpNameModule;
