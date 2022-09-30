import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_FAILURE,
  FETCH_BOOKMARKS_PHOTO_START,
  FETCH_BOOKMARKS_PHOTO_SUCCESS,
  FETCH_BOOKMARKS_PHOTO_FAILURE,
  FETCH_BOOKMARKS_VIDEO_START,
  FETCH_BOOKMARKS_VIDEO_SUCCESS,
  FETCH_BOOKMARKS_VIDEO_FAILURE,
  SAVE_BOOKMARK_START,
  SAVE_BOOKMARK_SUCCESS,
  SAVE_BOOKMARK_FAILURE,
  DELETE_BOOKMARK_START,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  bookmark: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  bookmarkPhoto: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  bookmarkVideo: {
    data: {
      posts: [],
    },
    loading: true,
    error: false,
    inputData: {},
    skip: 0,
    length: 0,
  },
  saveBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteBookmark: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const BookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKS_START:
      return {
        ...state,
        bookmark: {
          inputData: action.data,
          data: {
            posts: [...state.bookmark.data.posts],
          },
          loading: true,
          error: false,
          skip: state.bookmark.skip,
          length: state.bookmark.length,
        },
      };
    case FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmark: {
          data: {
            posts: [...state.bookmark.data.posts, ...action.data.posts],
          },
          loading: false,
          error: false,
          inputData: {},
          skip: action.data.posts.length + state.bookmark.skip,
          length: action.data.posts.length,
        },
      };
    case FETCH_BOOKMARKS_FAILURE:
      return {
        ...state,
        bookmark: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          skip: state.bookmark.skip,
          length: state.bookmark.length,
        },
      };

    case FETCH_BOOKMARKS_PHOTO_START:
      return {
        ...state,
        bookmarkPhoto: {
          inputData: action.data,
          data: {
            posts: [...state.bookmarkPhoto.data.posts],
          },
          loading: true,
          error: false,
          skip: state.bookmarkPhoto.skip,
          length: state.bookmarkPhoto.length,
        },
      };
    case FETCH_BOOKMARKS_PHOTO_SUCCESS:
      return {
        ...state,
        bookmarkPhoto: {
          data: {
            posts: [...state.bookmarkPhoto.data.posts, ...action.data.posts],
          },
          loading: false,
          error: false,
          inputData: {},
          skip: action.data.posts.length + state.bookmarkPhoto.skip,
          length: action.data.posts.length,
        },
      };
    case FETCH_BOOKMARKS_PHOTO_FAILURE:
      return {
        ...state,
        bookmarkPhoto: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          skip: state.bookmarkPhoto.skip,
          length: state.bookmarkPhoto.length,
        },
      };

    case FETCH_BOOKMARKS_VIDEO_START:
      return {
        ...state,
        bookmarkVideo: {
          inputData: action.data,
          data: {
            posts: [...state.bookmarkVideo.data.posts],
          },
          loading: true,
          error: false,
          skip: state.bookmarkVideo.skip,
          length: state.bookmarkVideo.length,
        },
      };
    case FETCH_BOOKMARKS_VIDEO_SUCCESS:
      return {
        ...state,
        bookmarkVideo: {
          data: {
            posts: [...state.bookmarkVideo.data.posts, ...action.data.posts],
          },
          loading: false,
          error: false,
          inputData: {},
          skip: action.data.posts.length + state.bookmarkVideo.skip,
          length: action.data.posts.length,
        },
      };
    case FETCH_BOOKMARKS_VIDEO_FAILURE:
      return {
        ...state,
        bookmarkVideo: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          skip: state.bookmarkVideo.skip,
          length: state.bookmarkVideo.length,
        },
      };
    case SAVE_BOOKMARK_START:
      return {
        ...state,
        saveBookmark: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_BOOKMARK_SUCCESS:
      return {
        ...state,
        saveBookmark: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_BOOKMARK_FAILURE:
      return {
        ...state,
        saveBookmark: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_BOOKMARK_START:
      return {
        ...state,
        deleteBookmark: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        deleteBookmark: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_BOOKMARK_FAILURE:
      return {
        ...state,
        deleteBookmark: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    default:
      return state;
  }
};

export default BookmarkReducer;
