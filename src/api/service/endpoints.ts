export enum ApiEndpoints {
  LOGIN = "/users/login",
  PROFILE = "/users/me",
  PARKING_AREAS = "/parking-areas",
  PARKING_SLOTS = "/parking-slots",
  UPDATE_SLOT_STATUS = "/parking-slots/update-status",
  // Admin
  ADMIN_CUSTOMER_USERS = "/admin/users",
  ADMIN_CREATE_USER = "/admin/users/create",
  ADMIN_UPDATE_USER = "/admin/users/update",
  ADMIN_DELETE_USERS = "/admin/users/delete",
  ADMIN_CREATE_SLOT = "/admin/parking-slots/create",
  ADMIN_UPDATE_SLOT = "/admin/parking-slots/update",
  ADMIN_DELETE_SLOTS = "/admin/parking-slots/delete",
}
