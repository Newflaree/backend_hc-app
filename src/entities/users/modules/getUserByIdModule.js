// ExpressJS
import { request } from 'express';
// Services
import { getUserByIdService } from '../services';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getUserByIdModule = async ( req = request ) => {
  const { id } = req.params;

  try {
    const { user } = await getUserByIdService( id );

    if ( !user || user.isBlocked ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese ID'
    };

    return {
      statusCode: 200,
      ok: true,
      user
    };

  } catch ( error ) {
    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default getUserByIdModule;
