<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Routes API pour les rendez-vous
Route::prefix('api')->middleware('api')->group(function () {

    // ----- Routes publiques -----
    // Recherche par téléphone (le visiteur ne voit que ses propres RDV)
    Route::get('/appointments', [AppointmentController::class, 'index']);
    // Création d'un rendez-vous
    Route::post('/appointments/new', [AppointmentController::class, 'store']);
    // Créneaux disponibles
    Route::get('/appointments/available-slots', [AppointmentController::class, 'getAvailableSlots']);
    // E-mails de confirmation (déclenchés après réservation) + formulaire de contact
    Route::post('/appointments/send-emails', [AppointmentController::class, 'sendEmails'])->name('send-emails');
    Route::post('/appointments/send-emails-Contact', [AppointmentController::class, 'sendEmailsContact'])->name('send-emails-Contact');

    // Authentification
    Route::post('/login', [AuthenticatedSessionController::class, 'login']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);

    // ----- Routes réservées à l'administration (session authentifiée) -----
    // NB : /appointments/all est déclarée avant /appointments/{id} pour la priorité de matching.
    Route::middleware('auth:web')->group(function () {
        Route::get('/appointments/all', [AppointmentController::class, 'all']);
        Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
        Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
    });

    // Détail d'un rendez-vous : accès admin OU vérifié par numéro de téléphone (anti-énumération)
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
});


// Route catch-all pour l'application React
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
