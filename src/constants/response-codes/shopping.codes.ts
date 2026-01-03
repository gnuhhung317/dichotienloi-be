export const SHOPPING_CODES = {
  /* =====================================================
   * CREATE SHOPPING LIST
   * ===================================================== */

  SHOPPING_FIELDS_REQUIRED: {
    code: '00238',
    message: 'Vui cung cấp tất cả các trường cần thiết',
    status: 400,
  },

  SHOPPING_NAME_REQUIRED: {
    code: '00239',
    message: 'Vui lòng cung cấp tên',
    status: 400,
  },

  ASSIGN_USERNAME_REQUIRED: {
    code: '00240',
    message: 'Vui lòng cung cấp assignToUsername',
    status: 400,
  },

  INVALID_NOTE: {
    code: '00241',
    message: 'Định dạng ghi chú không hợp lệ',
    status: 400,
  },

  INVALID_DATE: {
    code: '00242',
    message: 'Định dạng ngày không hợp lệ',
    status: 400,
  },

  UNAUTHORIZED: {
    code: '00243',
    message: 'Truy cập không được ủy quyền. Bạn không có quyền.',
    status: 403,
  },

  ASSIGNED_USER_NOT_FOUND: {
    code: '00245',
    message: 'Tên người dùng được gán không tồn tại.',
    status: 404,
  },

  ASSIGN_PERMISSION_DENIED: {
    code: '00246',
    message:
      'Truy cập không được ủy quyền. Bạn không có quyền gán danh sách mua sắm cho người dùng này.',
    status: 403,
  },

  SHOPPING_CREATED_SUCCESS: {
    code: '00249',
    message: 'Danh sách mua sắm đã được tạo thành công.',
    status: 201,
  },

  /* =====================================================
   * UPDATE SHOPPING LIST
   * ===================================================== */

  UPDATE_FIELDS_REQUIRED: {
    code: '00250',
    message: 'Vui cung cấp tất cả các trường cần thiết',
    status: 400,
  },

  SHOPPING_ID_REQUIRED: {
    code: '00251',
    message: 'Vui lòng cung cấp id danh sách',
    status: 400,
  },

  UPDATE_AT_LEAST_ONE_FIELD: {
    code: '00252',
    message:
      'Vui lòng cung cấp ít nhất một trong những trường sau, newName, newAssignToUsername, newNote,newDate',
    status: 400,
  },

  INVALID_NEW_NAME: {
    code: '00253',
    message: 'Định dạng tên mới không hợp lệ',
    status: 400,
  },

  INVALID_NEW_ASSIGNED_USER: {
    code: '00254',
    message: 'Định dạng tên người được giao mới không hợp lệ',
    status: 400,
  },

  INVALID_NEW_NOTE: {
    code: '00255',
    message: 'Định dạng ghi chú mới không hợp lệ',
    status: 400,
  },

  INVALID_NEW_DATE: {
    code: '00256',
    message: 'Định dạng ngày mới không hợp lệ',
    status: 400,
  },

  NOT_GROUP_ADMIN: {
    code: '00258',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  SHOPPING_NOT_FOUND: {
    code: '00260',
    message: 'Không tìm thấy danh sách mua sắm',
    status: 404,
  },

  NOT_SHOPPING_ADMIN: {
    code: '00261',
    message: 'Người dùng không phải là quản trị viên của danh sách mua sắm này',
    status: 403,
  },

  USER_NOT_FOUND: {
    code: '00262',
    message: 'Người dùng không tồn tại',
    status: 404,
  },

  ASSIGN_NOT_ALLOWED: {
    code: '00263',
    message:
      'Người dùng không có quyền gán danh sách này cho tên người dùng',
    status: 403,
  },

  SHOPPING_UPDATED_SUCCESS: {
    code: '00266',
    message: 'Cập nhật danh sách mua sắm thành công',
    status: 200,
  },

  /* =====================================================
   * DELETE SHOPPING LIST
   * ===================================================== */

  DELETE_FIELDS_REQUIRED: {
    code: '00267',
    message: 'Cung cấp các trường cần thiết',
    status: 400,
  },

  DELETE_SHOPPING_ID_REQUIRED: {
    code: '00268',
    message: 'Vui lòng cung cấp id danh sách',
    status: 400,
  },

  DELETE_NOT_GROUP_ADMIN: {
    code: '00270',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  DELETE_SHOPPING_NOT_FOUND: {
    code: '00272',
    message: 'Không tìm thấy danh sách mua sắm',
    status: 404,
  },

  DELETE_NOT_SHOPPING_ADMIN: {
    code: '00273',
    message: 'Người dùng không phải là quản trị viên của danh sách mua sắm này',
    status: 403,
  },

  SHOPPING_DELETED_SUCCESS: {
    code: '00275',
    message: 'Xóa danh sách mua sắm thành công',
    status: 200,
  },

  /* =====================================================
   * ADD TASK
   * ===================================================== */

  TASK_FIELDS_REQUIRED: {
    code: '00276',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  TASK_SHOPPING_ID_REQUIRED: {
    code: '00277',
    message: 'Vui lòng cung cấp một ID của danh sách',
    status: 400,
  },

  TASK_ARRAY_REQUIRED: {
    code: '00278',
    message: 'Vui lòng cung cấp một mảng nhiệm vụ',
    status: 400,
  },

  TASK_ARRAY_INVALID: {
    code: '00279',
    message: 'Vui lòng cung cấp một mảng nhiệm vụ với các trường hợp lệ',
    status: 400,
  },

  TASK_NOT_GROUP_ADMIN: {
    code: '00281',
    message: 'Người dùng không phải là quản trị viên của nhóm',
    status: 403,
  },

  TASK_SHOPPING_NOT_FOUND: {
    code: '00283',
    message: 'Không tìm thấy danh sách mua sắm',
    status: 404,
  },

  TASK_NOT_SHOPPING_ADMIN: {
    code: '00284',
    message: 'Người dùng không phải là quản trị viên của danh sách mua sắm này',
    status: 403,
  },

  TASK_FOOD_NOT_FOUND_IN_ARRAY: {
    code: '00285',
    message: 'Không tìm thấy một món ăn với tên cung cấp trong mảng',
    status: 404,
  },

  TASK_FOOD_ALREADY_EXISTS: {
    code: '00287',
    message: 'Loại thức ăn này đã có trong danh sách rồi',
    status: 409,
  },

  TASK_ADDED_SUCCESS: {
    code: '00288',
    message: 'Thêm nhiệm vụ thành công',
    status: 201,
  },

  USER_NOT_IN_GROUP: {
    code: '00292',
    message: 'Người dùng này chưa thuộc nhóm nào',
    status: 403,
  },

  SHOPPING_LIST_FETCHED_SUCCESS: {
    code: '00293',
    message: 'Lấy danh sách các shopping list thành công',
    status: 200,
  },

  /* =====================================================
   * DELETE TASK
   * ===================================================== */

  TASK_ID_REQUIRED: {
    code: '00294',
    message: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId',
    status: 400,
  },

  TASK_NOT_FOUND: {
    code: '00296',
    message: 'Không tìm thấy nhiệm vụ với ID đã cung cấp',
    status: 404,
  },

  DELETE_TASK_NOT_GROUP_ADMIN: {
    code: '00297',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  TASK_DELETED_SUCCESS: {
    code: '00299',
    message: 'Xóa nhiệm vụ thành công',
    status: 200,
  },

  /* =====================================================
   * UPDATE TASK
   * ===================================================== */

  UPDATE_TASK_FIELDS_REQUIRED: {
    code: '00300',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  UPDATE_TASK_ID_REQUIRED: {
    code: '00301',
    message: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId',
    status: 400,
  },

  UPDATE_TASK_AT_LEAST_ONE_FIELD: {
    code: '00302',
    message:
      'Vui lòng cung cấp ít nhất một trong các trường sau, newFoodName, newQuantity',
    status: 400,
  },

  INVALID_NEW_TASK_FOOD_NAME: {
    code: '00303',
    message: 'Vui lòng cung cấp một newFoodName hợp lệ',
    status: 400,
  },

  INVALID_NEW_TASK_QUANTITY: {
    code: '00304',
    message: 'Vui lòng cung cấp một newQuantity hợp lệ',
    status: 400,
  },

  UPDATE_TASK_NOT_FOUND: {
    code: '00306',
    message: 'Không tìm thấy nhiệm vụ với ID đã cung cấp',
    status: 404,
  },

  UPDATE_TASK_NOT_GROUP_ADMIN: {
    code: '00307',
    message: 'Người dùng không phải là quản trị viên nhóm',
    status: 403,
  },

  UPDATE_TASK_FOOD_NOT_FOUND: {
    code: '00308',
    message: 'Không tìm thấy nhiệm vụ với tên đã cung cấp',
    status: 404,
  },

  TASK_FOOD_ALREADY_IN_LIST: {
    code: '00309',
    message: 'Thực phẩm này đã tồn tại trong danh sách mua hàng hiện tại',
    status: 409,
  },

  TASK_UPDATED_SUCCESS: {
    code: '00312',
    message: 'Cập nhật nhiệm vụ thành công',
    status: 200,
  },
} as const;
