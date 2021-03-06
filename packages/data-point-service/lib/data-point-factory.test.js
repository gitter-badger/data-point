/* eslint-env jest */

const DataPointFactory = require('./data-point-factory')
const DataPoint = require('data-point')

describe('verify', () => {
  test('It should pass options if valid', () => {
    const result = DataPointFactory.verify({
      DataPoint,
      entities: {
        'transform:foo': '$.'
      }
    })
    expect(result).toEqual(result)
  })

  test('It should throw error if DataPoint not provided', () => {
    expect(() => {
      DataPointFactory.verify({
        entities: {
          'transform:foo': '$.'
        }
      })
    }).toThrowError(/provided/)
  })

  test('It should throw error if entities not provided', () => {
    expect(() => {
      DataPointFactory.verify({
        DataPoint
      })
    }).toThrowError(/entities/)
  })
})

describe('createDataPoint', () => {
  test('It should create a new DataPoint Instance', () => {
    const dp = DataPointFactory.createDataPoint({
      DataPoint,
      entities: {
        'transform:foo': '$.'
      }
    })

    expect(dp).toHaveProperty('transform')
  })
})

describe('create', () => {
  test('It should create a new DataPoint Instance', () => {
    return DataPointFactory.create({
      DataPoint,
      entities: {
        'transform:foo': '$.'
      }
    }).then(dp => {
      expect(dp).toHaveProperty('transform')
    })
  })
})
