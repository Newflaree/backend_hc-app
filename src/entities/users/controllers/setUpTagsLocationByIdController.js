// Database
import { db } from '../../../config';
// Services
// Utils
import { logger } from '../../../utils';


import {User} from "../../auth/models";


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
const setUpTagsLocationByIdController = async ( req, res ) => {
  const { id } = req.params;
  const { latitude, longitude, tags } = req.body;


  try {
    await db.connect();
    const updatedUser = await User.findByIdAndUpdate( id, {
      latitude,
      longitude,
      tags
    }, { new: true });
    await db.disconnect();

    res.status( 200 ).json({
      ok: true,
      updatedUser
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpTagsLocationByIdController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default setUpTagsLocationByIdController;
