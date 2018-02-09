let defaultState = {
  factory_seconds: [],
  qa_passed: [],
  removed_from_shipment: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case 'add_to_factory_seconds':
      return Object.assign({}, state);
    default: 
      return state;
  }
}
export default reducer;