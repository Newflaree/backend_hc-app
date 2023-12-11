// JsonWebToken
import jwt from 'jsonwebtoken';
// Utils
import { logger } from '.';

export const generateJWT = ( uid ) => {
  return new Promise( ( resolve, reject ) => {
    const payload = { uid };

    jwt.sign( payload, process.env.SECRET_KEY || '', {
      expiresIn: '24h'
    }, ( err, token ) => {
      if ( err ) {
        logger.consoleErrorsHandler( err, 'generateJWTUtil' );
        reject( 'Token could not be generated' );

      } else {
        resolve( token );
      }
    });
  });
}
