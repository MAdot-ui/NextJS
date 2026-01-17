export interface Review {
  id: string;
  author: string;
  date: string;
  comment: string;
  rating: number;
}

export interface House {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  image: string;
  amenities: string[];
  reviews: Review[];
}

export const houses: House[] = [
  {
    id: '1',
    name: 'Casa rural Málaga',
    description:
      'Fantástica casa rural en Málaga disponible para todo el verano, con 5 habitaciones, 2 cuartos de baños, piscina...',
    address: 'Calle Camino Cupiana',
    city: 'Málaga',
    country: 'España',
    bedrooms: 5,
    beds: 8,
    bathrooms: 2,
    price: 150,
    image: '/casa-malaga.jpg',
    amenities: ['Piscina', 'WiFi', 'Jardín', 'Parking', 'Cocina equipada'],
    reviews: [
      {
        id: 'r1',
        author: 'Ana',
        date: '2021-08-12',
        comment: 'La casa es fantástica. 100% recomendado.',
        rating: 5,
      },
      {
        id: 'r2',
        author: 'Miguel',
        date: '2021-03-22',
        comment:
          'Son super amables y pudimos pasar un rato bueno en familia. Muy recomendado',
        rating: 5,
      },
    ],
  },
  {
    id: '2',
    name: 'Casa rural Tomelloso',
    description:
      'Acogedora casa rural en Tomelloso perfecta para familias. Cuenta con amplias habitaciones, jardín privado y zona de barbacoa.',
    address: 'Calle Real 45',
    city: 'Tomelloso',
    country: 'España',
    bedrooms: 4,
    beds: 6,
    bathrooms: 2,
    price: 120,
    image: '/casa-tomelloso.jpg',
    amenities: [
      'Barbacoa',
      'WiFi',
      'Jardín',
      'Calefacción',
      'Aire acondicionado',
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Laura',
        date: '2021-07-15',
        comment: 'Muy buena ubicación y la casa muy limpia. Volveremos seguro.',
        rating: 5,
      },
    ],
  },
  {
    id: '3',
    name: 'Casa de campo Jaen',
    description:
      'Encantadora casa de campo rodeada de olivos en Jaén. Ideal para desconectar y disfrutar de la naturaleza.',
    address: 'Camino del Olivar',
    city: 'Jaén',
    country: 'España',
    bedrooms: 3,
    beds: 5,
    bathrooms: 1,
    price: 90,
    image: '/casa-jaen.jpg',
    amenities: [
      'Vistas al campo',
      'WiFi',
      'Chimenea',
      'Parking',
      'Mascotas permitidas',
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Carlos',
        date: '2021-09-05',
        comment: 'Un lugar perfecto para relajarse. Muy tranquilo y bonito.',
        rating: 4,
      },
      {
        id: 'r5',
        author: 'Elena',
        date: '2021-06-18',
        comment: 'La casa está muy bien cuidada y el entorno es precioso.',
        rating: 5,
      },
    ],
  },
  {
    id: '4',
    name: 'Casa con piscina Valencia',
    description:
      'Moderna casa con piscina privada y todas las comodidades. Perfecta para el verano y grupos grandes.',
    address: 'Urbanización Los Pinos 12',
    city: 'Valencia',
    country: 'España',
    bedrooms: 6,
    beds: 10,
    bathrooms: 3,
    price: 200,
    image: '/casa-valencia.jpg',
    amenities: [
      'Piscina privada',
      'WiFi',
      'Aire acondicionado',
      'Jardín',
      'BBQ',
      'Parking',
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Pedro',
        date: '2021-08-20',
        comment: 'Perfecta para ir con un grupo grande. La piscina es genial.',
        rating: 5,
      },
    ],
  },
  {
    id: '5',
    name: 'Casa rural Granada',
    description:
      'Preciosa casa rural con vistas a Sierra Nevada. Perfecta para disfrutar de la montaña y la tranquilidad del campo andaluz.',
    address: 'Camino de la Alpujarra 23',
    city: 'Granada',
    country: 'España',
    bedrooms: 4,
    beds: 7,
    bathrooms: 2,
    price: 130,
    image: '/casa-granada.jpg',
    amenities: [
      'Vistas a la montaña',
      'WiFi',
      'Chimenea',
      'Jardín',
      'Parking',
      'Senderismo',
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Sofia',
        date: '2021-05-10',
        comment:
          'Las vistas son espectaculares. Un lugar mágico para desconectar.',
        rating: 5,
      },
      {
        id: 'r8',
        author: 'Antonio',
        date: '2021-04-03',
        comment:
          'Casa muy acogedora y bien equipada. La chimenea es perfecta para las noches frías.',
        rating: 5,
      },
    ],
  },
  {
    id: '6',
    name: 'Casa rural Asturias',
    description:
      'Encantadora casa tradicional asturiana con hórreo. Rodeada de naturaleza y cerca de las playas del Cantábrico.',
    address: 'Aldea de Sotres',
    city: 'Asturias',
    country: 'España',
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    price: 110,
    image: '/casa-asturias.jpg',
    amenities: [
      'WiFi',
      'Calefacción',
      'Jardín',
      'Cerca de la playa',
      'Rutas de montaña',
      'Parking',
    ],
    reviews: [
      {
        id: 'r9',
        author: 'María',
        date: '2021-07-28',
        comment:
          'Casa auténtica con mucho encanto. Ideal para conocer Asturias.',
        rating: 5,
      },
      {
        id: 'r10',
        author: 'Javier',
        date: '2021-08-15',
        comment:
          'Muy buena ubicación entre montaña y playa. Volveremos sin duda.',
        rating: 4,
      },
    ],
  },
];
