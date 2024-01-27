// ExpressJS
import { request, response } from 'express';
// JsonWebToken
import jwt from 'jsonwebtoken';
// Database
import { db } from '../config';
// Services
import { getUserByIdService } from '../entities/users/services';
// Utils
import {
  logger,
  messages,
  statusCodes
} from '../utils';


export const validateJWT = async (
  req = request,
  res = response,
  next
) => {
  const token = req.header( 'x-token' );

  if ( !token ) {
    await db.disconnect();

    return res.status( statusCodes.UNAUTHORIZED ).json({
      ok: false,
      message: 'No hay token en la petición'
    });
  }

  try {
    const { uid: id } = jwt.verify(token, process.env.SECRET_KEY || '' );

    await db.connect();
    const { user: currentUser } = await getUserByIdService( id );


    if ( !currentUser ) {
      await db.disconnect();

      return res.status( statusCodes.UNAUTHORIZED ).json({
        ok: false,
        message: messages.INVALID_TOKEN
      });
    }

    if ( currentUser.isBlocked ) {
      await db.disconnect();

      return res.status( statusCodes.UNAUTHORIZED ).json({
        ok: false,
        message: messages.INVALID_TOKEN
      });
    }

    await db.disconnect();
    req.user = currentUser;
    next();

  } catch ( error ) {
    await db.disconnect();
    logger.consoleErrorsHandler( error, 'validateJWTMiddleware' );

    res.status( statusCodes.SERVER_ERROR ).json({
      ok: false,
      message: error
    });
  }
}
