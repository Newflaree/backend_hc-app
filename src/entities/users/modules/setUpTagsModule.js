// ExpressJS
import { request } from 'express';
import {logger} from '../../../utils';
import {getUserByIdService, updateUserTagsService} from '../services';
// Utils



/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const setUpTagsModule = async ( req = request ) => {
  const { id } = req.user;
  const { tags } = req.body;

  try {
    // Find user on DB
    const { user: currentUser } = await getUserByIdService( id );

    // Check if user exists
    if ( !currentUser ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe ningún usuario con ese id'
    }

    // Check if user isBlocked
    if ( currentUser.isBlocked ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe ningún usuario con ese id'
    }

    // update user tags
    const { updatedTagsUser } = await updateUserTagsService( id, tags )

    return {
      statusCode: 200,
      ok: true,
      updatedTagsUser
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpTagsModule' );

    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default setUpTagsModule;
