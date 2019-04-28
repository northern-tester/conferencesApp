import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Session } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, session

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  session = await Session.create({ user })
})

test('POST /sessions 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', keywords: 'test', description: 'test', conference: 'test', type: 'test', day: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.keywords).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.conference).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.day).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /sessions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sessions 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /sessions/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${session.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(session.id)
})

test('GET /sessions/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /sessions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${session.id}`)
    .send({ access_token: userSession, title: 'test', keywords: 'test', description: 'test', type: 'test', day: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(session.id)
  expect(body.title).toEqual('test')
  expect(body.keywords).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.conference).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.day).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /sessions/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${session.id}`)
    .send({ access_token: anotherSession, title: 'test', keywords: 'test', description: 'test', type: 'test', day: 'test' })
  expect(status).toBe(401)
})

test('PUT /sessions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${session.id}`)
  expect(status).toBe(401)
})

test('PUT /sessions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', keywords: 'test', description: 'test', conference: 'test', type: 'test', day: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sessions/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${session.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /sessions/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${session.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /sessions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${session.id}`)
  expect(status).toBe(401)
})

test('DELETE /sessions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
