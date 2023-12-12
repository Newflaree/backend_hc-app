// Database
// Services

import {db} from "../../../config";
import {logger} from "../../../utils";
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
const getUserByIdController = async ( req, res ) => {
  const { id } = req.params;

  try {
    await db.connect();
    const user = await User.findById( id );
    await db.disconnect();

    if ( !user || user.isBlocked ) return res.status( 400 ).json({
      ok: false,
      message: 'No existe un usuario con ese ID'
    });

    res.status( 200 ).json({
      ok: true,
      user
    });
  
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'getUserByIdController' );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default getUserByIdController;
