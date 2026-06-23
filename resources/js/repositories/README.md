# Architecture des Repositories

## Vue d'ensemble

Cette architecture centralise tous les appels API dans des repositories spécialisés, utilisant Axios comme client HTTP et des types TypeScript centralisés.

## Structure des fichiers

```
resources/js/
├── types/
│   └── index.ts                    # Types TypeScript centralisés
├── repositories/
│   ├── repositoriesAppointments.ts # API des rendez-vous
│   ├── repositoriesAuth.ts         # API d'authentification
│   ├── repositoriesWeb.ts          # Routes web (non-API)
│   └── README.md                   # Cette documentation
└── utils/
    └── axios.ts                    # Configuration Axios
```

## Repositories disponibles

### 1. AppointmentsRepository (`repositoriesAppointments.ts`)

Gère toutes les opérations liées aux rendez-vous via l'API `/api/appointments/*`.

**Méthodes disponibles :**
- `getAllAppointments()` - Récupérer tous les RDV
- `getAppointmentsByPhone(prefixe, searchPhone)` - Recherche par téléphone
- `getAppointmentById(id)` - Récupérer un RDV par ID
- `createAppointment(data)` - Créer un nouveau RDV
- `updateAppointment(id, data)` - Mettre à jour un RDV
- `deleteAppointment(id)` - Supprimer un RDV
- `getAvailableSlots(date)` - Récupérer les créneaux disponibles
- `sendEmails(data)` - Envoyer des e-mails

### 2. AuthRepository (`repositoriesAuth.ts`)

Gère l'authentification via l'API `/api/user`.

**Méthodes disponibles :**
- `checkAuth(token)` - Vérifier l'authentification avec token
- `checkAuthSession()` - Vérifier l'authentification via session

### 3. WebRepository (`repositoriesWeb.ts`)

Gère les routes web (non-API) comme `/login`, `/logout`, etc.

**Méthodes disponibles :**
- `login(data)` - Connexion utilisateur
- `logout()` - Déconnexion utilisateur
- `register(data)` - Inscription utilisateur
- `forgotPassword(email)` - Demande de réinitialisation
- `resetPassword(token, password, confirmation)` - Réinitialisation

## Types centralisés (`types/index.ts`)

Toutes les interfaces TypeScript sont centralisées dans ce fichier :

- **Appointment** - Structure d'un rendez-vous
- **Member** - Structure d'un membre
- **User** - Structure d'un utilisateur
- **LoginForm/LoginResponse** - Authentification
- **CreateAppointmentData** - Création de RDV
- **UpdateAppointmentData** - Mise à jour de RDV
- **TimeSlot** - Créneaux horaires
- **ApiResponse** - Réponse API générique

## Configuration Axios (`utils/axios.ts`)

Configuration centralisée avec :
- Base URL : `/api`
- Timeout : 10 secondes
- Headers par défaut
- Intercepteurs pour CSRF token (CSRF DÉSACTIVÉ)
- Gestion d'erreurs centralisée

## Utilisation dans les composants

### Exemple avec AppointmentsRepository

```typescript
import appointmentsRepository from '../repositories/repositoriesAppointments';

// Dans un composant
const loadAppointments = async () => {
  try {
    const data = await appointmentsRepository.getAllAppointments();
    setAppointments(data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### Exemple avec WebRepository

```typescript
import webRepository from '../repositories/repositoriesWeb';
import { LoginForm } from '../types';

const handleLogin = async (form: LoginForm) => {
  try {
    const response = await webRepository.login(form);
    if (response.success) {
      // Traitement du succès
    }
  } catch (error) {
    // Gestion d'erreur
  }
};
```

## Avantages de cette architecture

1. **Séparation des responsabilités** : Chaque repository a un rôle spécifique
2. **Réutilisabilité** : Les repositories peuvent être utilisés partout
3. **Maintenance** : Un seul endroit pour modifier les appels API
4. **Type Safety** : Types TypeScript centralisés
5. **Testabilité** : Facile de mocker les repositories
6. **Gestion d'erreurs** : Centralisée via les intercepteurs Axios

## Routes API correspondantes

### Appointments
- `GET /api/appointments/all` - Tous les RDV
- `GET /api/appointments?prefixe=...&searchPhone=...` - Recherche par téléphone
- `GET /api/appointments/{id}` - RDV par ID
- `POST /api/appointments/new` - Créer RDV
- `PUT /api/appointments/{id}` - Mettre à jour RDV
- `DELETE /api/appointments/{id}` - Supprimer RDV
- `GET /api/appointments/available-slots` - Créneaux disponibles
- `POST /api/appointments/send-emails` - Envoyer e-mails

### Auth
- `GET /api/user` - Informations utilisateur

### Web Routes
- `POST /login` - Connexion
- `POST /logout` - Déconnexion
- `POST /register` - Inscription
- `POST /forgot-password` - Mot de passe oublié
- `POST /reset-password` - Réinitialisation
