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
const findUserByEmailService = async (
  email = ''
) => {
  try {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    return {
      user
    }
  } catch ( error ) {
    await db.disconnect();

    logger.consoleErrorsHandler( error, 'findUserByEmailService' );
  }
}

export default findUserByEmailService;
