declare module 'plant' {
  export type visibility = boolean;
  export type category = 'FERNS' | 'BULBOUS' | 'AQUATIC' | 'CACTUS' | 'SUCCULENTS' | 'CARNIVOROUS' | 'HOUSEPLANT';
  export type blight = 'SCALE_INSECT' | 'APHID' | 'WHITEFLY' | 'PIDER_MITE' | 'BRADYSIA' | 'THYSANOPTERA' | 'SNAIL' | 'ROOT_ROT' | 'POWDERY_MILDEW';
  export type sunlightType = 'DIRECT_SUN' | 'SUN' | 'HALF_SHADE' | 'SHADE';
  export type winterTemperatureUpDown = 'UP' | 'DOWN';
}
