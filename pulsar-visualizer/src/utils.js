export function raDecToCartesian(ra, dec) {
  const raRad = (ra / 180) * Math.PI;
  const decRad = (dec / 180) * Math.PI;
  const x = Math.cos(decRad) * Math.cos(raRad);
  const y = Math.cos(decRad) * Math.sin(raRad);
  const z = Math.sin(decRad);
  return [x, y, z];
}
