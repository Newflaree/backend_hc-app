// Database
import { db } from '../../../config';
import {logger} from '../../../utils';
// Models
import { User } from '../../auth/models';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const updateUserTagsService = async (
  id = '',
  tags = []
) => {
  try {
    await db.connect();
    const updatedTagsUser = await User.findByIdAndUpdate( id, { tags }, { new: true } );
    await db.disconnect();

    return {
      updatedTagsUser
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'updateUserTagsService' );
  }
}

export default updateUserTagsService;
