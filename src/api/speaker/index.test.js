import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Speaker } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, speaker

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  speaker = await Speaker.create({ user })
})

test('POST /speakers 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', nationality: 'test', country: 'test', speciality: 'test', biography: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.nationality).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.speciality).toEqual('test')
  expect(body.biography).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /speakers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /speakers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /speakers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${speaker.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(speaker.id)
})

test('GET /speakers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /speakers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${speaker.id}`)
    .send({ access_token: userSession, name: 'test', nationality: 'test', country: 'test', speciality: 'test', biography: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(speaker.id)
  expect(body.name).toEqual('test')
  expect(body.nationality).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.speciality).toEqual('test')
  expect(body.biography).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /speakers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${speaker.id}`)
    .send({ access_token: anotherSession, name: 'test', nationality: 'test', country: 'test', speciality: 'test', biography: 'test' })
  expect(status).toBe(401)
})

test('PUT /speakers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${speaker.id}`)
  expect(status).toBe(401)
})

test('PUT /speakers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', nationality: 'test', country: 'test', speciality: 'test', biography: 'test' })
  expect(status).toBe(404)
})

test('DELETE /speakers/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${speaker.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /speakers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${speaker.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /speakers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${speaker.id}`)
  expect(status).toBe(401)
})

test('DELETE /speakers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
