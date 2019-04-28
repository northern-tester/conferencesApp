import { Conference } from '.'
import { User } from '../user'

let user, conference

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  conference = await Conference.create({ user, name: 'test', date: 'test', country: 'test', length: 'test', tutorials: 'test', workshops: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = conference.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(conference.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(conference.name)
    expect(view.date).toBe(conference.date)
    expect(view.country).toBe(conference.country)
    expect(view.length).toBe(conference.length)
    expect(view.tutorials).toBe(conference.tutorials)
    expect(view.workshops).toBe(conference.workshops)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = conference.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(conference.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(conference.name)
    expect(view.date).toBe(conference.date)
    expect(view.country).toBe(conference.country)
    expect(view.length).toBe(conference.length)
    expect(view.tutorials).toBe(conference.tutorials)
    expect(view.workshops).toBe(conference.workshops)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
