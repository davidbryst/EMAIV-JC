<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $prefixe = trim((string) $request->input('prefixe'));
        $searchPhone = trim((string) $request->input('searchPhone'));

        $query = Appointment::with('members')->orderBy('date', 'desc');

        // L'administrateur authentifié (session) a un accès complet.
        // if (auth('web')->check()) {
        //     return response()->json($query->get());
        // }

        // Accès public : un filtre téléphone valide est OBLIGATOIRE (anti-énumération).
        // Le numéro doit être EXACTEMENT 10 chiffres : `ctype_digit` interdit aussi les
        // métacaractères LIKE (% et _) qui permettraient de matcher toute la base.
        if ($prefixe === '' || ! ctype_digit($searchPhone) || strlen($searchPhone) !== 10) {
            return response()->json([
                'message' => "Recherchez vos rendez-vous via votre numéro de téléphone.",
            ], 422);
        }

        // Correspondance EXACTE : le numéro fait exactement 10 chiffres et le préfixe
        // provient d'une liste fermée. Un LIKE "%...%" produisait des faux positifs
        // (un numéro pouvant être sous-chaîne d'un autre, et "%prefixe%" matchant la
        // majorité des dossiers). On compare donc à l'identique.
        $fullPhone = $prefixe . ' ' . $searchPhone;

        $query->where(function ($q) use ($fullPhone, $prefixe, $searchPhone) {
            $q->where('telephone', $fullPhone)
              ->orWhereHas('members', function ($q2) use ($prefixe, $searchPhone) {
                  $q2->where('prefixe', $prefixe)
                     ->where('telephone', $searchPhone);
              });
        });

        return response()->json($query->get());
    }

    /**
     * Send emails to participants and company about an appointment
     */
    public function sendEmails(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'participantEmails' => 'required|array|min:1',
            'participantEmails.*' => 'required|email',
            // 'companyEmail' => 'required|email',
            'appointment' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $participantEmails = $request->input('participantEmails');
        $companyEmail = 'gneze.pierreange@gmail.com';
        $appointment = $request->input('appointment');

        // Préparer les données pour le template d'email
        $emailData = [
            'visaType' => $appointment['visa_type'] ?? 'Demande de visa',
            'appointmentDate' => $appointment['date'] ?? 'Non spécifiée',
            'selectedSlots' => $appointment['selected_slots'] ?? [],
            'format' => $appointment['format'] ?? 'Non spécifié',
            'paymentMethod' => $appointment['payment_method'] ?? 'Non spécifié',
            'status' => $appointment['statut'] ?? 'Confirmé',
            'membersCount' => isset($appointment['members']) ? count($appointment['members']) : 0,
            'members' => $appointment['members'] ?? []
        ];

        // Configurer Carbon pour l'affichage en français
        \Carbon\Carbon::setLocale('fr');

        $subject = 'Confirmation de rendez-vous - ' . $emailData['visaType'];

        try {
            // Envoyer l'email avec le template amélioré
            Mail::send('emails.appointment', $emailData, function ($message) use ($participantEmails, $companyEmail, $subject) {
                $message->to($companyEmail);
                // Ajouter les participants en BCC pour éviter de révéler les adresses
                foreach ($participantEmails as $email) {
                    $message->bcc($email);
                }
                $message->subject($subject);
            });

            return response()->json(['success' => true, 'message' => 'E-mails envoyés avec succès']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur lors de l\'envoi des e-mails: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Send emails to participants and company about an appointment
     */
    public function sendEmailsContact(Request $request): JsonResponse
    {
        // Debug: afficher les données reçues
        \Log::info('Données reçues pour sendEmailsContact:', $request->all());

        $validator = Validator::make($request->all(), [
            'participantEmails' => 'required|array|min:1',
            'participantEmails.*' => 'required|email',
            'element' => 'required|array',
            'element.firstName' => 'required|string|max:255',
            'element.lastName' => 'required|string|max:255',
            'element.email' => 'required|email|max:255',
            'element.subject' => 'nullable|string|max:255',
            'element.message' => 'required|string|max:1000'
        ], [
            'participantEmails.required' => 'Au moins un email participant est requis.',
            'participantEmails.*.email' => 'Format d\'email invalide.',
            'element.required' => 'Les données du formulaire sont requises.',
            'element.firstName.required' => 'Le nom est requis.',
            'element.lastName.required' => 'Le prénom est requis.',
            'element.email.required' => 'L\'email est requis.',
            'element.email.email' => 'Format d\'email invalide.',
            'element.message.required' => 'Le message est requis.'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $participantEmails = $request->input('participantEmails');
        $companyEmail = 'gneze.pierreange@gmail.com';
        $element = $request->input('element');

        // Préparer les données pour le template d'email
        $emailData = [
            'firstName' => $element['firstName'] ?? '',
            'lastName' => $element['lastName'] ?? '',
            'email' => $element['email'] ?? '',
            'subject' => $element['subject'] ?? 'Contact',
            'contactMessage' => $element['message'] ?? ''
        ];

        // Configurer Carbon pour l'affichage en français
        \Carbon\Carbon::setLocale('fr');

        $subject = 'Contacts';

        try {
            // Envoyer l'email avec le template amélioré
            Mail::send('emails.contacts', $emailData, function ($message) use ($participantEmails, $companyEmail, $subject) {
                $message->to($companyEmail);
                // Ajouter les participants en BCC pour éviter de révéler les adresses
                foreach ($participantEmails as $email) {
                    $message->bcc($email);
                }
                $message->subject($subject);
            });

            return response()->json(['success' => true, 'message' => 'E-mails envoyés avec succès']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Erreur lors de l\'envoi des e-mails: ' . $e->getMessage()], 500);
        }
    }

    public function all()
    {
        $appointments = Appointment::with('members')->orderBy('date', 'desc')->get();
        // dd($appointments);
        return response()->json($appointments);
    }

    /**
     * Store a newly created appointment in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validation des données
            $validator = Validator::make($request->all(), [
                'visa_type' => 'required|string|max:255',
                'target_country' => 'required|string|max:255',
                'members' => 'required|array|min:1',
                'members.*.nom' => 'required|string|max:255',
                'members.*.prenom' => 'required|string|max:255',
                'members.*.nationalite' => 'required|string|max:255',
                'members.*.motif' => 'required|string|max:255',
                'members.*.email' => 'required|email|max:255',
                'members.*.prefixe' => 'required|string|max:10',
                'members.*.telephone' => 'required|string|max:20',
                'members.*.dates' => 'nullable|date',
                'members.*.passeport' => 'nullable|string|max:50',
                'date' => 'required|date|after:today',
                'selected_slots' => 'required|array|min:1',
                'selected_slots.*' => 'required|string|size:5',
                'format' => 'required|in:En ligne,En présentiel',
                'payment_method' => 'required|in:Orange Money,MTN Mobile Money,Moov Money,Wave,Carte Visa,Espèces (sur place)',
            ], [
                'visa_type.required' => 'Le type de visa est requis.',
                'target_country.required' => 'Le pays cible est requis.',
                'members.required' => 'Au moins un membre est requis.',
                'members.*.nom.required' => 'Le nom est requis pour tous les membres.',
                'members.*.prenom.required' => 'Le prénom est requis pour tous les membres.',
                'members.*.nationalite.required' => 'La nationalité est requise pour tous les membres.',
                'members.*.motif.required' => 'Le motif est requis pour tous les membres.',
                'members.*.email.required' => 'L\'email est requis pour tous les membres.',
                'members.*.email.email' => 'L\'email doit être valide.',
                'members.*.prefixe.required' => 'Le préfixe téléphone est requis pour tous les membres.',
                'members.*.telephone.required' => 'Le téléphone est requis pour tous les membres.',
                'date.required' => 'La date du rendez-vous est requise.',
                'date.after' => 'La date du rendez-vous doit être dans le futur.',
                'selected_slots.required' => 'Au moins un créneau horaire est requis.',
                'format.required' => 'Le format de l\'entretien (en ligne ou présentiel) est requis.',
                'format.in' => 'Le format doit être « En ligne » ou « En présentiel ».',
                'payment_method.required' => 'Le mode de paiement est requis.',
                'payment_method.in' => 'Moyen de paiement invalide. Paiement en ligne (Orange Money, MTN Mobile Money, Moov Money, Wave, Carte Visa) ou en espèces sur place.'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Vérifier que le nombre de créneaux correspond au nombre de membres
            $members = $request->input('members');
            $selected_slots = $request->input('selected_slots');

            // Validation personnalisée des créneaux horaires
            foreach ($selected_slots as $slot) {
                if (!$this->isValidTimeFormat($slot)) {
                    return response()->json([
                        'success' => false,
                        'message' => "Format de créneau invalide: {$slot}. Format attendu: HH:MM"
                    ], 422);
                }
            }

            if (count($selected_slots) !== count($members)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le nombre de créneaux doit correspondre au nombre de membres.'
                ], 422);
            }

            // Vérifier la disponibilité des créneaux
            foreach ($selected_slots as $slot) {
                if (!$this->isSlotAvailable($request->input('date'), $slot)) {
                    return response()->json([
                        'success' => false,
                        'message' => "Le créneau {$slot} n'est plus disponible."
                    ], 422);
                }
            }

            // Transaction pour créer le rendez-vous et ses membres
            $appointment = DB::transaction(function () use ($request, $members, $selected_slots) {

                // Créer le rendez-vous principal
                $appointmentData = [
                    'visa_type' => $request->input('visa_type'),
                    'target_country' => $request->input('target_country'),
                    'date' => $request->input('date'),
                    'selected_slots' => $selected_slots,
                    'format' => $request->input('format'),
                    'payment_method' => $request->input('payment_method'),
                    'statut' => 'confirmé',
                    'notes' => null,
                    'telephone' => $members[0]['prefixe'] . ' ' . $members[0]['telephone'], // Téléphone principal
                    'created_at' => now(),
                    'updated_at' => now()
                ];

                $appointment = Appointment::create($appointmentData);

                // Créer les membres associés
                foreach ($members as $member) {
                    $appointment->members()->create([
                        'nom' => $member['nom'],
                        'prenom' => $member['prenom'],
                        'nationalite' => $member['nationalite'],
                        'motif' => $member['motif'],
                        'dates' => $member['dates'] ?? null,
                        'passeport' => $member['passeport'] ?? null,
                        'email' => $member['email'],
                        'prefixe' => $member['prefixe'],
                        'telephone' => $member['telephone'],
                        'avatar' => $member['avatar'] ?? null,
                    ]);
                }

                return $appointment->load('members');
            });

            return response()->json([
                'success' => true,
                'message' => 'Rendez-vous créé avec succès',
                'data' => [
                    'id' => $appointment->id,
                    'visa_type' => $appointment->visa_type,
                    'target_country' => $appointment->target_country,
                    'date' => $appointment->date,
                    'selected_slots' => $appointment->selected_slots,
                    'format' => $appointment->format,
                    'payment_method' => $appointment->payment_method,
                    'statut' => $appointment->statut,
                    'members_count' => $appointment->members->count(),
                    'members' => $appointment->members,
                    'created_at' => $appointment->created_at->toISOString()
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du rendez-vous: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Vérifier la disponibilité d'un créneau
     */
    private function isSlotAvailable(string $date, string $slot): bool
    {
        // Compter les rendez-vous existants pour ce créneau
        $existingAppointments = Appointment::where('date', $date)
            ->whereJsonContains('selected_slots', $slot)
            ->count();

        // Limite de 5 rendez-vous par créneau
        return $existingAppointments < 5;
    }

    /**
     * Get available slots for a specific date
     */
    public function getAvailableSlots(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after:today'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $date = $request->input('date');
        $slots = [];

        // Générer les créneaux de 9h à 12h30 (matin) par tranches de 30 minutes
        for ($hour = 9; $hour <= 12; $hour++) {
            for ($minute = 0; $minute < 60; $minute += 30) {
                // Arrêter à 12h30
                if ($hour == 12 && $minute >= 30) {
                    break;
                }

                $timeStr = sprintf('%02d:%02d', $hour, $minute);

                $occupationCount = Appointment::where('date', $date)
                    ->whereJsonContains('selected_slots', $timeStr)
                    ->count();

                $slots[] = [
                    'heure' => $timeStr,
                    'disponible' => $occupationCount < 5,
                    'sequence_ok' => true,
                    'occupation' => $occupationCount
                ];
            }
        }

        // Générer les créneaux de 14h30 à 16h30 (après-midi) par tranches de 30 minutes
        for ($hour = 14; $hour <= 16; $hour++) {
            for ($minute = 0; $minute < 60; $minute += 30) {
                // Commencer à 14h30
                if ($hour == 14 && $minute < 30) {
                    continue;
                }
                // Arrêter à 16h30
                if ($hour == 16 && $minute >= 30) {
                    break;
                }

                $timeStr = sprintf('%02d:%02d', $hour, $minute);

                $occupationCount = Appointment::where('date', $date)
                    ->whereJsonContains('selected_slots', $timeStr)
                    ->count();

                $slots[] = [
                    'heure' => $timeStr,
                    'disponible' => $occupationCount < 5,
                    'sequence_ok' => true,
                    'occupation' => $occupationCount
                ];
            }
        }

        return response()->json([
            'success' => true,
            'data' => $slots
        ]);
    }

    public function show(Request $request, $id)
    {
        $appointment = Appointment::with('members')->findOrFail($id);

        // L'administrateur authentifié (session) a un accès complet.
        if (auth('web')->check()) {
            return response()->json($appointment);
        }

        // Accès public : on exige le numéro de téléphone du dossier (anti-énumération).
        $prefixe = trim((string) $request->input('prefixe'));
        $searchPhone = trim((string) $request->input('searchPhone'));

        if ($prefixe !== '' && $searchPhone !== '') {
            $matchesMain = $appointment->telephone === $prefixe . ' ' . $searchPhone;

            $matchesMember = $appointment->members->contains(function ($m) use ($prefixe, $searchPhone) {
                return (string) $m->prefixe === $prefixe
                    && (string) $m->telephone === $searchPhone;
            });

            if ($matchesMain || $matchesMember) {
                return response()->json($appointment);
            }
        }

        return response()->json([
            'message' => "Accès non autorisé. Recherchez votre rendez-vous via votre numéro de téléphone.",
        ], 403);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $validated = $request->validate([
            'statut' => 'required|string',
            'visa_type' => 'required|string',
            'notes' => 'nullable|string|max:1000'
        ]);
        $appointment->update($validated);
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $appointment = Appointment::with('members')->findOrFail($id);
        try {
            $appointment->members()->delete();
            $appointment->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false], 500);
        }
    }

    /**
     * Valider le format d'un créneau horaire
     */
    private function isValidTimeFormat(string $time): bool
    {
        // Vérifier le format HH:MM
        if (!preg_match('/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/', $time)) {
            return false;
        }

        // Vérifier que l'heure est dans les créneaux autorisés
        $hour = (int) substr($time, 0, 2);
        $minute = (int) substr($time, 3, 2);

        // Créneaux du matin: 9h à 12h30
        if ($hour >= 9 && $hour <= 12) {
            if ($hour == 12 && $minute > 30) {
                return false; // Après 12h30
            }
            return true;
        }

        // Créneaux de l'après-midi: 14h30 à 16h30
        if ($hour >= 14 && $hour <= 16) {
            if ($hour == 14 && $minute < 30) {
                return false; // Avant 14h30
            }
            if ($hour == 16 && $minute > 30) {
                return false; // Après 16h30
            }
            return true;
        }

        return false;
    }
}
