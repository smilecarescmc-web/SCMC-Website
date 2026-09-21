export type ScmcHeroAsset =
  | { type: "video"; src: string }
  | { type: "image"; src: string }
  | null;

export type ScmcAssetManifest = {
  hero: ScmcHeroAsset;
  faculty: {
    nael: string | null;
    hanan: string | null;
    mahra: string | null;
    javier: string | null;
    maher: string | null;
    asmaa: string | null;
    duaa: string | null;
    syed: string | null;
  };
  transformation: { before: string | null; after: string | null };
};

export const scmcAssets: ScmcAssetManifest = {
  hero: { type: 'image', src: '/scmc-cinematic/hero.jpg' },
  faculty: {
    nael: '/scmc-cinematic/faculty-nael.jpeg',
    hanan: '/scmc-cinematic/faculty-hanan.jpg',
    mahra: '/scmc-cinematic/faculty-mahra.jpg',
    javier: '/scmc-cinematic/faculty-javier.jpeg',
    maher: '/scmc-cinematic/faculty-maher.png',
    asmaa: '/scmc-cinematic/faculty-asmaa.jpeg',
    duaa: '/scmc-cinematic/faculty-duaa.jpg',
    syed: '/scmc-cinematic/faculty-syed.jpg',
  },
  transformation: {
    before: null,
    after: null,
  },
};