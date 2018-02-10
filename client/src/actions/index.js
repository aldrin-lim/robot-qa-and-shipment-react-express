export const fetchToBeQA = (data) => {
  return {
    type: 'FETCH_TO_BE_QA',
    payload: { data }
  };
}

export const addToFactorySeconds = (data) => {
  return {
    type: 'ADD_TO_FACTORY_SECONDS',
    payload: { data }
  };
}

export const addToPassedQA = (data) => {
  return {
    type: 'ADD_TO_PASSED_QA',
    payload: { data }
  };
}

export const moveToShipment = id => {
  return {
    type: 'MOVE_TO_SHIPMENT',
    payload: { id }
  }
}

export const removeFromShipment = (id) => {
  return {
    type: 'REMOVE_FROM_SHIPMENT',
    payload: { id }
  };
}

export const removeForQA = (data) => {
  return {
    type: 'REMOVE_FOR_QA'
  };
}


