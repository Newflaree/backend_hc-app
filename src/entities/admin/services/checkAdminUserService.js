// Database
import { db } from '../../../config';
// Models
import { User } from '../models';
// Utils
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const checkAdminUserService = async ( email ) => {
  try {
    const userExists = await User.findOne({ email });

    return ( userExists?.role === 'ADMIN_ROLE' )
      ? true
      : false

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'checkAdminUserService' );
  }
}

export default checkAdminUserService;
