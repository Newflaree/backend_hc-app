// ExpressJS
import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  findNearesNarratorsController,
  getUserByIdController,
  setUpTagsLocationByIdController
} from '../controllers';
// Middlewares
import { validateFields } from '../../../middlewares';


const router = Router();

// PATH: /api/narrators/find-nearby-narrators
router.post( '/find-nearby-narrators', [
  check( 'latitude', 'La Latitud en requerida' ).not().isEmpty(),
  check( 'longitude', 'La Longitud en requerida' ).not().isEmpty(),
  check( 'tags', 'Los tags son obligatorios' ).not().isEmpty(),
  validateFields
], findNearesNarratorsController );

// PATH: /api/users/:id
router.get( '/:id', [
  check( 'id', 'No es una id de mongo vádigo' ).isMongoId(),
  validateFields
], getUserByIdController );

// PATH: /api/narrato
router.put( '/setup-tags-location/:id', [
  check( 'latitude', 'La Latitud en requerida' ).not().isEmpty(),
  check( 'longitude', 'La Longitud en requerida' ).not().isEmpty(),
  check( 'tags', 'Los tags son obligatorios' ).not().isEmpty(),
  validateFields
], setUpTagsLocationByIdController );


export default router;
