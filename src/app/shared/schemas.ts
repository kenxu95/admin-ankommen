import { Schema } from 'js-data';

export const user = new Schema({
  properties: {
    id: { type: 'string'},
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    bio: { type: 'string' },
    contactFrequency: { type: 'number'}
  }
})

export const userAsset = new Schema({
  properties: {
    id: { type: 'string' }
  } 
})

export const location = new Schema({
  properties: {
    id: { type: 'string' },
    longitude: { type: 'number' },
    latitude: { type: 'number' },
    radius: { type: 'number' }
  }
})

export const task = new Schema({
  properties: {
    id: { type: 'string' },
    status: { type: 'number' },
    description: { type: 'string' }
  }
})

export const image = new Schema({
  id: { type: 'number' },
      data: { type: 'string' } // ANY?
    })

export const timeRange = new Schema({
  starttime: { type: 'string' },
  endtime: { type: 'string' },
  dayOfWeek: { type: 'number' }
})

export const asset = new Schema({
  name: { type: 'string' },
  description: { type: 'string' }
})

