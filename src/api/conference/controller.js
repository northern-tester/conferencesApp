import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Conference } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Conference.create({ ...body, user })
    .then((conference) => conference.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Conference.countDocuments(query)
    .then(count => Conference.find(query, select, cursor)
      .populate('user')
      .then((conferences) => ({
        count,
        rows: conferences.map((conference) => conference.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Conference.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((conference) => conference ? conference.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Conference.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((conference) => conference ? Object.assign(conference, body).save() : null)
    .then((conference) => conference ? conference.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Conference.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((conference) => conference ? conference.remove() : null)
    .then(success(res, 204))
    .catch(next)
