// Database
//
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
const findUserByIdService = async ( id = '' ) => {
  try {
    const user = await User.findById( id );

    return {
      user
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'findUserByIdService' );
  }
}

export default findUserByIdService;
