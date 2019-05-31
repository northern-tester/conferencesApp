import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Speaker } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Speaker.create({ ...body, user })
    .then((speaker) => speaker.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Speaker.countDocuments(query)
    .then(count => Speaker.find(query, select, cursor)
      .populate('user')
      .then((speakers) => ({
        count,
        rows: speakers.map((speaker) => speaker.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Speaker.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((speaker) => speaker ? speaker.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Speaker.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((speaker) => speaker ? Object.assign(speaker, body).save() : null)
    .then((speaker) => speaker ? speaker.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Speaker.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((speaker) => speaker ? speaker.remove() : null)
    .then(success(res, 204))
    .catch(next)
