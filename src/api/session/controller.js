import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Session } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Session.create({ ...body, user })
    .then((session) => session.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Session.countDocuments(query)
    .then(count => Session.find(query, select, cursor)
      .populate('user')
      .then((sessions) => ({
        count,
        rows: sessions.map((session) => session.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Session.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((session) => session ? session.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Session.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((session) => session ? Object.assign(session, body).save() : null)
    .then((session) => session ? session.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Session.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((session) => session ? session.remove() : null)
    .then(success(res, 204))
    .catch(next)
