<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'nom',
        'prenom',
        'nationalite',
        'motif',
        'dates',
        'passeport',
        'email',
        'prefixe',
        'telephone',
        'avatar',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
