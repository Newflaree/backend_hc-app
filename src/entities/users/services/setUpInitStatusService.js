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
    const updatedStatusUser = await User.findByIdAndUpdate(id, { initStatus }, { new: true });

    return {
      statusCode: 200,
      ok: true,
      updatedStatusUser: updatedStatusUser.initStatus
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'setUpInitStatusService' )

    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default setUpInitStatusService;
