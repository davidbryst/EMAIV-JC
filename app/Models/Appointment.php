<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'visa_type',
        'target_country',
        'date',
        'selected_slots',
        'format',
        'payment_method',
        'telephone',
        'statut',
        'notes',
    ];

    protected $casts = [
        'selected_slots' => 'array',
        'date' => 'date',
    ];

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
