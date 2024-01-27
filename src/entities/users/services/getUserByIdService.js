// Database
import { db } from '../../../config';
// Models
import { User } from '../../auth/models';
// Utils
import {
  logger,
  statusCodes
} from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getUserByIdService = async ( id = '' ) => {
  try {
    const user = await User.findById( id );

    return {
      user
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'getUserByIdService' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default getUserByIdService;
