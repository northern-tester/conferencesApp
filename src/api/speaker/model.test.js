import { Speaker } from '.'
import { User } from '../user'

let user, speaker

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  speaker = await Speaker.create({ user, name: 'test', nationality: 'test', country: 'test', speciality: 'test', biography: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = speaker.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(speaker.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(speaker.name)
    expect(view.nationality).toBe(speaker.nationality)
    expect(view.country).toBe(speaker.country)
    expect(view.speciality).toBe(speaker.speciality)
    expect(view.biography).toBe(speaker.biography)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = speaker.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(speaker.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(speaker.name)
    expect(view.nationality).toBe(speaker.nationality)
    expect(view.country).toBe(speaker.country)
    expect(view.speciality).toBe(speaker.speciality)
    expect(view.biography).toBe(speaker.biography)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
