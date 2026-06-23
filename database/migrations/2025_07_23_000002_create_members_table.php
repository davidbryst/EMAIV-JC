<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained('appointments')->onDelete('cascade');
            $table->string('nom');
            $table->string('prenom');
            $table->string('nationalite');
            $table->string('motif')->nullable();
            $table->string('dates')->nullable();
            $table->string('passeport')->nullable();
            $table->string('email');
            $table->string('prefixe');
            $table->string('telephone');
            $table->string('avatar')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('members');
    }
};
