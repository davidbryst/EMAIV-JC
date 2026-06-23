# Graph Report - .  (2026-06-19)

## Corpus Check
- Large corpus: 175 files · ~842,407 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 717 nodes · 883 edges · 142 communities (86 shown, 56 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.79)
- Token cost: 379,586 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Appointment UI Components|Appointment UI Components]]
- [[_COMMUNITY_Appointment Domain Core|Appointment Domain Core]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_Authentication|Authentication]]
- [[_COMMUNITY_Domain Models & Wiring|Domain Models & Wiring]]
- [[_COMMUNITY_Utility Helpers|Utility Helpers]]
- [[_COMMUNITY_Lint  Format Tooling|Lint / Format Tooling]]
- [[_COMMUNITY_Admin Dashboard & Routing|Admin Dashboard & Routing]]
- [[_COMMUNITY_Dashboard Header & Layout|Dashboard Header & Layout]]
- [[_COMMUNITY_Marketing Landing Sections|Marketing Landing Sections]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_shadcnui Config|shadcn/ui Config]]
- [[_COMMUNITY_Repositories & API Layer|Repositories & API Layer]]
- [[_COMMUNITY_Appointment API Endpoints|Appointment API Endpoints]]
- [[_COMMUNITY_Public Layout (HeaderFooter)|Public Layout (Header/Footer)]]
- [[_COMMUNITY_Dual-Stack Entrypoints|Dual-Stack Entrypoints]]
- [[_COMMUNITY_Composer Metadata|Composer Metadata]]
- [[_COMMUNITY_PHP Dev Dependencies|PHP Dev Dependencies]]
- [[_COMMUNITY_Login Request Validation|Login Request Validation]]
- [[_COMMUNITY_Composer Config|Composer Config]]
- [[_COMMUNITY_PHP Dependencies|PHP Dependencies]]
- [[_COMMUNITY_Composer Scripts|Composer Scripts]]
- [[_COMMUNITY_User & Auth Schema|User & Auth Schema]]
- [[_COMMUNITY_Composer Autoload|Composer Autoload]]
- [[_COMMUNITY_Remix Server Rendering|Remix Server Rendering]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 121|Community 121]]
- [[_COMMUNITY_Community 122|Community 122]]
- [[_COMMUNITY_Community 123|Community 123]]
- [[_COMMUNITY_Community 124|Community 124]]
- [[_COMMUNITY_Community 125|Community 125]]
- [[_COMMUNITY_Community 126|Community 126]]
- [[_COMMUNITY_Community 127|Community 127]]
- [[_COMMUNITY_Community 128|Community 128]]
- [[_COMMUNITY_Community 129|Community 129]]
- [[_COMMUNITY_Community 130|Community 130]]
- [[_COMMUNITY_Community 131|Community 131]]
- [[_COMMUNITY_Community 132|Community 132]]
- [[_COMMUNITY_Community 133|Community 133]]
- [[_COMMUNITY_Community 134|Community 134]]
- [[_COMMUNITY_Community 135|Community 135]]
- [[_COMMUNITY_Community 136|Community 136]]
- [[_COMMUNITY_Community 137|Community 137]]
- [[_COMMUNITY_Community 138|Community 138]]
- [[_COMMUNITY_Community 139|Community 139]]
- [[_COMMUNITY_Community 140|Community 140]]
- [[_COMMUNITY_Community 141|Community 141]]

## God Nodes (most connected - your core abstractions)
1. `UtilityController` - 39 edges
2. `AppointmentController` - 27 edges
3. `Appointment` - 20 edges
4. `useAppointments()` - 19 edges
5. `compilerOptions` - 15 edges
6. `AppointmentController` - 12 edges
7. `Member` - 12 edges
8. `LoginForm` - 12 edges
9. `useAppStore` - 11 edges
10. `AppointmentsRepository` - 10 edges

## Surprising Connections (you probably didn't know these)
- `shadcn/ui Component Config` --semantically_similar_to--> `Remix Root Layout (Mantine)`  [AMBIGUOUS] [semantically similar]
  components.json → app/root.tsx
- `Vite Config (Laravel/Inertia/SSR)` --semantically_similar_to--> `Vite Config (Remix)`  [AMBIGUOUS] [semantically similar]
  vite.config.js → vite.config.ts
- `Appointment Model (referenced)` --semantically_similar_to--> `types (Member/Appointment/LoginForm/ContactFormData)`  [INFERRED] [semantically similar]
  app/Http/Controllers/Api/AppointmentController.php → resources/js/types/index.ts
- `Realisation/Portfolio Component` --semantically_similar_to--> `Comment Component (JSX)`  [INFERRED] [semantically similar]
  app/components/realisation/realisation.tsx → resources/js/jsx/comment.jsx
- `Create Appointments Table Migration` --semantically_similar_to--> `Member Model`  [INFERRED] [semantically similar]
  database/migrations/2025_07_23_000001_create_appointments_table.php → app/Models/Member.php

## Hyperedges (group relationships)
- **Mantine landing-page section components** — hero_component, about_component, features_component, comment_component, realisation_component, footer_component, header_component [INFERRED 0.85]
- **Appointment booking + email confirmation flow** — appointmentcontroller_api, appointment_model, email_appointment_template [INFERRED 0.85]
- **Remix SSR/hydration render pipeline** — entryclient_remixhydrate, entryserver_remixrender, root_remixlayout [INFERRED 0.85]
- **User Authentication Data Flow** — user_model, createusers_migration, auth_config, loginrequest_loginrequest [INFERRED 0.75]
- **Appointment Booking Domain** — appointment_model, member_model, createappointments_migration [INFERRED 0.85]
- **Appointment Detail View Composition** — appointmentdetailscontent_component, membercard_component, utilitycontroller_entity, usegeneratepdf_hook, usesendemail_hook [INFERRED 0.75]
- **Database Seeding Flow** — databaseseeder_run, appointmentseeder_run, appointment_model_entity, member_model_entity [EXTRACTED 1.00]
- **Public Landing Page Sections** — hero_component, about_component, features_component, comment_component, newsletter_component [INFERRED 0.65]
- **Appointment Hooks to Controller to Repository Flow** — useappointments_hook, appointmentcontroller, reposappointments_repo [EXTRACTED 0.85]
- **Authentication Flow across Context, Controller, Repository** — authcontext_provider, authcontroller, reposauth_repo [INFERRED 0.75]
- **Zustand-backed Hooks Pattern** — useappointments_hook, useauth_hook, usetimeslots_hook [EXTRACTED 0.85]
- **Pages consuming useAppointments / Zustand store** — page_appointments, page_appointmentsall, page_appointmentsdetails, page_appointmentsnew, page_dashboard, ext_useappointments [INFERRED 0.85]
- **Admin pages registering dashboard header context** — page_appointmentsall, page_appointmentscalendar, page_appointmentsdetailsadmin, ext_dashboardheader_ctx [EXTRACTED 1.00]
- **Authentication login flow participants** — page_login, page_adminlogin, ext_useauth, ext_authcontext, ext_repo_auth [INFERRED 0.85]
- **Frontend data-access layer (store -> repos -> axios -> types)** — useappstore_useappstore, repositoriesappointments_appointmentsrepository, axios_apiclient, index_types [INFERRED 0.85]
- **Appointment booking to confirmation email flow** — web_apicontroller, appointment_emailtemplate, index_types [INFERRED 0.75]

## Communities (142 total, 56 thin omitted)

### Community 0 - "Appointment UI Components"
Cohesion: 0.06
Nodes (38): AppointmentCard(), AppointmentCardProps, AppointmentDetailsContent(), Props, MemberCardProps, Notification(), AppointmentController, useAppointments() (+30 more)

### Community 1 - "Appointment Domain Core"
Cohesion: 0.08
Nodes (39): Appointment Model (referenced), AppointmentController (API), AuthenticatedSessionController, Base Controller (abstract), Create Appointments Table Migration, emails.appointment template (referenced), emails.contacts template (referenced), AppointmentCard component (+31 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.06
Nodes (36): dependencies, axios, class-variance-authority, clsx, concurrently, globals, @headlessui/react, @inertiajs/react (+28 more)

### Community 3 - "Authentication"
Cohesion: 0.09
Nodes (13): AuthContext, AuthContextType, AuthProviderProps, useAuth(), User, AuthController, AuthRepository, WebRepository (+5 more)

### Community 4 - "Domain Models & Wiring"
Cohesion: 0.09
Nodes (31): Appointment Model, Appointment Type, AppointmentCard Component, AppointmentController, AppointmentDetailsContent Component, AppointmentEditModal Component, AppointmentSeeder.run, useAppStore (Zustand store) (+23 more)

### Community 6 - "Lint / Format Tooling"
Cohesion: 0.07
Nodes (26): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, prettier, prettier-plugin-organize-imports (+18 more)

### Community 7 - "Admin Dashboard & Routing"
Cohesion: 0.10
Nodes (12): ProtectedRoute(), ProtectedRouteProps, SidebarItem, useAuth(), Dashboard(), DashboardStats, RecentAppointment, recentAppointments (+4 more)

### Community 8 - "Dashboard Header & Layout"
Cohesion: 0.11
Nodes (15): AppointmentEditModalProps, EditForm, DashboardMobileHeaderProps, DashboardHeaderContext, DashboardHeaderContextValue, DashboardHeaderProvider(), HeaderState, useDashboardHeader() (+7 more)

### Community 9 - "Marketing Landing Sections"
Cohesion: 0.10
Nodes (7): values, CommentData, mockdata, Service, services, mockdata, RealisationItem

### Community 10 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, module (+10 more)

### Community 11 - "shadcn/ui Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 12 - "Repositories & API Layer"
Cohesion: 0.23
Nodes (15): App Blade Shell (SPA entry), Appointment Confirmation Email, Axios API Client, Contact Form Email, Controllers Architecture Doc, Shared TypeScript Types, Zustand Usage Guide, AppointmentsRepository (+7 more)

### Community 14 - "Public Layout (Header/Footer)"
Cohesion: 0.15
Nodes (7): data, FooterGroup, FooterLink, socials, mainLinks, NavLink, BasicLayoutProps

### Community 15 - "Dual-Stack Entrypoints"
Cohesion: 0.22
Nodes (10): Artisan Console Entry, shadcn/ui Component Config, Laravel 12 Application (composer), Remix Client Entry (hydrateRoot), Remix Server Entry (renderToPipeableStream), Remix Root Layout (Mantine), Tailwind Config (Inter font, app content), TypeScript Config (@/* -> resources/js) (+2 more)

### Community 16 - "Composer Metadata"
Cohesion: 0.22
Nodes (8): description, keywords, license, minimum-stability, name, prefer-stable, $schema, type

### Community 17 - "PHP Dev Dependencies"
Cohesion: 0.22
Nodes (9): require-dev, fakerphp/faker, laravel/pail, laravel/pint, laravel/sail, mockery/mockery, nunomaduro/collision, pestphp/pest (+1 more)

### Community 19 - "Composer Config"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 20 - "PHP Dependencies"
Cohesion: 0.29
Nodes (7): require, inertiajs/inertia-laravel, laravel/framework, laravel/sanctum, laravel/tinker, php, tightenco/ziggy

### Community 21 - "Composer Scripts"
Cohesion: 0.29
Nodes (7): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, test

### Community 22 - "User & Auth Schema"
Cohesion: 0.60
Nodes (5): Auth Config, Create Users Table Migration, LoginRequest, User Model, UserFactory

### Community 23 - "Composer Autoload"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 24 - "Remix Server Rendering"
Cohesion: 0.83
Nodes (3): handleBotRequest(), handleBrowserRequest(), handleRequest()

### Community 28 - "Community 28"
Cohesion: 0.50
Nodes (4): Hero (jsx legacy), Newsletter (jsx legacy), Home page, Realisation (jsx legacy)

### Community 41 - "Community 41"
Cohesion: 0.67
Nodes (3): autoload-dev, psr-4, Tests\\

### Community 42 - "Community 42"
Cohesion: 0.67
Nodes (3): extra, laravel, dont-discover

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (3): Application Bootstrap, AppServiceProvider, Bootstrap Providers Registry

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (3): Comment/Testimonials Component, Comment Component (JSX), Realisation/Portfolio Component

## Ambiguous Edges - Review These
- `shadcn/ui Component Config` → `Remix Root Layout (Mantine)`  [AMBIGUOUS]
  components.json · relation: semantically_similar_to
- `Vite Config (Laravel/Inertia/SSR)` → `Vite Config (Remix)`  [AMBIGUOUS]
  vite.config.ts · relation: semantically_similar_to
- `AppointmentSeeder.run` → `Laravel Public Entry Point`  [AMBIGUOUS]
  public/index.php · relation: conceptually_related_to

## Knowledge Gaps
- **254 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+249 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `shadcn/ui Component Config` and `Remix Root Layout (Mantine)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Vite Config (Laravel/Inertia/SSR)` and `Vite Config (Remix)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `AppointmentSeeder.run` and `Laravel Public Entry Point`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `UtilityController` connect `Utility Helpers` to `Appointment UI Components`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `AppointmentController` connect `Appointment UI Components` to `Admin Dashboard & Routing`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `dependencies` connect `NPM Dependencies` to `Lint / Format Tooling`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _255 weakly-connected nodes found - possible documentation gaps or missing edges._