import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Conference } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, conference

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  conference = await Conference.create({ user })
})

test('POST /conferences 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', date: 'test', country: 'test', length: 'test', tutorials: 'test', workshops: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.length).toEqual('test')
  expect(body.tutorials).toEqual('test')
  expect(body.workshops).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /conferences 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /conferences 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /conferences/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${conference.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(conference.id)
})

test('GET /conferences/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /conferences/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${conference.id}`)
    .send({ access_token: userSession, name: 'test', date: 'test', country: 'test', length: 'test', tutorials: 'test', workshops: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(conference.id)
  expect(body.name).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.length).toEqual('test')
  expect(body.tutorials).toEqual('test')
  expect(body.workshops).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /conferences/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${conference.id}`)
    .send({ access_token: anotherSession, name: 'test', date: 'test', country: 'test', length: 'test', tutorials: 'test', workshops: 'test' })
  expect(status).toBe(401)
})

test('PUT /conferences/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${conference.id}`)
  expect(status).toBe(401)
})

test('PUT /conferences/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', date: 'test', country: 'test', length: 'test', tutorials: 'test', workshops: 'test' })
  expect(status).toBe(404)
})

test('DELETE /conferences/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${conference.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /conferences/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${conference.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /conferences/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${conference.id}`)
  expect(status).toBe(401)
})

test('DELETE /conferences/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
