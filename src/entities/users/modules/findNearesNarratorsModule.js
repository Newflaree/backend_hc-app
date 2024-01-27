// ExpressJS
import { request } from 'express';
// Config
import { db } from '../../../config';
// Services
import { findNearesNarratorsService } from '../services';
// Utils
import {
  logger,
  statusCodes
} from '../../../utils';


const findNearesNarratorsModule = async ( req = request ) => {
  const {
    longitude,
    latitude
  } = req.body;
  const { tags } = req.user;

  try {
    await db.connect();

    const {
      narrators
    } = await findNearesNarratorsService(
      tags,
      latitude,
      longitude
    );

    await db.disconnect();

    return {
      statusCode: statusCodes.SUCCESS,
      ok: true,
      narrators
    }

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'findNearesNarratorsModule' );

    return {
      statusCode: statusCodes.BAD_REQUEST,
      ok: false,
      message: error
    }
  }
}

export default findNearesNarratorsModule;
