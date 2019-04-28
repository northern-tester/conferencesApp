import { Session } from '.'
import { User } from '../user'

let user, session

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  session = await Session.create({ user, title: 'test', keywords: 'test', description: 'test', conference: 'test', type: 'test', day: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = session.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(session.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(session.title)
    expect(view.keywords).toBe(session.keywords)
    expect(view.description).toBe(session.description)
    expect(view.conference).toBe(session.conference)
    expect(view.type).toBe(session.type)
    expect(view.day).toBe(session.day)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = session.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(session.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(session.title)
    expect(view.keywords).toBe(session.keywords)
    expect(view.description).toBe(session.description)
    expect(view.type).toBe(session.type)
    expect(view.day).toBe(session.day)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
