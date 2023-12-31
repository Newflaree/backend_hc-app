// Database
import { db } from '../../../config';
// Models
import { User } from '../../auth/models';
// Utils
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getUserByIdService = async ( id = '' ) => {
  try {
    // getUserByIdService
    await db.connect();
    const user = await User.findById( id );
    await db.disconnect();

    return {
      user
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'getUserByIdService' );

    return {
      ok: false,
      message: ''
    }
  }
}

export default getUserByIdService;
