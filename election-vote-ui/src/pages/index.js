import Head from 'next/head'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto E-Vote: A Blockchain E-Voting dApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Swiper>
        <SwiperSlide>
        <figure className="relative flex justify-center">
        <img src={`/img/slide/1.jpg`} alt="slide" className="slide-image"/>
        </figure>
        </SwiperSlide>     
        </Swiper>
      </main>
    </>
  )
}
