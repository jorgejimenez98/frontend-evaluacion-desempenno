import {initialState} from '../../store'

export const sidebarShowReducer = (state = initialState, {type, ...rest}) => {
  switch (type) {
    case 'set':
      return {...state, ...rest}
    default:
      return state
  }
}
