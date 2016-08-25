import { DataStore, Mapper, Record, Schema, utils } from 'js-data/dist/js-data';
import { HttpAdapter } from 'js-data-http/dist/js-data-http';
import * as schemas from './schemas';
import * as relations from './relations';

// TODO: FIX THIS
const convertToDate = function (record) {
  if (typeof record.starttime === 'string') {
    record.startime = new Date(record.starttime)
  }
  if (typeof record.endtime === 'string') {
    record.endtime = new Date(record.endtime)
  }
}


export const adapter = new HttpAdapter({
  basePath: 'http://localhost:8000/api',
})

export const store = new DataStore({
  mapperDefaults: {
    // Override the original to make sure the date properties are actually Date
    // objects
    // createRecord (props, opts) {
    //   const result = this.constructor.prototype.createRecord.call(this, props, opts)
    //   if (Array.isArray(result)) {
    //     result.forEach(convertToDate)
    //   } else if (this.is(result)) {
    //     convertToDate(result)
    //   }
    //   return result
    // }
  }
})

// //TODO: Make this work
store.registerAdapter('http', adapter, { default: true })

// Define mapper for User
store.defineMapper('user', {
  endpoint: 'users', 
  schema: schemas.user,
  relations: relations.user
})


store.defineMapper('image', {
  endpoint: 'images',
  schema: schemas.image,
  relations: relations.image
})


store.defineMapper('location', {
  endpoint: 'locations',
  schema: schemas.location,
  relations: relations.location
})


store.defineMapper('userAsset', {
  endpoint: 'userassets',
  schema: schemas.userAsset,
  relations: relations.userAsset
})


store.defineMapper('task', {
  endpoint: 'tasks',
  schema: schemas.task,
  relations: relations.task
})


store.defineMapper('timeRange', {
  endpoint: 'timeRanges',
  schema: schemas.timeRange,
  relations: relations.timeRange
})

store.defineMapper('asset', {
  endpoint: 'assets',
  schema: schemas.asset,
  relations: relations.asset
})























