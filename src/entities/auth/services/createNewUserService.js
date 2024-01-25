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
const createNewUserService = async (
  userData
) => {
  try {
    const newUser = new User( userData );
    await newUser.save();

    return newUser
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'createNewUserService' );
  }
}

export default createNewUserService;
