// ExpressJS
import { request, response } from 'express';
// JsonWebToken
import jwt from 'jsonwebtoken';
// Services
import { getUserByIdService } from '../entities/users/services';


export const validateJWT = async (
  req = request,
  res = response,
  next
) => {
  const token = req.header( 'x-token' );

  if ( !token ) return res.status( 401 ).json({
    ok: false,
    message: 'No hay token en la petición'
  });

  try {
    const { uid: id } = jwt.verify(token, process.env.SECRET_KEY || '' );

    const { user: currentUser } = await getUserByIdService( id );

    if ( !currentUser ) return res.status( 401 ).json({
      ok: false,
      message: 'Token no válido'
    });

    if ( currentUser.isBlocked ) return res.status( 401 ).json({
      ok: false,
      message: 'Token no válido'
    });

    req.user = currentUser;

    next();

    

  } catch ( error ) {
  
  }
}
