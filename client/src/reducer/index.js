let defaultState = {
  factory_seconds: [],
  qa_passed: [],
  removed_from_shipment: [],
  to_be_qa: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case 'FETCH_TO_BE_QA':
      return Object.assign({}, { ...state, to_be_qa: action.payload.data })
    case 'ADD_TO_FACTORY_SECONDS':
      defaultState.to_be_qa = [];
      return Object.assign({}, { ...state, factory_seconds: action.payload.data.map((item) => { 
          item.from = "factory_seconds" 
          return item;
        }) 
      })
    case 'ADD_TO_PASSED_QA':
      defaultState.to_be_qa = [];
      return Object.assign({}, { ...state, qa_passed: action.payload.data.map((item) => { 
          item.from = "qa_passed" 
          return item;
        }) 
      })
    case 'REMOVE_FOR_QA':
      return Object.assign({}, { ...state, to_be_qa: [] })
    default: 
      return state;
  }
}
export default reducer;