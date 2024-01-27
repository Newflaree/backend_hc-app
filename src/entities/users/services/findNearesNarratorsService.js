// Models
import { User } from '../models';
// Config
import { db } from '../../../config';
// Utils
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const findNearesNarratorsService = async (
  tags,
  latitude,
  longitude
) => {
  try {
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const narrators = await User.aggregate([
      {
        $geoNear: {
          near: location,
          distanceField: 'dist.calculated',
          spherical: true,
          query: {
            role: 'NARRATOR_ROLE'
          }
        }
      },
      {
        $addFields: {
          tagsMatchCount: {
            $size: {
              $ifNull: [
                {
                  $setIntersection: [
                    "$tags",
                    tags
                  ]
                },
                []
              ]
            }
          }
        }
      },
      {
        $sort: {
          tagsMatchCount: -1,
          'dist.calculated': 1
        }
      }
    ]).exec();

    return {
      narrators
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'findNearesNarratorsService' );
  }
}

export default findNearesNarratorsService;
