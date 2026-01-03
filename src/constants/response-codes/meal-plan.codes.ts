export const MEAL_PLAN_CODES = {
  /* =====================================================
   * CREATE MEAL PLAN
   * ===================================================== */

  MEAL_PLAN_FIELDS_REQUIRED: {
    code: '00313',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  INVALID_FOOD_NAME: {
    code: '00314',
    message: 'Vui lòng cung cấp một tên thực phẩm hợp lệ',
    status: 400,
  },

  INVALID_TIMESTAMP: {
    code: '00315',
    message: 'Vui lòng cung cấp một dấu thời gian hợp lệ',
    status: 400,
  },

  INVALID_MEAL_TYPE: {
    code: '00316',
    message: 'Vui lòng cung cấp một tên hợp lệ cho bữa ăn,sáng, trưa, tối',
    status: 400,
  },

  FOOD_NOT_FOUND: {
    code: '00317',
    message: 'Không tìm thấy thực phẩm với tên đã cung cấp',
    status: 404,
  },

  NOT_GROUP_ADMIN: {
    code: '00319',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  MEAL_PLAN_CREATED_SUCCESS: {
    code: '00322',
    message: 'Thêm kế hoạch bữa ăn thành công',
    status: 201,
  },

  /* =====================================================
   * DELETE MEAL PLAN
   * ===================================================== */

  DELETE_MEAL_PLAN_FIELDS_REQUIRED: {
    code: '00323',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  INVALID_MEAL_PLAN_ID: {
    code: '00324',
    message: 'Vui lòng cung cấp một ID kế hoạch hợp lệ',
    status: 400,
  },

  MEAL_PLAN_NOT_FOUND: {
    code: '00325',
    message: 'Không tìm thấy kế hoạch với ID đã cung cấp',
    status: 404,
  },

  DELETE_NOT_GROUP_ADMIN: {
    code: '00327',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  MEAL_PLAN_DELETED_SUCCESS: {
    code: '00330',
    message: 'Kế hoạch bữa ăn của bạn đã được xóa thành công',
    status: 200,
  },
  /* =====================================================
   * UPDATE MEAL PLAN
   * ===================================================== */

  UPDATE_FIELDS_REQUIRED: {
    code: '00331',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  MEAL_PLAN_ID_REQUIRED: {
    code: '00332',
    message: 'Vui lòng cung cấp một ID kế hoạch!',
    status: 400,
  },

  UPDATE_FIELDS_EMPTY: {
    code: '00333',
    message:
      'Vui lòng cung cấp ít nhất một trong các trường sau, newFoodName, newTimestamp, newName',
    status: 400,
  },

  INVALID_NEW_FOOD_NAME: {
    code: '00334',
    message: 'Vui lòng cung cấp một tên thực phẩm mới hợp lệ!',
    status: 400,
  },

  INVALID_NEW_TIMESTAMP: {
    code: '00335',
    message: 'Vui lòng cung cấp một dấu thời gian hợp lệ!',
    status: 400,
  },

  INVALID_NEW_MEAL_NAME: {
    code: '00336',
    message: 'Vui lòng cung cấp một tên hợp lệ, sáng, trưa, tối!',
    status: 400,
  },

//   MEAL_PLAN_NOT_FOUND: {
//     code: '00337',
//     message: 'Không tìm thấy kế hoạch với ID đã cung cấp',
//     status: 404,
//   },

//   NOT_GROUP_ADMIN: {
//     code: '00339',
//     message: 'Người dùng không phải là quản trị viên nhóm',
//     status: 403,
//   },

  NEW_FOOD_NOT_FOUND: {
    code: '00341',
    message: 'Tên thực phẩm mới không tồn tại',
    status: 404,
  },

  MEAL_PLAN_UPDATED_SUCCESS: {
    code: '00344',
    message: 'Cập nhật kế hoạch bữa ăn thành công',
    status: 200,
  },

  /* =====================================================
   * GET MEAL PLAN LIST
   * ===================================================== */

  USER_NOT_IN_GROUP: {
    code: '00345',
    message: 'Bạn chưa vào nhóm nào',
    status: 403,
  },

  GET_MEAL_PLANS_SUCCESS: {
    code: '00348',
    message: 'Lấy danh sách thành công',
    status: 200,
  },
} as const;
