import VideoThumb from '@/public/images/hero-image-01.jpg'
import ModalVideo from '@/components/modal-video'
import logo from '@/public/logo.png'

export default function Hero() {
  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 hero">

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-5xl mx-auto text-start pt-24 pb-12 md:pb-16">
            <h1 className="h1 text-7xl mb-8" data-aos="fade-up">Rejoignez-nous pour</h1>
            <h1 className="h1 text-8xl  mb-8 text-[#F8982A]" data-aos="fade-up">explorer de nouveaux horizons</h1>
            <h1 className="h1 text-7xl mb-8" data-aos="fade-up">malgré les obstacles</h1>
            {/* <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">malgré les obstacles</p> */}
            <div className="max-w-xs mt-28 mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-[#F8982A] hover:bg-[#e28821] w-full mb-4 sm:w-auto sm:mb-0" href="#0">en apprendre plus sur nous </a>
              </div>
              <div data-aos="fade-up" data-aos-delay="600"> 
                <a className="btn text-white bg-[#0c0702] hover:bg-[#1b1108] w-full sm:w-auto sm:ml-4" href="#0">voir nos services</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
