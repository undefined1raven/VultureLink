export default function scale(targetValue: number, resolutionRef: number) {
  /*returns relative target width or height depending on screen size*/
  return (targetValue * window.screen.availWidth) / resolutionRef;
}