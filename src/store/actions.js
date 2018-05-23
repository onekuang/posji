import * as types from './mutation-types.js'

export const car = function({commit},{name}) {
    commit(types.SET_CAR, name)
}
export const test = function({commit},{name}) {
    commit(types.SET_TEST, name)
}