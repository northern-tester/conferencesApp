import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Session, { schema } from './model'

const router = new Router()
const { title, keywords, description, conference, type, day } = schema.tree

/**
 * @api {post} /sessions Create session
 * @apiName CreateSession
 * @apiGroup Session
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Session's title.
 * @apiParam keywords Session's keywords.
 * @apiParam description Session's description.
 * @apiParam conference Session's conference.
 * @apiParam type Session's type.
 * @apiParam day Session's day.
 * @apiSuccess {Object} session Session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Session not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, keywords, description, conference, type, day }),
  create)

/**
 * @api {get} /sessions Retrieve sessions
 * @apiName RetrieveSessions
 * @apiGroup Session
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of sessions.
 * @apiSuccess {Object[]} rows List of sessions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /sessions/:id Retrieve session
 * @apiName RetrieveSession
 * @apiGroup Session
 * @apiSuccess {Object} session Session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Session not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /sessions/:id Update session
 * @apiName UpdateSession
 * @apiGroup Session
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Session's title.
 * @apiParam keywords Session's keywords.
 * @apiParam description Session's description.
 * @apiParam conference Session's conference.
 * @apiParam type Session's type.
 * @apiParam day Session's day.
 * @apiSuccess {Object} session Session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Session not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, keywords, description, conference, type, day }),
  update)

/**
 * @api {delete} /sessions/:id Delete session
 * @apiName DeleteSession
 * @apiGroup Session
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Session not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
