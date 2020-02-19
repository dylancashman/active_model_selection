import { LABEL_POINT_PROMPT } from "../actionTypes";

const initialState = {
  labeledPoint: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LABEL_POINT_PROMPT: {
      const { id, content } = action.payload;
      return {
        ...state,
        labeledPoint: content
      };
    }
    default:
      return state;
  }
}
