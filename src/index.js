export const REDUX_SET_FOCUS = '@@redux-focus/SET_FOCUS';

export function setFocus(entity) {
  return {
    type: REDUX_SET_FOCUS,
    payload: entity
  };
}

export function clearFocus() {
  return {
    type: REDUX_SET_FOCUS,
    payload: null
  };
}

export function focusReducer(state = null, action) {
  if (action.type === REDUX_SET_FOCUS) {
    return action.payload;
  }

  return state;
}

export function isDefaultFocusEvent(event) {
  return !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
}

export function getDefaultFocusState(state) {
  return state.focus;
}

export function createFocusMiddleware({
  isFocusEvent: isDefaultFocusEvent,
  getFocusState: getDefaultFocusState
}) {
  return ({ getState }) => {
    document.addEventListener('keydown', (event) => {
      if (isFocusEvent(event)) {
        const state = getDefaultFocusState(getState());
        if (state) {
          state.focus(event);
        }
      }
    });

    return (next) => (action) => {
      if (action.type === REDUX_SET_FOCUS && action.payload.blur) {
        action.payload.blur();
      }

      return next(action);
    };
  };
}
