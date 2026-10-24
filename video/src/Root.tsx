import { Composition } from "remotion";
import { KonobaSkadarLaunch, KONOBA_SKADAR_FRAMES } from "./konoba-skadar/KonobaSkadarLaunch";
import { BarberDrinaBooking, BARBER_DRINA_BOOKING_FRAMES } from "./barber-drina/BarberDrinaBooking";
import { BarberDrinaLaunch, BARBER_DRINA_LAUNCH_FRAMES } from "./barber-drina/BarberDrinaLaunch";
import { BarberDrinaPrices, BARBER_DRINA_PRICES_FRAMES } from "./barber-drina/BarberDrinaPrices";
import { FPS, HEIGHT, WIDTH } from "./format";

const VIDEOS = [
  { id: "KonobaSkadarLaunch", component: KonobaSkadarLaunch, frames: KONOBA_SKADAR_FRAMES },
  { id: "BarberDrinaLaunch", component: BarberDrinaLaunch, frames: BARBER_DRINA_LAUNCH_FRAMES },
  { id: "BarberDrinaPrices", component: BarberDrinaPrices, frames: BARBER_DRINA_PRICES_FRAMES },
  { id: "BarberDrinaBooking", component: BarberDrinaBooking, frames: BARBER_DRINA_BOOKING_FRAMES },
];

export function Root() {
  return (
    <>
      {VIDEOS.map((video) => (
        <Composition
          key={video.id}
          id={video.id}
          component={video.component}
          durationInFrames={video.frames}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      ))}
    </>
  );
}
