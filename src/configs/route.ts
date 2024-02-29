export const ROUTE_CONFIG = {
  MY_PROFILE: '/my-profile',
  LOGIN: '/login',
  CHANGE_PASSWORD: '/change-password',
  MANAGER_SYSTEM: {
    SYSTEM: { ROLE: '/system/role', USER: '/system/user' },
    PRODUCT: {
      MANAGER_PRODUCT: '/product/manage-product',
      MANAGER_ORDER: '/product/manage-order',
      MANGER_REVIEW: '/product/manage-review',
      MANGER_TYPE_PRODUCT: '/product/manage-type-product'
    },
    SETTINGS: {
      CITY: '/settings/city',
      PAYMENT_TYPE: '/settings/payment-type',
      DELIVERY_TYPE: '/settings/delivery-type'
    }
  }
}
