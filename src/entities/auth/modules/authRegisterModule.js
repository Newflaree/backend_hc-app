// ExpressJS
import { request } from 'express';
// Services
import {
  checkEmailService,
  createNewUserService,
  encryptPasswordService
} from '../services';
// Utils
import { generateJWT } from '../../../utils';


/**
 * Registers a new user in the system. This module handles the registration process,
 * including email validation, password encryption, and JWT token generation.
 *
 * PATH: `/api/auth/register`
 * AUTH-REQUIRED: No (Authentication is not required for user registration)
 * ADMIN-REQUIRED: No (Admin privileges are not required for user registration)
 *
 * @param {Object} req - The HTTP request object containing user registration data.
 * @returns {Promise<AuthMoludeReturn>} A Promise that resolves to an authentication result
 * for the newly registered user, including the HTTP status code, success status,
 * user information, and an authentication token.
 */
const authRegisterModule = async (
  req = request
) => {
  const {
    name,
    email,
    password,
    location
  } = req.body;

  try {
    // Check if email exists
    const emailExists = await checkEmailService( email );

    if ( emailExists ) return {
      statusCode: 400,
      ok: false,
      message: 'Este correo electrónico ya está registrado'
    }

    // Encrypt password
    const newUserData = await encryptPasswordService({
      name,
      email,
      password,
      location
    });

    // Create new User
    const User = await createNewUserService( newUserData );

    // implementate GeerateJWT
    const token = await generateJWT( User._id );

    return {
      statusCode: 201,
      ok: true,
      User,
      token
    }
  
  } catch ( error ) {
    return {
      statusCode: 400,
      ok: false,
      error
    }
  }
}

export default authRegisterModule;
