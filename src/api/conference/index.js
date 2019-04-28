import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Conference, { schema } from './model'

const router = new Router()
const { name, date, country, length, tutorials, workshops } = schema.tree

/**
 * @api {post} /conferences Create conference
 * @apiName CreateConference
 * @apiGroup Conference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Conference's name.
 * @apiParam date Conference's date.
 * @apiParam country Conference's country.
 * @apiParam length Conference's length.
 * @apiParam tutorials Conference's tutorials.
 * @apiParam workshops Conference's workshops.
 * @apiSuccess {Object} conference Conference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Conference not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, date, country, length, tutorials, workshops }),
  create)

/**
 * @api {get} /conferences Retrieve conferences
 * @apiName RetrieveConferences
 * @apiGroup Conference
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of conferences.
 * @apiSuccess {Object[]} rows List of conferences.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /conferences/:id Retrieve conference
 * @apiName RetrieveConference
 * @apiGroup Conference
 * @apiSuccess {Object} conference Conference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Conference not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /conferences/:id Update conference
 * @apiName UpdateConference
 * @apiGroup Conference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Conference's name.
 * @apiParam date Conference's date.
 * @apiParam country Conference's country.
 * @apiParam length Conference's length.
 * @apiParam tutorials Conference's tutorials.
 * @apiParam workshops Conference's workshops.
 * @apiSuccess {Object} conference Conference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Conference not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, date, country, length, tutorials, workshops }),
  update)

/**
 * @api {delete} /conferences/:id Delete conference
 * @apiName DeleteConference
 * @apiGroup Conference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Conference not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
