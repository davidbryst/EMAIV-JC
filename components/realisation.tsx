import VideoThumb from '@/public/images/hero-image-01.jpg'
import ModalVideo from '@/components/modal-video'
import realisation1 from '@/public/realisation1.jpg'
import realisation2 from '@/public/realisation2.jpg'
import realisation3 from '@/public/realisation3.jpg'
import realisation4 from '@/public/realisation4.jpg'
import Image from 'next/image'

export default function Realisation() {
  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 realisation">

        {/* Hero content */}
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Nos services.</h2>
            <p className="text-xl text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          {/* Items */}
          {/* <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks> */}
          <div className="max-w-sm mx-auto grid gap-8 gap-x-30 md:grid-cols-2 lg:grid-cols-2 lg:gap-16 lg:gap-x-30 items-start md:max-w-2xl lg:max-w-6xl" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              {/* <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-[#F8982A]" width="64" height="64" rx="32" />
                <path className="stroke-current text-[#fff5ea]" d="M30 39.313l-4.18 2.197L27 34.628l-5-4.874 6.91-1.004L32 22.49l3.09 6.26L42 29.754l-3 2.924" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-[#ffd09d]" d="M43 42h-9M43 37h-9" strokeLinecap="square" strokeWidth="2" />
              </svg> */}
              <Image className="mr-10 rounded-[0.25rem]" src={realisation2} width={125} height={125} alt="realisation" />
              <div className="flex flex-col">
                <h4 className="h4">Colonie Tour Europe</h4>
                <p className="text-lg text-gray-800">30 participants</p>
                <p className="text-lg text-gray-800">07 mai 2023</p>
                <p className="text-lg text-gray-800">10 juillet 2023</p>
              </div>
            </div>

            {/* 2nd item */}
            <div className="relative flex items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <Image className="mr-10 rounded-[0.25rem]" src={realisation1} width={125} height={125} alt="realisation" />
              <div className="flex flex-col">
                <h4 className="h4">Colonie Tour Europe</h4>
                <p className="text-lg text-gray-800">30 participants</p>
                <p className="text-lg text-gray-800">07 mai 2023</p>
                <p className="text-lg text-gray-800">10 juillet 2023</p>
              </div>
            </div>

            {/* 3rd item */}
            <div className="relative flex items-center bg-white p-3 rounded-sm" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <Image className="mr-10 rounded-[0.25rem]" src={realisation3} width={125} height={125} alt="realisation" />
              <div className="flex flex-col">
                <h4 className="h4">Colonie Tour Europe</h4>
                <p className="text-lg text-gray-800">30 participants</p>
                <p className="text-lg text-gray-800">07 mai 2023</p>
                <p className="text-lg text-gray-800">10 juillet 2023</p>
              </div>
            </div>
            
            {/* 4th item */}
            <div className="relative flex items-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <Image className="mr-10 rounded-[0.25rem]" src={realisation4} width={125} height={125} alt="realisation" />
              <div className="flex flex-col">
                <h4 className="h4">Colonie Tour Europe</h4>
                <p className="text-lg text-gray-800">30 participants</p>
                <p className="text-lg text-gray-800">07 mai 2023</p>
                <p className="text-lg text-gray-800">10 juillet 2023</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
