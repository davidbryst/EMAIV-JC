# Déploiement sur cPanel — Emaiv-JC

Guide pas à pas pour mettre en ligne l'application (Laravel 12 + SPA React/Vite) sur un hébergement cPanel.

> **Principe** : on **compile les assets en local** (le build Vite), puis on **téléverse** l'application. La base MySQL est déjà hébergée sur le serveur.

---

## 0. Pré-requis côté cPanel
- **PHP 8.2+** (idéalement 8.3) — réglable dans *MultiPHP Manager* / *Select PHP Version*.
- Extensions PHP : `mbstring`, `openssl`, `pdo_mysql`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`, `curl`.
- Une **base MySQL** + un utilisateur (déjà en place : `emaivjcc_global`).
- Accès **Terminal** (recommandé) ou *Gestionnaire de fichiers* + FTP.

---

## 1. Compiler en local (sur votre PC)
```bash
npm install
npm run build          # génère public/build/ (manifest + assets)
composer install --no-dev --optimize-autoloader   # prépare vendor/ (optionnel si Composer dispo sur le serveur)
```
> Le dossier **`public/build/`** doit être présent : c'est lui que Laravel sert en production (plus besoin du serveur Vite).

---

## 2. Préparer les fichiers à téléverser
Téléversez **tout le projet SAUF** :
- `node_modules/` (inutile en prod)
- `.git/`, fichiers `.env.*`, captures, etc.
- `public/hot` ⚠️ **supprimez-le s'il existe** (sinon le site cherchera le serveur Vite de dev).

À inclure impérativement : `app/`, `bootstrap/`, `config/`, `database/`, `public/` (**avec `public/build/`**), `resources/`, `routes/`, `storage/`, `vendor/` (si non installé sur le serveur), `artisan`, `composer.json`.

---

## 3. Emplacement & document root
Deux approches — **la 1ʳᵉ est la plus propre** :

### Option A (recommandée) — app hors de `public_html`
1. Placez le projet dans p.ex. `~/emaivjc/` (hors de `public_html`).
2. Dans cPanel → *Domains* (ou *Domaines*), réglez le **Document Root** du domaine sur :
   `~/emaivjc/public`
3. Terminé : le serveur sert directement le dossier `public/`.

### Option B — si le document root n'est pas modifiable
1. Placez l'app dans `~/emaivjc/` et copiez le **contenu** de `~/emaivjc/public/` dans `public_html/`.
2. Éditez `public_html/index.php` pour pointer vers l'app :
   ```php
   require __DIR__.'/../emaivjc/vendor/autoload.php';
   $app = require_once __DIR__.'/../emaivjc/bootstrap/app.php';
   ```
3. Conservez `public_html/build/`, `public_html/assets/`, `public_html/.htaccess`, etc.

---

## 4. Configurer le `.env` (production)
Repartez de `.env` et ajustez :
```dotenv
APP_NAME="Emaiv-JC"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://emaiv-jc.ci        # votre vrai domaine (https)

# Sessions : indispensable pour la connexion admin
SESSION_DRIVER=database
SESSION_DOMAIN=.emaiv-jc.ci         # le domaine réel (ou laissez vide). PAS "localhost".
SANCTUM_STATEFUL_DOMAINS=emaiv-jc.ci,www.emaiv-jc.ci

# Base de données (déjà renseignée)
DB_CONNECTION=mysql
DB_HOST=...        DB_PORT=3306
DB_DATABASE=...    DB_USERNAME=...    DB_PASSWORD=...

# Mail (pour les confirmations de RDV / formulaire de contact)
MAIL_MAILER=smtp
MAIL_HOST=...   MAIL_PORT=465   MAIL_USERNAME=...   MAIL_PASSWORD=...
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="contact@emaiv-jc.ci"
MAIL_FROM_NAME="${APP_NAME}"
```
> ⚠️ **`SESSION_DOMAIN=localhost` casse la connexion admin en prod** — mettez bien le vrai domaine (ou laissez vide).

---

## 5. Installer & initialiser (Terminal cPanel)
Depuis le dossier de l'app (`~/emaivjc`) :
```bash
# Si vendor/ n'a pas été uploadé :
composer install --no-dev --optimize-autoloader

php artisan key:generate          # seulement si APP_KEY est vide
php artisan migrate --force       # crée/maj les tables (⚠️ base de prod)
php artisan db:seed --force       # OPTIONNEL : crée le compte admin + données de démo
php artisan storage:link          # lien symbolique storage public

# Caches de production (perf)
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
> Le compte admin par défaut est défini dans `database/seeders/DatabaseSeeder.php`. **Changez ce mot de passe** avant/juste après la mise en ligne.

---

## 6. Permissions
Rendez ces dossiers inscriptibles par le serveur web :
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 7. Vérifications post-déploiement
- `https://emaiv-jc.ci` → la page d'accueil s'affiche (design « Évasion »).
- Naviguer Services / Contacts / Prendre rendez-vous (la SPA gère les routes).
- **Connexion admin** : `https://emaiv-jc.ci/adminlogin` → le tableau de bord charge les RDV.
- Tester une **prise de RDV** et la réception de l'email de confirmation.
- Sécurité : `https://emaiv-jc.ci/api/appointments/all` sans être connecté → doit renvoyer **401**.

---

## 8. Mises à jour ultérieures
À chaque évolution :
```bash
# en local
npm run build
# uploader public/build/ + les fichiers modifiés, puis sur le serveur :
php artisan config:cache && php artisan route:cache && php artisan view:cache
```
> Après modif de `.env` ou des routes : relancer `php artisan config:cache` / `route:cache` (ou `php artisan optimize:clear` pour tout vider).

---

## Dépannage rapide
| Symptôme | Cause probable | Solution |
|---|---|---|
| Page blanche / 500 | `APP_KEY` vide ou cache obsolète | `php artisan key:generate`, `php artisan optimize:clear` |
| Assets/manifest introuvable | `public/build/` manquant ou `public/hot` présent | uploader `public/build/`, **supprimer `public/hot`** |
| Connexion admin échoue | `SESSION_DOMAIN` incorrect | mettre le vrai domaine (ou vide) puis `config:cache` |
| 419 / page expirée sur un POST | cookies/domaine | vérifier `APP_URL`, `SESSION_DOMAIN`, HTTPS |
| Erreurs d'écriture | permissions | `chmod -R 775 storage bootstrap/cache` |
