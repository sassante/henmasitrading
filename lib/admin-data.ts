export interface Order {
  id: string
  customerName: string
  customerPhone: string
  deliveryLocation: string
  products: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled'
  paymentMethod: string
  createdAt: Date
  mtnReference?: string
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Kofi Mensah',
    customerPhone: '+233 24 123 4567',
    deliveryLocation: 'Tema Industrial Zone',
    products: [
      { name: 'AC Contactor 25A', quantity: 2, price: 45.0 },
      { name: 'Digital Timer 0-60s', quantity: 1, price: 28.0 },
    ],
    totalAmount: 118.0,
    status: 'processing',
    paymentMethod: 'MTN MoMo',
    createdAt: new Date('2024-05-06'),
    mtnReference: 'MTN2024050601',
  },
  {
    id: 'ORD-002',
    customerName: 'Ama Osei',
    customerPhone: '+233 20 987 6543',
    deliveryLocation: 'Accra Central',
    products: [
      { name: 'PVC Trunking 2m', quantity: 5, price: 12.0 },
      { name: 'Panel Light Red 24V', quantity: 3, price: 8.5 },
    ],
    totalAmount: 85.5,
    status: 'delivered',
    paymentMethod: 'MTN MoMo',
    createdAt: new Date('2024-05-05'),
    mtnReference: 'MTN2024050502',
  },
  {
    id: 'ORD-003',
    customerName: 'Kweku Boateng',
    customerPhone: '+233 26 555 1234',
    deliveryLocation: 'Kasoa',
    products: [
      { name: 'Overload Relay 1-1.6A', quantity: 4, price: 35.0 },
      { name: 'Mechanical Timer 15min', quantity: 2, price: 22.0 },
    ],
    totalAmount: 184.0,
    status: 'confirmed',
    paymentMethod: 'MTN MoMo',
    createdAt: new Date('2024-05-04'),
    mtnReference: 'MTN2024050403',
  },
  {
    id: 'ORD-004',
    customerName: 'Yaa Poku',
    customerPhone: '+233 24 678 9012',
    deliveryLocation: 'Takoradi',
    products: [
      { name: 'AC Contactor 40A', quantity: 1, price: 65.0 },
      { name: 'Cable Tray 1m', quantity: 2, price: 18.5 },
    ],
    totalAmount: 102.0,
    status: 'pending',
    paymentMethod: 'MTN MoMo',
    createdAt: new Date('2024-05-03'),
  },
  {
    id: 'ORD-005',
    customerName: 'Nana Asante',
    customerPhone: '+233 27 444 3333',
    deliveryLocation: 'Kumasi',
    products: [
      { name: 'Digital Meter 0-999', quantity: 1, price: 95.0 },
      { name: 'Circuit Breaker 32A MCB', quantity: 3, price: 15.0 },
    ],
    totalAmount: 140.0,
    status: 'delivered',
    paymentMethod: 'MTN MoMo',
    createdAt: new Date('2024-05-02'),
    mtnReference: 'MTN2024050205',
  },
]

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  minStock: number
  description: string
  image: string
  sku: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'AC Contactor 25A',
    category: 'Contactors',
    price: 45.0,
    stock: 15,
    minStock: 5,
    description: 'AC contactor 25A rated for 3-phase applications',
    image: '/products/contactor-25a.jpg',
    sku: 'HEN-CONT-25A',
  },
  {
    id: '2',
    name: 'AC Contactor 40A',
    category: 'Contactors',
    price: 65.0,
    stock: 8,
    minStock: 5,
    description: 'AC contactor 40A rated for 3-phase applications',
    image: '/products/contactor-40a.jpg',
    sku: 'HEN-CONT-40A',
  },
  {
    id: '3',
    name: 'Digital Timer 0-60s',
    category: 'Timers',
    price: 28.0,
    stock: 24,
    minStock: 10,
    description: 'Digital countdown timer with 60-second maximum',
    image: '/products/timer-digital.jpg',
    sku: 'HEN-TIMER-DIG-60',
  },
  {
    id: '4',
    name: 'Mechanical Timer 15min',
    category: 'Timers',
    price: 22.0,
    stock: 3,
    minStock: 10,
    description: 'Mechanical timer with 15-minute setting range',
    image: '/products/timer-mechanical.jpg',
    sku: 'HEN-TIMER-MEC-15',
  },
  {
    id: '5',
    name: 'Overload Relay 1-1.6A',
    category: 'Relays',
    price: 35.0,
    stock: 12,
    minStock: 5,
    description: 'Overload relay rated 1-1.6A for motor protection',
    image: '/products/relay-overload.jpg',
    sku: 'HEN-RELAY-OVR-1.6',
  },
  {
    id: '6',
    name: 'Solid State Relay 25A',
    category: 'Relays',
    price: 42.0,
    stock: 6,
    minStock: 5,
    description: 'Solid state relay 25A AC rated',
    image: '/products/relay-ssr.jpg',
    sku: 'HEN-RELAY-SSR-25',
  },
  {
    id: '7',
    name: 'Panel Light Red 24V',
    category: 'Panel Lights',
    price: 8.5,
    stock: 45,
    minStock: 20,
    description: 'Red LED panel indicator light 24V DC',
    image: '/products/light-red.jpg',
    sku: 'HEN-LIGHT-RED-24',
  },
  {
    id: '8',
    name: 'Digital Meter 0-999',
    category: 'Panel Lights',
    price: 95.0,
    stock: 4,
    minStock: 2,
    description: 'Digital panel meter 0-999 display range',
    image: '/products/meter-digital.jpg',
    sku: 'HEN-METER-DIG-999',
  },
  {
    id: '9',
    name: 'PVC Trunking 2m',
    category: 'Trunking',
    price: 12.0,
    stock: 35,
    minStock: 15,
    description: 'PVC cable trunking 2 meters length',
    image: '/products/trunking-pvc.jpg',
    sku: 'HEN-TRUNK-PVC-2M',
  },
  {
    id: '10',
    name: 'Cable Tray 1m',
    category: 'Trunking',
    price: 18.5,
    stock: 20,
    minStock: 10,
    description: 'Metal cable tray 1 meter length',
    image: '/products/tray-metal.jpg',
    sku: 'HEN-TRAY-MET-1M',
  },
  {
    id: '11',
    name: 'Circuit Breaker 32A MCB',
    category: 'Circuit Breakers',
    price: 15.0,
    stock: 28,
    minStock: 15,
    description: 'Mini circuit breaker 32A single pole',
    image: '/products/breaker-32a.jpg',
    sku: 'HEN-BREAK-MCB-32',
  },
  {
    id: '12',
    name: 'Circuit Breaker 63A MCCB',
    category: 'Circuit Breakers',
    price: 85.0,
    stock: 7,
    minStock: 3,
    description: 'Molded case circuit breaker 63A three pole',
    image: '/products/breaker-63a.jpg',
    sku: 'HEN-BREAK-MCCB-63',
  },
]

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  location: string
  totalOrders: number
  totalSpent: number
  joinDate: Date
}

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Kofi Mensah',
    phone: '+233 24 123 4567',
    email: 'kofi@example.com',
    location: 'Tema Industrial Zone',
    totalOrders: 5,
    totalSpent: 580.5,
    joinDate: new Date('2024-01-15'),
  },
  {
    id: 'CUST-002',
    name: 'Ama Osei',
    phone: '+233 20 987 6543',
    email: 'ama@example.com',
    location: 'Accra Central',
    totalOrders: 3,
    totalSpent: 285.0,
    joinDate: new Date('2024-02-20'),
  },
  {
    id: 'CUST-003',
    name: 'Kweku Boateng',
    phone: '+233 26 555 1234',
    location: 'Kasoa',
    totalOrders: 8,
    totalSpent: 1245.75,
    joinDate: new Date('2023-11-10'),
  },
  {
    id: 'CUST-004',
    name: 'Yaa Poku',
    phone: '+233 24 678 9012',
    location: 'Takoradi',
    totalOrders: 2,
    totalSpent: 180.0,
    joinDate: new Date('2024-03-05'),
  },
  {
    id: 'CUST-005',
    name: 'Nana Asante',
    phone: '+233 27 444 3333',
    email: 'nana@example.com',
    location: 'Kumasi',
    totalOrders: 6,
    totalSpent: 925.5,
    joinDate: new Date('2023-12-01'),
  },
]
