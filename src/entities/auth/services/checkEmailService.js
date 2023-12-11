// Config
import { db } from '../../../config';
// Models
import { User } from '../models';
// Utils
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {String} email - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const checkEmailService = async (
  email = ''
) => {
  try {
    await db.connect();
    const emailExists = await User.findOne({ email });
    await db.disconnect();

    return ( emailExists )
      ? true
      : false;

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'checkEmailService' );
  }
}

export default checkEmailService;
