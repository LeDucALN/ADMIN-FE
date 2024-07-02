export interface UserForm {
  _id: string
  email: string
  password: string
  username: string
  city: string
  createdAt: string
  updatedAt: string
  phoneNumber: string
  forms: Form[]
}

export interface Form {
  _id: string
  userId: string
  hotelId: string
  hotel: Driver;
  rooms: RoomChoose[]
  name: string
  cost: number
  address: string
  email: string
  phoneNumber: string
  startDate: string
  endDate: string
  comment: string
  adults: number
  note: string
  paymentStatus: string
  rating: number
  isComment: boolean
  createdAt: string
  updatedAt: string
  children: number
}

export interface RoomChoose {
  roomId: string
  quantity: number
}


export interface Driver {
  _id: string
  username: string
  telephone: string
  address: string
  owner: string
  email: string
  images: string[]
  city: string
  distance: number
  discount: number
  comments: any[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  description: string
  ratingAvg: number
  hotelName: string
  hotline: string
  roomIds: string[]
  serviceIds: string[]
  services: string[]
  rooms: Room[]
}

export interface Room {
  _id: string
  price: number
  image: string
  description: string
  createdAt: string
  updatedAt: string
  bookings: Booking[]
  quantity: number
  roomType: string
  maxPeople: number
  beds: Bed[]
  serviceIds: string[]
  services: string[];
}

export interface Booking {
  start: string
  end: string
}

export interface Bed {
  bedId: string
  quantity: number
}
