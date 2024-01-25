// Config
import { db } from '../../../config';
// Models
// Utils
import { User } from '../models';
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {String} email - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const checkUserBlockedService = async (
  email = ''
) => {
  try {
    const userExists = await User.findOne({ email });

    return ( userExists?.isBlocked )
      ? true
      : false;

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'checkUserBlockedService' );
  }
}

export default checkUserBlockedService;
