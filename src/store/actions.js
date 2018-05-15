import * as types from './mutation-types.js'

export const test = function({commit},{name}) {
    commit(types.SET_KUANG, name)
}