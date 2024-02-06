// Express
import { request } from 'express';
// Database
import { db } from '../../../config';
// Services
import { findUserByIdService } from '../services';
// Utils
import {
  generateJWT,
  logger,
  messages,
  statusCodes
} from '../../../utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const authRenewTokenModule = async ( req = request ) => {
  const { _id } = req.user;

  try {
    await db.connect();

    const [ { user }, token ] = await Promise.all([
      findUserByIdService({ _id: _id.toString() }),
      generateJWT({ _id: _id.toString() })
    ]);

    await db.disconnect();

    return {
      ok: true,
      statusCode: statusCodes.SUCCESS,
      user,
      token
    }
  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'authRenewTokenModule' );

    return {
      ok: false,
      statusCode: statusCodes.BAD_REQUEST,
      message: error
    }
  }
}

export default authRenewTokenModule;
