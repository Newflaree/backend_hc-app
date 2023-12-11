import bcrypt from 'bcryptjs';
// Config
import { db } from '../../../config';
// Utils
import { logger } from '../../../utils';


/**
 * Service Desciption
 *
 * @param {String} email - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const checkValidPasswordService = async (
  bodyPassword = '',
  userPassword = ''
) => {
  try {
    const validPassword = bcrypt.compareSync( bodyPassword, userPassword );

    return ( validPassword )
      ? true
      : false;

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'checkValidPasswordService' );
  }
}

export default checkValidPasswordService;
