// ExpressJS
import {
  request,
  response
} from 'express';
// Modules
// Utils
import { logger } from '../../../utils';

import {User} from '../../auth/models';
import {db} from '../../../config';


/**
 * Handler description
 *
 * PATH: /api/...
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const findNearesNarratorsController = async (
  req = request,
  res = response
) => {
  try {
    const { longitude, latitude, tags } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    await db.connect();
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
    await db.disconnect();

    res.status( 200 ).json({
      ok: true,
      narrators
    });
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'findNearesNarratorsController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default findNearesNarratorsController;
