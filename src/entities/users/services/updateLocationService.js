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
const updateLocationService = async (
  id = '',
  latitude = 0,
  longitude = 0
) => {
  try {
    await db.connect();
    const updatedLocationUser = await User.findByIdAndUpdate(
      id,
      {
        location: {
          latitude,
          longitude
        }
      },
      { new: true }
    );
    await db.disconnect();

    return {
      updatedLocationUser
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'updateLocationService' );
  }
}

export default updateLocationService;
