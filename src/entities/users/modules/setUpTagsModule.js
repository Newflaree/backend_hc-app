// ExpressJS
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import {
  getUserByIdService,
  updateUserTagsService
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
const setUpTagsModule = async ( req = request ) => {
  const { id } = req.user;
  const { tags } = req.body;

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

    const { updatedTagsUser } = await updateUserTagsService( id, tags )

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      updatedTagsUser
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'setUpTagsModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default setUpTagsModule;
