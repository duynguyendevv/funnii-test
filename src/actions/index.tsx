import { GlobalState } from 'little-state-machine';

export const setResult = (state: GlobalState, payload: string): GlobalState => {
  return {
    ...state,
    calculator: {
      ...state.calculator,
      result: payload,
    },
  };
};

export const setOperator = (
  state: GlobalState,
  payload: string
): GlobalState => {
  return {
    ...state,
    calculator: {
      ...state.calculator,
      operator: payload,
    },
  };
};

export const setFirstValue = (
  state: GlobalState,
  payload: string
): GlobalState => {
  return {
    ...state,
    calculator: {
      ...state.calculator,
      firstValue: payload,
    },
  };
};

export const setSecondValue = (
  state: GlobalState,
  payload: string
): GlobalState => {
  return {
    ...state,
    calculator: {
      ...state.calculator,
      secondValue: payload,
    },
  };
};
