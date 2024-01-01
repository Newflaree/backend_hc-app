// ExpressJS
import { request } from 'express';
// Services
// Utils
import { logger } from '../../../utils';
import {getUserByIdService, updateLocationService} from '../services';


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
    // Find User on DB
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

    // Update User Location
    const { updatedLocationUser } = await updateLocationService( id, latitude, longitude );

    return {
      statusCode: 200,
      ok: true,
      updatedLocationUser
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpLocationModule' );
    
    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default setUpLocationModule;
