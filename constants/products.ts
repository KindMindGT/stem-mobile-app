import { TONE_RAMP } from '@/theme/tones';

const BASE = 'https://zyjcmwcjaenfvseeuriq.supabase.co/storage/v1/object/public/Mobile%20App';

export type Product = {
  id: string;
  name: string;
  price: string;
  tone: keyof typeof TONE_RAMP;
  description: string;
  heroLabel: string;
  imageUrl: string;
  buyUrl: string;
  colors?: string[];   // undefined = no color picker
  sizes?: string[];    // undefined = no size picker
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sistema de control de carrera',
    price: 'Q 4,500.00',
    tone: 'purple',
    heroLabel: 'sistema de control de carrera',
    imageUrl: `${BASE}/Shop1.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/sistema-de-control-de-carrera',
    description:
      'Incluye:\n\nUna configuración de carrera completa y portátil, diseñada para fortalecer el aprendizaje STEM a través de actividades prácticas.\n\nEl sistema incluye una pista enrollable y resistente de 24 metros, un sistema de cronometraje de carrera de alta precisión y compuertas de salida y meta fáciles de usar.\n\nEs ideal para uso en el aula o en eventos, ya que permite una instalación rápida, resultados de carrera precisos y un diseño compacto y fácil de guardar.\n\nCon capacidades inalámbricas y funciones programables, el sistema incorpora datos en tiempo real y emoción competitiva a la educación STEM, en un formato accesible y dinámico.',
  },
  {
    id: 'p2',
    name: 'KIT STEM Discovery',
    price: 'Q 1,200.00',
    tone: 'green',
    heroLabel: 'kit stem discovery',
    imageUrl: `${BASE}/Shop2.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/kit-stem-discovery',
    description:
      'Características\n\nIncluye:\n\n• Pista de carrera enrollable\n• Caja de control de lanzamiento por aire\n• Bomba de lanzamiento por aire\n• Paquete de proyecto, para fabricar 50 autos\n• Equipo de sujeción/guía para autos\n• Recursos de enseñanza\n\nEste producto no es compatible con los autos impulsados por CO₂ de STEM Racing - Primary Class.',
  },
  {
    id: 'p3',
    name: 'STEM Racing Primary Class - Paquete inicial grupal',
    price: 'Q 850.00',
    tone: 'dark',
    heroLabel: 'paquete inicial grupal · 5 autos',
    imageUrl: `${BASE}/Shop3.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/stem-racing-primary-class-paquete-inicial-grupal-para-fabricar-5-autos',
    description:
      'Para fabricar 5 autos\n\nCaracterísticas\n\nIncluye:\n\n• 50 redes impresas para chasis\n• 50 redes impresas para cubierta de motor\n• 50 redes en blanco para carrocería STEM Racing\n• 200 ruedas STEM Racing\n• 200 bujes de eje\n• 50 guías de eje\n• 100 ejes para autos\n• 100 guías para línea de sujeción del eje',
  },
  {
    id: 'p4',
    name: 'Sistema de visualización de aire',
    price: 'Q 2,800.00',
    tone: 'blue',
    heroLabel: 'sistema visualización de aire',
    imageUrl: `${BASE}/Shop4.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/sistema-visualizacion-de-aire',
    description:
      'Una parte esencial del proceso de diseñar, probar y fabricar.\n\nEste sistema está diseñado para visualizar cómo fluye el aire sobre y alrededor de un auto de carrera mientras está en movimiento. Normalmente utiliza humo, hilos de colores, simulación digital o seguimiento de partículas para crear "trazos" visibles de aire que revelan el comportamiento aerodinámico, como la resistencia, la sustentación y la turbulencia.\n\nLa información obtenida ayuda a:\n• Enseñar a los estudiantes sobre dinámica de fluidos y aerodinámica\n• Optimizar el diseño del auto para mejorar su rendimiento y eficiencia\n• Demostrar conceptos reales de física de forma visual e interactiva\n\nLos sistemas modernos pueden incluir túneles de viento, sensores y simulaciones de dinámica de fluidos computacional (CFD), para aumentar la precisión y el valor educativo.',
  },
  {
    id: 'p5',
    name: 'Bloque en blanco para modelo STEM Racing - Unidad individual',
    price: 'Q 95.00',
    tone: 'dark',
    heroLabel: 'bloque en blanco stem racing',
    imageUrl: `${BASE}/Shop5.png`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/bloque-en-blanco-para-modelo-stem-racing-unidad-individual',
    description:
      'Características\n\nEl bloque en blanco mide 223 mm x 65 mm x 50 mm, con un peso constante de 114 g, e incluye un orificio previamente perforado de 18 mm para el Power Pack.\n\nToma en cuenta que el orificio previamente perforado fue reducido de 19 mm a 18 mm para asegurar un ajuste más firme con los Denford Power Packs.',
  },
  {
    id: 'p6',
    name: 'Herramienta de dibujo 3D IsoSketch',
    price: 'Q 320.00',
    tone: 'orange',
    heroLabel: 'herramienta dibujo 3d isosketch',
    imageUrl: `${BASE}/Shop6.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/herramienta-de-dibujo-3d-isosketch',
    description:
      'Características\n\n• Empaque individual tipo blíster\n• Cartuchos de poder (360) de 8 gm\n• Cartuchos de poder (360) de 4 gm',
  },
  {
    id: 'p7',
    name: 'Soporte para pintura',
    price: 'Q 180.00',
    tone: 'pink',
    heroLabel: 'soporte para pintura stem racing',
    imageUrl: `${BASE}/Shop7.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/soporte-para-pintura',
    description:
      'Características\n\nEste soporte sostiene el auto durante el proceso de pintura. El auto queda suspendido por la cámara del Power Pack y, una vez colocado en el soporte, puede girarse para pintar todos sus lados.\n\nNota: el bloque/modelo del auto no está incluido.',
  },
  {
    id: 'p8',
    name: 'Láminas Chasis',
    price: 'Q 120.00',
    tone: 'blue',
    heroLabel: 'láminas chasis discovery primary',
    imageUrl: `${BASE}/Shop8.png`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/laminas-chasis',
    description:
      'Características\n\n• Láminas impresas para chasis para Discovery y Primary\n• Paquete de 50',
  },
  {
    id: 'p9',
    name: 'Bujes de eje',
    price: 'Q 75.00',
    tone: 'dark',
    heroLabel: 'bujes de eje stem racing',
    imageUrl: `${BASE}/Shop9.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/bujes-de-eje',
    description: 'Pack de 100',
  },
  {
    id: 'p10',
    name: 'Ruedas STEM Racing',
    price: 'Q 90.00',
    tone: 'purple',
    heroLabel: 'ruedas stem racing',
    imageUrl: `${BASE}/Shop10.jpg`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/ruedas-stem-racing',
    description: 'Pack de 100',
  },
  {
    id: 'p11',
    name: 'Ruedas Discovery',
    price: 'Q 90.00',
    tone: 'green',
    heroLabel: 'ruedas discovery stem racing',
    imageUrl: `${BASE}/Shop11.png`,
    buyUrl: 'https://app.recurrente.com/s/stem-racing/ruedas-discovery',
    description: 'Pack de 100',
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
