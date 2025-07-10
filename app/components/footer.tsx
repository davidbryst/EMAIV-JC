import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';

const data = [
  {
    title: 'Products',
    links: [
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
      { label: 'Lorem ipsum dolor sit', link: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="flex flex-1 flex-col justify-center items-center mt-8 mb-8 md:mb-0">
          <img src="/logoW.png" alt="Logo" className="w-40 h-auto mb-2 rounded" />
          {/* <span className="text-xs text-gray-400">Build fully functional accessible web applications faster than ever</span> */}
        </div>
        <div className="flex flex-1 justify-between gap-8">
          {data.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wider text-gray-300">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.link}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-gray-400">
          © emaiv-jc.com, tout les droits reserver.
        </span>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <IconBrandTwitter size={20} stroke={1.5} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <IconBrandYoutube size={20} stroke={1.5} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <IconBrandInstagram size={20} stroke={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}