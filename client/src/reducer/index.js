let defaultState = {
  factory_seconds: [],
  qa_passed: [],
  for_shipping: [],
  to_be_qa: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case 'FETCH_TO_BE_QA':
      return Object.assign({}, { ...state, to_be_qa: action.payload.data })
    case 'ADD_TO_FACTORY_SECONDS':
      return Object.assign({}, { ...state, factory_seconds: action.payload.data.map((item,i) => { 
          item.from =  { object: "factory_seconds", index: i}
          return item;
        }) 
      })
    case 'ADD_TO_PASSED_QA':
      return Object.assign({}, { ...state, qa_passed: action.payload.data.map((item, i) => { 
          item.from = { object: "qa_passed", index: i}
          return item;
        }) 
      })
    case 'MOVE_TO_SHIPMENT': 
      // Remove from origin
      return (() => {
        let newState;
        let combinedToys = state.qa_passed.concat(state.factory_seconds);
        for(let i = 0; i < combinedToys.length; i++){
          if (action.payload.id === combinedToys[i].id) {
            let origin = state[combinedToys[i].from.object].concat();
            origin.splice(combinedToys[i].from.index, 1);
            let shipment = state.for_shipping.concat(combinedToys[i]);
            newState = Object.assign({ ...state, [combinedToys[i].from.object] : origin, for_shipping: shipment });
            break;
          }
        }
        return newState;
      })();
      
    case 'REMOVE_FROM_SHIPMENT':
      return (() => {
        let newState;
        for(let i = 0; i < state.for_shipping.length; i++){
          if (action.payload.id ===  state.for_shipping[i].id) {
            // 
            let shipment = state.for_shipping.concat();
            shipment.splice(i, 1);
            let origin = state[state.for_shipping[i].from.object].concat();
            origin.splice(state.for_shipping[i].from.index, 0, state.for_shipping[i]);
            newState = Object.assign({ ...state, for_shipping : shipment , [state.for_shipping[i].from.object] : origin });
            break;
          }
        }
        return newState;
      })()
    case 'REMOVE_FOR_QA':
      return Object.assign({}, { ...state, to_be_qa: [] })
    default: 
      return state;
  }
}
export default reducer;