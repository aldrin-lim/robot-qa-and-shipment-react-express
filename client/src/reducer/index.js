let defaultState = {
  factory_seconds: [],
  qa_passed: [],
  removed_from_shipment: [],
  to_be_qa: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case 'add_to_factory_seconds':
      return Object.assign({}, state);
    case 'FETCH_TO_BE_QA':
      return Object.assign({}, { ...state, to_be_qa: action.payload.data })
    default: 
      return state;
  }
}
export default reducer;