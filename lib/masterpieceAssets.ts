export const masterpieceAssets = {
  hero: '/v21-recovered/19fbebe72e4527124de7.png',
  services: {
    dental: '/assets/Smilecare/doctor pics/Dr. Javier Hernandez_.jpg',
    injectables: '/scmc-luxe/services/botox-fillers.jpeg',
    dermatology: '/scmc-luxe/services/dermatology.jpeg',
    facial: '/v2/service-facial.jpg',
    laser: '/v2/service-laser.jpg',
    laboratory: '/v2/service-laboratory.jpg',
  },
  faculty: {
    nael: '/assets/Smilecare/doctor pics/Dr. Nael Adel.jpg',
    hanan: '/assets/ercanco-style/founder-hanan.jpg',
    mahra: '/scmc/faculty-mahra-al-shehhi.jpg',
    javier: '/v2/doctors/dr-javier-hernandez-hernandez.jpg',
    maher: '/assets/Smilecare/doctor pics/Dr. Maher Ahmed Khamis.png',
    asmaa: '/scmc/faculty-asmaa-shehadeh.jpg',
    duaa: '/v2/doctors/dr-duaa-kassem.jpg',
    syed: '/v2/doctors/dr-syed-anwar-2.jpg',
  },
  beforeAfter: null as { before: string; after: string } | null,
} as const;

export type MasterpieceAssets = typeof masterpieceAssets;