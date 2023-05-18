import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [1];

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto E-Votes - Blockchain E-Voting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Swiper
          spaceBetween={30}
          hashNavigation={{
            watchState: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, HashNavigation]}
          className="mySwiper"
        >
          {
            slides.map((idx) => {
              return (
                <SwiperSlide data-hash={`slide${idx}`} key={idx}>
                  <figure className="relative flex justify-center">
                    <img src={`/img/slide/${idx}.jpg`} alt="slide" className="slide-image"/>
                  </figure>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </main>
    </>
  )
}
