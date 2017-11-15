
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getComments ({ comments }) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment ({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function voteComment ({ comment }) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export function editComment (id, timestamp, body) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function deleteComment ( comment ) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}