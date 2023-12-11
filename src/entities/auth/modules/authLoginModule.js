// ExpressJS
import { request } from 'express';
// Services
import {
  checkUserBlockedService,
  checkValidPasswordService,
  findUserByEmailService
} from '../services';
// Utils
import { generateJWT } from '../../../utils';


// TODO: Write doc for login module
const authLoginModule = async (
  req = request
) => {
  // Defined body parameters for this module
  const { email, password } = req.body;

  try {
    // Check if user exists
    const { user } = await findUserByEmailService( email );

    if ( !user ) return {
      statusCode: 401,
      ok: false,
      message: 'Correo electrónico o contraseña incorrectos'
    }

    // Check if user is active
    const userIsBlocked = await checkUserBlockedService( email );

    if ( userIsBlocked ) return {
      statusCode: 401,
      ok: false,
      message: 'Correo electrónico o contraseña incorrectos'
    }

    // Check if password is valid
    const validPassword = await checkValidPasswordService( password, user.password );

    if ( !validPassword ) return {
      statusCode: 401,
      ok: false,
      message: 'Correo electrónico o contraseña incorrectos'
    }

    // Genreate JsonWebToken
    const token = await generateJWT( user._id );

    // Return { statusCode, ok, validUser, jwt }
    return {
      statusCode: 200,
      ok: true,
      user,
      token
    }

  } catch ( error ) {
    return {
      statusCode: 400,
      ok: false,
      message: error
    }
  }
}

export default authLoginModule;
