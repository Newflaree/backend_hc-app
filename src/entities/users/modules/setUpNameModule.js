// ExpressJS
import { request } from 'express';
// Utils
import { logger } from '../../../utils';
import {getUserByIdService, updateUserNameService} from '../services';


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
    // Find User on DB
    const currentUser = await getUserByIdService( id );

    // Check if User Exists
    if ( !currentUser ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese id'
    }

    // Check if User isBlocked
    if ( currentUser.isBlockek ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese id'
    }

    // Update User name
    const { updatedUserName } = await updateUserNameService( id, name );

    return {
      statusCode: 200,
      ok: true,
      updatedUserName
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpNameModule' );

    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default setUpNameModule;
