<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            // Format de l'entretien : "En ligne" ou "En présentiel" (au choix du candidat).
            // Nullable pour ne pas casser les enregistrements existants.
            $table->string('format')->nullable()->after('selected_slots');
        });
    }

    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropColumn('format');
        });
    }
};
