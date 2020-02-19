import { HIGHLIGHT_POINT, DEHIGHLIGHT_POINT } from "../actionTypes";

const initialState = {
  highlightedIds: new Set()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HIGHLIGHT_POINT: {
      const { id } = action.payload;
      return {
        ...state,
        highlightedIds: state.highlightedIds.add(id)
      };
    }
    case DEHIGHLIGHT_POINT: {
      const { id } = action.payload;
      state.highlightedIds.delete(id);
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
