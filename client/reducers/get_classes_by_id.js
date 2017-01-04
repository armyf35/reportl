export default function (state = [], action) {
  switch (action.type) {
    case 'GET_CLASSES_BY_ID':
      return [...state, action.payload.data];
    default:
      return state;
  }
}
