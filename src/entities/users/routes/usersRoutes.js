// ExpressJS
import { Router } from 'express';
import { check } from 'express-validator';
// Controllers
import {
  findNearesNarratorsController,
  getUserByIdController,
  setupInitStatusController,
  setUpLocationController,
  setUpNameController,
  setUpTagsController,
} from '../controllers';
// Middlewares
import {
  validateFields,
  validateJWT
} from '../../../middlewares';


const router = Router();

// PATH: /api/narrators/find-nearby-narrators
router.get( '/find-nearby-narrators', [
  validateJWT,
  check( 'latitude', 'La Latitud en requerida' ).not().isEmpty(),
  check( 'longitude', 'La Longitud en requerida' ).not().isEmpty(),
  validateFields
], findNearesNarratorsController );

// PATH: /api/users/:id
router.get( '/:id', [
  check( 'id', 'No es una id de mongo vádigo' ).isMongoId(),
  validateFields
], getUserByIdController );

// TODO: PATH: /api/setup-name
router.put( '/setup-name', [
  validateJWT,
  check( 'name', 'El nombre es requerido' ).not().isEmpty(),
  validateFields
], setUpNameController );

// TODO: PATH: /api/setup-name
// TODO: PATH: /api/setup-name

// PATH: /api/setup-tags/:id
router.put( '/setup-tags', [
  validateJWT,
  check( 'tags', 'Los tags son requerido' ).not().isEmpty(),
  validateFields
], setUpTagsController );

// PATH: /api/setup-location/:id
router.put( '/setup-location', [
  validateJWT,
  check( 'latitude', 'La Latitud en requerida' ).not().isEmpty(),
  check( 'longitude', 'La Longitud en requerida' ).not().isEmpty(),
  validateFields
], setUpLocationController );

// PATH: /api/narrato
router.put( '/setup-init-status', [
  validateJWT,
  check( 'initStatus', 'El estado inicial es necesario' ).not().isEmpty(),
  validateFields
], setupInitStatusController );


export default router;
