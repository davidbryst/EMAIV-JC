# Utilisation de Zustand pour la gestion d'état

Ce document explique comment utiliser Zustand pour remplacer les chargements de données locaux dans l'application.

## 🎯 Avantages de Zustand

- **État global centralisé** : Plus besoin de passer les props entre composants
- **Persistance automatique** : Les données importantes sont sauvegardées dans le localStorage
- **Gestion des états de chargement** : États de loading, erreurs, et succès gérés automatiquement
- **Notifications globales** : Système de messages unifié
- **Performance optimisée** : Re-renders automatiques uniquement quand nécessaire

## 📁 Structure des fichiers

```
resources/js/
├── stores/
│   └── useAppStore.ts          # Store principal Zustand
├── hooks/
│   ├── useAppointments.ts      # Hook pour les rendez-vous
│   ├── useAuth.ts             # Hook pour l'authentification
│   └── useTimeSlots.ts        # Hook pour les créneaux
├── components/
│   └── Notification.tsx       # Composant de notification
└── pages/
    └── ExampleWithZustand.tsx # Exemple d'utilisation
```

## 🔧 Installation

Zustand est déjà installé dans le projet. Si ce n'était pas le cas :

```bash
npm install zustand
```

## 📖 Utilisation

### 1. Store Principal (`useAppStore.ts`)

Le store principal contient tout l'état global de l'application :

```typescript
import { useAppStore } from '../stores/useAppStore';

const MyComponent = () => {
  const { 
    appointments, 
    isLoadingAppointments, 
    fetchAllAppointments 
  } = useAppStore();
  
  // Utiliser les données et actions...
};
```

### 2. Hooks Personnalisés

#### Hook pour les rendez-vous (`useAppointments`)

```typescript
import { useAppointments } from '../hooks/useAppointments';

const AppointmentsPage = () => {
  const {
    appointments,
    isLoadingAppointments,
    fetchAllAppointments,
    filteredAppointments,
    statistics,
    searchAppointments,
    resetFilters
  } = useAppointments();

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div>
      {isLoadingAppointments ? (
        <LoadingSpinner />
      ) : (
        <AppointmentsList appointments={filteredAppointments} />
      )}
    </div>
  );
};
```

#### Hook pour l'authentification (`useAuth`)

```typescript
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { login, isLoadingAuth, user } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Redirection automatique après connexion
    } catch (error) {
      // Gestion d'erreur automatique
    }
  };
};
```

#### Hook pour les créneaux (`useTimeSlots`)

```typescript
import { useTimeSlots } from '../hooks/useTimeSlots';

const TimeSlotsPage = () => {
  const {
    availableSlots,
    isLoadingSlots,
    fetchAvailableSlots,
    getConsecutiveSlots
  } = useTimeSlots();

  const handleDateChange = async (date: string) => {
    await fetchAvailableSlots(date);
  };
};
```

### 3. Notifications Globales

Le système de notifications est automatiquement géré :

```typescript
import { useAppStore } from '../stores/useAppStore';

const MyComponent = () => {
  const { setMessage } = useAppStore();

  const handleSuccess = () => {
    setMessage('Opération réussie !', 'success');
  };

  const handleError = () => {
    setMessage('Une erreur est survenue', 'error');
  };
};
```

Et dans votre layout principal :

```typescript
import Notification from '../components/Notification';

const Layout = () => {
  return (
    <div>
      <Notification />
      {/* Reste du contenu */}
    </div>
  );
};
```

## 🔄 Migration depuis l'ancien système

### Avant (avec useState)

```typescript
const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentsRepository.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
};
```

### Après (avec Zustand)

```typescript
const AppointmentsPage = () => {
  const { 
    appointments, 
    isLoadingAppointments, 
    fetchAllAppointments 
  } = useAppointments();

  useEffect(() => {
    fetchAllAppointments();
  }, []);
};
```

## 🎨 États disponibles dans le store

### Authentification
- `user`: Utilisateur connecté
- `isAuthenticated`: Statut de connexion
- `isLoadingAuth`: Chargement de l'authentification

### Rendez-vous
- `appointments`: Liste des rendez-vous
- `selectedAppointment`: Rendez-vous sélectionné
- `isLoadingAppointments`: Chargement des rendez-vous
- `appointmentsError`: Erreur de chargement

### Créneaux
- `availableSlots`: Créneaux disponibles
- `isLoadingSlots`: Chargement des créneaux
- `slotsError`: Erreur de chargement

### Filtres et recherche
- `searchQuery`: Requête de recherche
- `filterStatut`: Filtre par statut
- `filterVisaType`: Filtre par type de visa
- `filterDateFrom/To`: Filtres de date
- `searchPhone/Prefixe`: Recherche par téléphone

### Messages
- `message`: Message actuel
- `messageType`: Type de message (success/error/info/warning)
- `showMessage`: Affichage du message

## 🚀 Actions disponibles

### Authentification
- `login(email, password)`: Connexion
- `logout()`: Déconnexion
- `checkAuth()`: Vérification de l'authentification

### Rendez-vous
- `fetchAllAppointments()`: Charger tous les rendez-vous
- `fetchAppointmentsByPhone(prefixe, phone)`: Recherche par téléphone
- `fetchAppointmentById(id)`: Charger un rendez-vous
- `createAppointment(data)`: Créer un rendez-vous
- `updateAppointment(id, data)`: Modifier un rendez-vous
- `deleteAppointment(id)`: Supprimer un rendez-vous

### Créneaux
- `fetchAvailableSlots(date)`: Charger les créneaux pour une date

### Utilitaires
- `setMessage(message, type)`: Afficher un message
- `clearMessage()`: Effacer le message
- `resetFilters()`: Réinitialiser les filtres
- `resetSearch()`: Réinitialiser la recherche

## 💾 Persistance des données

Le store utilise le middleware `persist` de Zustand pour sauvegarder automatiquement certaines données dans le localStorage :

- Informations utilisateur
- Filtres de recherche
- État de recherche par téléphone

Les données sensibles (comme les rendez-vous) ne sont pas persistées pour des raisons de sécurité.

## 🔍 Debugging

En mode développement, le store est connecté aux Redux DevTools pour faciliter le debugging :

1. Installer l'extension Redux DevTools
2. Ouvrir les outils de développement
3. Aller dans l'onglet "Redux"
4. Voir l'état du store en temps réel

## 📝 Exemple complet

Voir le fichier `ExampleWithZustand.tsx` pour un exemple complet d'utilisation de tous les hooks et du store.

## 🎯 Bonnes pratiques

1. **Utiliser les hooks personnalisés** plutôt que d'accéder directement au store
2. **Gérer les états de chargement** pour une meilleure UX
3. **Utiliser les notifications** pour informer l'utilisateur
4. **Nettoyer les données** lors de la déconnexion
5. **Optimiser les re-renders** en sélectionnant uniquement les données nécessaires

## 🐛 Résolution de problèmes

### Problème : Les données ne se mettent pas à jour
**Solution** : Vérifier que vous utilisez bien les actions du store et non des fonctions locales

### Problème : Erreurs de TypeScript
**Solution** : Vérifier que tous les types sont correctement importés depuis `../types`

### Problème : Persistance ne fonctionne pas
**Solution** : Vérifier que le localStorage est disponible et que les données ne dépassent pas la limite de taille

