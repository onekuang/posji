// mutation.js
import  * as types from "./mutation-types";

const mutations = {
    [types.SET_KUANG](state, kuang) {
        state.kuang = kuang;
    }
}

export default mutations