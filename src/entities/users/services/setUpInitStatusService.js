// Database
// Models

import {db} from "../../../config";
import {logger} from "../../../utils";
import {User} from "../../auth/models";


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const setUpInitStatusService = async ( req ) => {
  const { id } = req.user;
  const { initStatus } = req.body;

  const validStatus = [
    0,
    1,
    2,
    3
  ];
  if ( !validStatus.includes( initStatus ) ) return {
    statusCode: 400,
    ok: false,
    message: 'Estado inválido'
  };

  try {
    await db.connect();
    const updatedStatusUser = await User.findByIdAndUpdate(id, { initStatus }, { new: true });
    await db.disconnect();

    return {
      statusCode: 200,
      ok: true,
      updatedStatusUser: updatedStatusUser.initStatus
    }
  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'setUpInitStatusService' )
  }
}

export default setUpInitStatusService;
