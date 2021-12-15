export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export const PLUS = "PLUS";
export const DELETE = "DELETE";
export const DELETE_ALL = "DELETE_ALL";

export function add(payload) {
  return {
    type: PLUS,
    payload,
  };
}

export function deleteTarget(payload) {
  return {
    type: DELETE,
    payload,
  };
}

export function delete_all() {
  return {
    type: DELETE_ALL,
  };
}
