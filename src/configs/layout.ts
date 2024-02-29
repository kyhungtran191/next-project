import { ROUTE_CONFIG } from './route'

export const VerticalItems = [
  {
    title: 'Hệ thống',
    icon: 'tdesign:system-sum',
    children: [
      {
        title: 'Người dùng',
        icon: 'material-symbols:group-outline',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.SYSTEM.USER
      },
      {
        title: 'Nhóm vai trò',
        icon: 'icon-park-outline:permissions',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.SYSTEM.ROLE
      }
    ]
  },
  {
    title: 'Quản trị',
    icon: 'icon-park-outline:ad-product',
    children: [
      {
        title: 'Danh Sách Sản Phẩm',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.PRODUCT.MANAGER_PRODUCT,
        icon: 'icon-park-outline:ad-product'
      },
      {
        title: 'Danh Mục Sản Phẩm',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.PRODUCT.MANGER_TYPE_PRODUCT,
        icon: 'material-symbols:category-outline'
      },
      {
        title: 'Danh Sách Đơn hàng',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.PRODUCT.MANAGER_ORDER,
        icon: 'lets-icons:order'
      },
      {
        title: 'Danh Sách Đánh Giá',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.PRODUCT.MANGER_REVIEW,
        icon: 'material-symbols:rate-review-rounded'
      }
    ]
  },
  {
    title: 'Cài Đặt',
    icon: 'mingcute:settings-6-line',
    children: [
      {
        title: 'Thành Phố',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.SETTINGS.CITY,
        icon: 'mdi:city'
      },
      {
        title: 'Phương Thức Giao Hàng',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.SETTINGS.DELIVERY_TYPE,
        icon: 'fa-solid:shipping-fast'
      },
      {
        title: 'Phương Thức Thanh Toán',
        path: ROUTE_CONFIG.MANAGER_SYSTEM.SETTINGS.PAYMENT_TYPE,
        icon: 'mdi:payment'
      }
    ]
  }
]
