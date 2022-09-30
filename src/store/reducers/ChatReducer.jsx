import {
  FETCH_CHAT_USERS_START,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_CHAT_USERS_FAILURE,
  FETCH_CHAT_MESSAGE_START,
  FETCH_CHAT_MESSAGE_SUCCESS,
  FETCH_CHAT_MESSAGE_FAILURE,
  ADD_MESSAGE_CONTENT,
  SAVE_CHAT_USERS_START,
  SAVE_CHAT_USERS_SUCCESS,
  SAVE_CHAT_USERS_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  chatUsers: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  saveChatUser: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  messages: {
    data: {
      messages: [],
      user: {},
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_USERS_START:
      return {
        ...state,
        chatUsers: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chatUsers: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
        },
      };
    case FETCH_CHAT_USERS_FAILURE:
      return {
        ...state,
        chatUsers: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
        },
      };
    case FETCH_CHAT_MESSAGE_START:
      return {
        ...state,
        messages: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case FETCH_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_CHAT_MESSAGE_FAILURE:
      return {
        ...state,
        messages: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case ADD_MESSAGE_CONTENT:
      return {
        ...state,
        messages: {
          data: {
            messages: [...state.messages.data.messages, ...action.data],
            user: { ...state.messages.data.user },
          },
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
      case SAVE_CHAT_USERS_START:
      return {
        ...state,
        saveChatUser: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_CHAT_USERS_SUCCESS:
      return {
        ...state,
        saveChatUser: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_CHAT_USERS_FAILURE:
      return {
        ...state,
        saveChatUser: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    

    default:
      return state;
  }
};

export default ChatReducer;
