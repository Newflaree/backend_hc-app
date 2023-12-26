import { request, response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../entities/auth/models";


export const validateJWT = async ( req = request, res = response, next ) => {
  const token = req.header( 'x-token' );

  if ( !token ) return res.status( 401 ).json({
    ok: false,
    message: 'No hay token en la petición'
  });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY || '' );
    const currentUser = await User.findById({ uid });

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
