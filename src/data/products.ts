import { Product } from '../types';

export const products: Product[] = [
  // Telescopios Refractores
  {
    id: '1',
    name: 'Celestron NexStar 127SLT',
    brand: 'Celestron',
    type: 'compound',
    price: 599,
    originalPrice: 699,
    image: '/assets/telescopios/Celestron NexStar 127SLT.webp',
    description: 'Telescopio computarizado compacto perfecto para principiantes y astrónomos intermedios.',
    specifications: {
      aperture: '127mm',
      focalLength: '1500mm',
      focalRatio: 'f/12',
      mount: 'Altazimutal computarizada',
      weight: '8.2 kg'
    },
    inStock: true,
    rating: 4.5,
    reviews: 124
  },
  {
    id: '2',
    name: 'Orion SkyQuest XT8',
    brand: 'Orion',
    type: 'reflector',
    price: 449,
    image: '/assets/telescopios/Orion SkyQuest XT8.webp',
    description: 'Telescopio reflector Dobsoniano de 8" ideal para observación de espacio profundo.',
    specifications: {
      aperture: '203mm',
      focalLength: '1200mm',
      focalRatio: 'f/5.9',
      mount: 'Dobsoniano',
      weight: '18.1 kg'
    },
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Meade ETX-90',
    brand: 'Meade',
    type: 'compound',
    price: 799,
    image: '/assets/telescopios/Meade ETX-90.webp',
    description: 'Telescopio Maksutov-Cassegrain ultra portátil con montura GOTO.',
    specifications: {
      aperture: '90mm',
      focalLength: '1250mm',
      focalRatio: 'f/13.8',
      mount: 'Altazimutal GOTO',
      weight: '5.4 kg'
    },
    inStock: false,
    rating: 4.3,
    reviews: 67
  },
  {
    id: '4',
    name: 'Sky-Watcher StarTravel 120',
    brand: 'Sky-Watcher',
    type: 'refractor',
    price: 329,
    image: '/assets/telescopios/Sky-Watcher StarTravel 120.jpg',
    description: 'Telescopio refractor corto ideal para astrofotografía y observación de gran campo.',
    specifications: {
      aperture: '120mm',
      focalLength: '600mm',
      focalRatio: 'f/5',
      mount: 'EQ3-2 Ecuatorial',
      weight: '7.8 kg'
    },
    inStock: true,
    rating: 4.6,
    reviews: 152
  },
  {
    id: '5',
    name: 'Celestron PowerSeeker 127EQ',
    brand: 'Celestron',
    type: 'reflector',
    price: 189,
    image: '/assets/telescopios/Celestron PowerSeeker 127EQ.jpg',
    description: 'Telescopio reflector newtoniano con montura ecuatorial manual, perfecto para principiantes.',
    specifications: {
      aperture: '127mm',
      focalLength: '1000mm',
      focalRatio: 'f/7.9',
      mount: 'Ecuatorial CG-2',
      weight: '12.7 kg'
    },
    inStock: true,
    rating: 4.2,
    reviews: 98
  },
  {
    id: '6',
    name: 'Orion StarBlast 4.5',
    brand: 'Orion',
    type: 'reflector',
    price: 199,
    image: '/assets/telescopios/Orion StarBlast 4.5.webp',
    description: 'Telescopio reflector compacto con diseño de mesa, ideal para observación lunar y planetaria.',
    specifications: {
      aperture: '114mm',
      focalLength: '500mm',
      focalRatio: 'f/4.4',
      mount: 'Mesa Dobsoniana',
      weight: '6.8 kg'
    },
    inStock: true,
    rating: 4.4,
    reviews: 156
  },
  {
    id: '7',
    name: 'Sky-Watcher Evostar 80ED',
    brand: 'Sky-Watcher',
    type: 'refractor',
    price: 549,
    image: '/assets/telescopios/Sky-Watcher Evostar 80ED.webp',
    description: 'Refractor apocromático de alta calidad con lente ED para astrofotografía premium.',
    specifications: {
      aperture: '80mm',
      focalLength: '600mm',
      focalRatio: 'f/7.5',
      mount: 'EQ3-2 Pro',
      weight: '4.2 kg'
    },
    inStock: true,
    rating: 4.9,
    reviews: 73
  },
  {
    id: '8',
    name: 'Meade LX85 8" ACF',
    brand: 'Meade',
    type: 'compound',
    price: 1299,
    originalPrice: 1499,
    image: '/assets/telescopios/Meade LX85 8 ACF.jpg',
    description: 'Telescopio Schmidt-Cassegrain avanzado con corrector de coma para astrofotografía profesional.',
    specifications: {
      aperture: '203mm',
      focalLength: '2032mm',
      focalRatio: 'f/10',
      mount: 'Ecuatorial GoTo',
      weight: '22.7 kg'
    },
    inStock: true,
    rating: 4.7,
    reviews: 45
  },
  {
    id: '9',
    name: 'Celestron AstroMaster 130EQ',
    brand: 'Celestron',
    type: 'reflector',
    price: 249,
    image: '/assets/telescopios/Celestron AstroMaster 130EQ.jpg',
    description: 'Telescopio reflector newtoniano con montura ecuatorial, excelente para observación de espacio profundo.',
    specifications: {
      aperture: '130mm',
      focalLength: '650mm',
      focalRatio: 'f/5',
      mount: 'Ecuatorial CG-2',
      weight: '8.6 kg'
    },
    inStock: true,
    rating: 4.3,
    reviews: 187
  },
  {
    id: '10',
    name: 'Orion SkyQuest XT10',
    brand: 'Orion',
    type: 'reflector',
    price: 649,
    image: '/assets/telescopios/Orion SkyQuest XT10.jpg',
    description: 'Telescopio Dobsoniano de 10" para observación avanzada de objetos de espacio profundo.',
    specifications: {
      aperture: '254mm',
      focalLength: '1200mm',
      focalRatio: 'f/4.7',
      mount: 'Dobsoniano',
      weight: '24.9 kg'
    },
    inStock: true,
    rating: 4.8,
    reviews: 92
  },
  {
    id: '11',
    name: 'Sky-Watcher Maksutov 127',
    brand: 'Sky-Watcher',
    type: 'compound',
    price: 399,
    image: '/assets/telescopios/Sky-Watcher Maksutov 127.jpg',
    description: 'Telescopio Maksutov-Cassegrain compacto, ideal para observación planetaria de alta resolución.',
    specifications: {
      aperture: '127mm',
      focalLength: '1500mm',
      focalRatio: 'f/11.8',
      mount: 'EQ3-2',
      weight: '7.5 kg'
    },
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: '12',
    name: 'Celestron EdgeHD 9.25"',
    brand: 'Celestron',
    type: 'compound',
    price: 1899,
    originalPrice: 2199,
    image: '/assets/telescopios/Celestron EdgeHD 9.25.jpg',
    description: 'Telescopio Schmidt-Cassegrain de alta gama con óptica EdgeHD para astrofotografía profesional.',
    specifications: {
      aperture: '235mm',
      focalLength: '2350mm',
      focalRatio: 'f/10',
      mount: 'CGX Ecuatorial',
      weight: '28.1 kg'
    },
    inStock: false,
    rating: 4.9,
    reviews: 28
  },
  
  // Accesorios
  {
    id: '13',
    name: 'Ocular Celestron X-Cel LX 25mm',
    brand: 'Celestron',
    type: 'accessory',
    price: 79,
    image: '/assets/telescopios/Ocular Celestron X-Cel LX 25mm.jpg',
    description: 'Ocular premium de 25mm con diseño de 6 elementos para vistas nítidas.',
    specifications: {
      focalLength: '25mm',
      'Campo aparente': '50°',
      'Alivio ocular': '20mm',
      'Recubrimiento': 'Multicapa'
    },
    inStock: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: '14',
    name: 'Filtro UHC Orion',
    brand: 'Orion',
    type: 'accessory',
    price: 129,
    image: '/assets/telescopios/Filtro UHC Orion.jpg',
    description: 'Filtro de nebulosas UHC para mejorar el contraste en observación de espacio profundo.',
    specifications: {
      'Tipo': 'Nebular',
      'Rosca': '1.25" y 2"',
      'Transmisión': 'OIII y H-beta',
      'Recubrimiento': 'Ion Gun'
    },
    inStock: true,
    rating: 4.4,
    reviews: 78
  },
  {
    id: '15',
    name: 'Buscador Red Dot Celestron',
    brand: 'Celestron',
    type: 'accessory',
    price: 45,
    image: '/assets/telescopios/Buscador Red Dot Celestron.webp',
    description: 'Buscador de punto rojo para localización rápida y precisa de objetos celestes.',
    specifications: {
      'Tipo': 'Red Dot',
      'Batería': '3V Litio',
      'Montaje': 'Universal',
      'Peso': '85g'
    },
    inStock: true,
    rating: 4.3,
    reviews: 156
  },
  {
    id: '16',
    name: 'Ocular Plossl 10mm Sky-Watcher',
    brand: 'Sky-Watcher',
    type: 'accessory',
    price: 35,
    image: '/assets/telescopios/Ocular Plossl 10mm Sky-Watcher.jpg',
    description: 'Ocular Plossl de 10mm con excelente calidad óptica para observación planetaria.',
    specifications: {
      focalLength: '10mm',
      'Campo aparente': '52°',
      'Alivio ocular': '8mm',
      'Elementos': '4'
    },
    inStock: true,
    rating: 4.5,
    reviews: 89
  },
  {
    id: '17',
    name: 'Filtro Solar Baader',
    brand: 'Baader',
    type: 'accessory',
    price: 89,
    image: '/assets/telescopios/Filtro Solar Baader.webp',
    description: 'Filtro solar de densidad neutra para observación segura del Sol.',
    specifications: {
      'Densidad': 'ND 5.0',
      'Diámetro': '100mm',
      'Material': 'AstroSolar',
      'Seguridad': 'ISO 12312-2'
    },
    inStock: true,
    rating: 4.8,
    reviews: 67
  },
  {
    id: '18',
    name: 'Montura EQ5 Pro Sky-Watcher',
    brand: 'Sky-Watcher',
    type: 'accessory',
    price: 699,
    image: '/assets/telescopios/Montura EQ5 Pro Sky-Watcher.jpg',
    description: 'Montura ecuatorial computarizada con GoTo para astrofotografía avanzada.',
    specifications: {
      'Capacidad': '20kg',
      'Motores': 'Servo',
      'Precisión': '±10 arcsec',
      'Base de datos': '42,000 objetos'
    },
    inStock: true,
    rating: 4.6,
    reviews: 112
  },
  {
    id: '19',
    name: 'Cámara Planetaria ZWO ASI120MC',
    brand: 'ZWO',
    type: 'accessory',
    price: 199,
    image: '/assets/telescopios/Cámara Planetaria ZWO ASI120MC.avif',
    description: 'Cámara CMOS para astrofotografía planetaria y lunar de alta resolución.',
    specifications: {
      'Sensor': 'CMOS 1/3"',
      'Resolución': '1280x960',
      'FPS': '60fps',
      'Conexión': 'USB 3.0'
    },
    inStock: true,
    rating: 4.7,
    reviews: 94
  },
  {
    id: '20',
    name: 'Ocular Zoom Celestron 8-24mm',
    brand: 'Celestron',
    type: 'accessory',
    price: 149,
    image: '/assets/telescopios/Ocular Zoom Celestron 8-24mm.jpg',
    description: 'Ocular zoom versátil que reemplaza múltiples oculares fijos.',
    specifications: {
      'Rango focal': '8-24mm',
      'Campo aparente': '60°',
      'Alivio ocular': '15-20mm',
      'Recubrimiento': 'Multicapa'
    },
    inStock: true,
    rating: 4.4,
    reviews: 178
  }
];

export const brands = ['Celestron', 'Orion', 'Meade', 'Sky-Watcher', 'Baader', 'ZWO'];
export const types = [
  { value: 'refractor', label: 'Refractor' },
  { value: 'reflector', label: 'Reflector' },
  { value: 'compound', label: 'Compuesto' },
  { value: 'accessory', label: 'Accesorio' }
];