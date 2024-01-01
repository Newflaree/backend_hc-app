// ExpressJS
import { request } from 'express';
import {logger} from '../../../utils';
import {getUserByIdService, setUpInitStatusService} from '../services';
// Database
// Models



/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const setUpInitStatusModule = async ( req = request ) => {
  const { id } = req.user;

  try {
    // Find user by id
    const { user } = await getUserByIdService( id );

    //  Check user exists
    if ( !user ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese ID'
    }

    // Check user isBlocked
    if ( user.isBlocked ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese ID'
    }

    // Set up init status
    const {
      statusCode,
      ok,
      message,
      updatedStatusUser
    } = await setUpInitStatusService( req );

    return {
      statusCode,
      ok,
      updatedStatusUser,
      message
    }

  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpInitStatusModuleService' );

    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default setUpInitStatusModule;
