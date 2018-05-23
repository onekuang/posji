// mutation.js
import  * as types from "./mutation-types";

const mutations = {
    [types.SET_CAR](state, car) {
        state.car = car;
    },
    [types.SET_TEST](state, test) {
        state.test = test;
    }
}

export default mutations