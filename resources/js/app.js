import './bootstrap';
import Alpine from 'alpinejs';
import Navigo from 'navigo';

window.Alpine = Alpine;

function app() {
    return {
        router: null,
        route: { current: '', previous: '', next: '', params: {}  },
        // post: null,

        async init() {
            this.router = new Navigo('/', { hash: true });

            this.router
                .on('/', () => {
                    this.route.current = 'home';
                })
                .on('/services', () => {
                    this.route.current = 'services';
                })
                .on('/appointments', () => {
                    this.route.current = 'appointments';
                })
                .on('/appointments/details/:id', ({data}) => {
                    this.route.current = 'appointments-details';
                    this.route.params = data.id;
                })
                .on('/privacy', () => {
                    this.route.current = 'privacy';
                })
                .on('/contacts', () => {
                    this.route.current = 'contacts';
                })
                .notFound(() => {
                    this.route.current = '404';
                })
                .resolve();

            window.addEventListener('popstate', () => this.router.resolve());
        }
    };
}


Alpine.data('app', app);
Alpine.store('routeParams', {
    id: null
});
Alpine.start();


// const router = new Navigo('/', { hash: true });

// router
//   .on('/', () => Alpine.store('route').current = 'home')
//   .on('/services', () => Alpine.store('route').current = 'services')
//   .on('/appointments', () => Alpine.store('route').current = 'appointments')
//   .on('/privacy', () => Alpine.store('route').current = 'privacy')
//   .on('/contacts', () => Alpine.store('route').current = 'contacts')
//   .notFound(() => Alpine.store('route').current = 'home')
//   .resolve();

// window.addEventListener('popstate', () => router.resolve());

// Alpine.start();
