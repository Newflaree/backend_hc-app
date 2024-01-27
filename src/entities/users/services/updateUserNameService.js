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
const updateUserNameService = async ( id = '', name = '' ) => {
  try {
    const updatedUserName = await User.findByIdAndUpdate( id, { name }, { new: true } );

    return {
      updatedUserName,
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'updateUserNameService' );
  }
}

export default updateUserNameService;
