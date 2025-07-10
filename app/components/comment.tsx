import realisation from '../../../public/realisation.jpg';

const mockdata = [
  {
    image: '/realisation.jpg',
    text: '— Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, optio dicta. Totam vitae voluptatum consequuntur fugit sit, facere illum tempora culpa nulla enim mollitia quo maiores delectus doloremque aliquam eum. —',
    name: 'David abraham',
    info: 'Visa visiteur Canada',
  },
  {
    image: '/realisation.jpg',
    text: '— Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, optio dicta. Totam vitae voluptatum consequuntur fugit sit, facere illum tempora culpa nulla enim mollitia quo maiores delectus doloremque aliquam eum. —',
    name: 'David abraham',
    info: 'Visa visiteur Canada',
  },
  {
    image: '/realisation.jpg',
    text: '— Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, optio dicta. Totam vitae voluptatum consequuntur fugit sit, facere illum tempora culpa nulla enim mollitia quo maiores delectus doloremque aliquam eum. —',
    name: 'David abraham',
    info: 'Visa visiteur Canada',
  },
];

export default function Comment() {
  return (
    <div className="bg-[#f0eeec] py-24">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-black">
          Ne nous croyez pas que sur nos parole
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {mockdata.map((comment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 border"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  alt="Jacob Warnhalter"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm text-black font-semibold">{comment.name}</div>
                  <div className="text-xs text-gray-500">{comment.info}</div>
                </div>
              </div>
              <div className="prose prose-sm text-gray-700 mt-2">
                {index === 1 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
                    }}
                  />
                ) : (
                  comment.text
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}