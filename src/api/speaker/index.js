import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Speaker, { schema } from './model'

const router = new Router()
const { name, nationality, country, speciality, biography } = schema.tree

/**
 * @api {post} /speakers Create speaker
 * @apiName CreateSpeaker
 * @apiGroup Speaker
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Speaker's name.
 * @apiParam nationality Speaker's nationality.
 * @apiParam country Speaker's country.
 * @apiParam speciality Speaker's speciality.
 * @apiParam biography Speaker's biography.
 * @apiSuccess {Object} speaker Speaker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Speaker not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, nationality, country, speciality, biography }),
  create)

/**
 * @api {get} /speakers Retrieve speakers
 * @apiName RetrieveSpeakers
 * @apiGroup Speaker
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of speakers.
 * @apiSuccess {Object[]} rows List of speakers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /speakers/:id Retrieve speaker
 * @apiName RetrieveSpeaker
 * @apiGroup Speaker
 * @apiSuccess {Object} speaker Speaker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Speaker not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /speakers/:id Update speaker
 * @apiName UpdateSpeaker
 * @apiGroup Speaker
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Speaker's name.
 * @apiParam nationality Speaker's nationality.
 * @apiParam country Speaker's country.
 * @apiParam speciality Speaker's speciality.
 * @apiParam biography Speaker's biography.
 * @apiSuccess {Object} speaker Speaker's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Speaker not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, nationality, country, speciality, biography }),
  update)

/**
 * @api {delete} /speakers/:id Delete speaker
 * @apiName DeleteSpeaker
 * @apiGroup Speaker
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Speaker not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
