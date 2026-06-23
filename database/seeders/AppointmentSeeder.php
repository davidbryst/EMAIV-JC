<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Member;

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        // 24 juillet : 3 créneaux pour 3 membres (1 membre par créneau)
        $slots_24 = ['09:00', '09:30', '10:00'];
        $appt = Appointment::create([
            'visa_type' => 'Touriste',
            'target_country' => 'France',
            'date' => '2025-08-11',
            'selected_slots' => $slots_24,
            'format' => 'En présentiel',
            'payment_method' => 'Carte Visa',
            'telephone' => '+225 070000000' . (0 + 1),
            'statut' => 'confirmé',
        ]);
        foreach ($slots_24 as $slotIndex => $slot) {
            // Liste de noms, prénoms, nationalités et préfixes de passeport africains
            $noms = ['Traoré', 'Diop', 'Kouassi'];
            $prenoms = ['Aminata', 'Moussa', 'Fatou'];
            $nationalites = ['Côte d\'Ivoire', 'Sénégal', 'Mali'];
            $passeport_prefixes = ['CI', 'SN', 'ML'];

            $appt->members()->create([
                'nom' => $noms[$slotIndex % count($noms)],
                'prenom' => $prenoms[$slotIndex % count($prenoms)],
                'nationalite' => $nationalites[$slotIndex % count($nationalites)],
                'motif' => 'Visa de court séjour',
                'dates' => '2025-08-05 17:14',
                'passeport' => $passeport_prefixes[$slotIndex % count($passeport_prefixes)] . "24" . str_replace(':', '', $slot) . ($slotIndex + 1),
                'email' => "membre" . ($slotIndex + 1) . "_24_{$slot}@email.com",
                'prefixe' => '+225',
                'telephone' => '070000000' . ($slotIndex + 1),
                'avatar' => 'https://ui-avatars.com/api/?name=' . $prenoms[$slotIndex % count($prenoms)] . '+' . $noms[$slotIndex % count($noms)] . '&background=ef4444&color=fff',
            ]);
        }

        // 25 juillet : 2 créneaux pour 2 membres (1 membre par créneau)
        $slots_25 = ['10:00', '10:30'];
        $appt = Appointment::create([
            'visa_type' => 'Touriste',
            'target_country' => 'Espagne',
            'date' => '2025-08-12',
            'selected_slots' => $slots_25,
            'format' => 'En ligne',
            'payment_method' => 'Orange Money',
            'telephone' => '+221 770000000' . (0 + 1),
            'statut' => 'en attente',
        ]);
        foreach ($slots_25 as $slotIndex => $slot) {
            // Liste de noms, prénoms, nationalités et préfixes de passeport africains
            $noms = ['Fall', 'Ndiaye', 'Ba'];
            $prenoms = ['Ousmane', 'Aïssatou', 'Ibrahima'];
            $nationalites = ['Sénégal', 'Burkina Faso', 'Guinée'];
            $passeport_prefixes = ['SN', 'BF', 'GN'];

            $appt->members()->create([
                'nom' => $noms[$slotIndex % count($noms)],
                'prenom' => $prenoms[$slotIndex % count($prenoms)],
                'nationalite' => $nationalites[$slotIndex % count($nationalites)],
                'motif' => 'Visa touristique',
                'dates' => '2025-08-05 17:14',
                'passeport' => $passeport_prefixes[$slotIndex % count($passeport_prefixes)] . "25" . str_replace(':', '', $slot) . ($slotIndex + 1),
                'email' => strtolower($prenoms[$slotIndex % count($prenoms)]) . "." . strtolower($noms[$slotIndex % count($noms)]) . "@email.com",
                'prefixe' => '+221',
                'telephone' => '770000000' . ($slotIndex + 1),
                'avatar' => 'https://ui-avatars.com/api/?name=' . $prenoms[$slotIndex % count($prenoms)] . '+' . $noms[$slotIndex % count($noms)] . '&background=ef4444&color=fff',
            ]);
        }

        // 26 juillet : 5 créneaux pour 5 membres (1 membre par créneau)
        $slots_26 = ['11:30', '12:00', '12:30', '13:00', '13:30'];
        $appt = Appointment::create([
            'visa_type' => "Affaires",
            'target_country' => "USA",
            'date' => '2025-08-13',
            'selected_slots' => $slots_26,
            'format' => 'En présentiel',
            'payment_method' => 'Wave',
            'statut' => 'confirmé',
            'telephone' => '+223 700000000' . (0 + 1),
        ]);
        foreach ($slots_26 as $slotIndex => $slot) {
            // Liste de noms, prénoms, nationalités et préfixes de passeport africains
            $noms = ['Sangaré', 'Keita', 'Touré', 'Sissoko', 'Coulibaly'];
            $prenoms = ['Mamadou', 'Fatoumata', 'Seydou', 'Mariam', 'Amadou'];
            $nationalites = ['Mali', 'Niger', 'Togo', 'Bénin', 'Ghana'];
            $passeport_prefixes = ['ML', 'NE', 'TG', 'BJ', 'GH'];

            $appt->members()->create([
                'nom' => $noms[$slotIndex % count($noms)],
                'prenom' => $prenoms[$slotIndex % count($prenoms)],
                'nationalite' => $nationalites[$slotIndex % count($nationalites)],
                'motif' => "Visa d'affaires",
                'dates' => '2025-08-05 17:14',
                'passeport' => $passeport_prefixes[$slotIndex % count($passeport_prefixes)] . "26" . str_replace(':', '', $slot) . ($slotIndex + 1),
                'email' => strtolower($prenoms[$slotIndex % count($prenoms)]) . "." . strtolower($noms[$slotIndex % count($noms)]) . "@business.com",
                'prefixe' => '+223',
                'telephone' => '700000000' . ($slotIndex + 1),
                'avatar' => 'https://ui-avatars.com/api/?name=' . $prenoms[$slotIndex % count($prenoms)] . '+' . $noms[$slotIndex % count($noms)] . '&background=22d3ee&color=fff',
            ]);
        }
    }
}
