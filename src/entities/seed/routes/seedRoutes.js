// ExpressJS
import {
  request,
  response,
  Router
} from 'express';
// Database
import { db, initialData } from '../../../config';
// Models
import { User } from '../../auth/models';
// Utils
import { logger } from '../../../utils';


const router = Router();

router.post( '/load', async ( req = request, res = response ) => {
  try {
    await db.connect();

    await User.deleteMany();
    await User.insertMany( initialData.users );
  
    await db.connect();

    res.status( 200 ).json({
      ok: true,
      message: 'Datos cargados con éxito'
    });

  } catch ( error ) {
    logger.consoleErrorsHandler( error, 'seedController' );
    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
});


export default router;
