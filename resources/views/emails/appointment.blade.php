<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirmation de rendez-vous - {{ $visaType ?? 'Demande de visa' }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            /* padding: 20px; */
            background-color: #f8f9fa;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            /* background: linear-gradient(135deg, #FF6B35 0%, #FFD23F 100%); */
            border-image: linear-gradient(90deg, #FF6B35 0%, #FFD23F 100%) 1;
            border-top: 10px solid;
            color: #FF6B35;
            /* padding: 30px; */
            font-weight: bold;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        .header .subtitle {
            margin-top: 10px;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding-left	: 20px;
            padding-right: 20px;
        }
        .appointment-details {
            background-color: #f8f9fa;
            border-left: 4px solid #FF6B35;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #1A5F7A;
            min-width: 120px;
        }
        .detail-value {
            color: #212529;
            text-align: right;
        }
        .members-section {
            margin-top: 25px;
        }
        .member-card {
            background-color: #FFF3E0;
            border: 1px solid #FFB74D;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .member-header {
            font-weight: 600;
            color: #E65100;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .member-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 14px;
        }
        .member-detail {
            display: flex;
            justify-content: space-between;
        }
        .member-label {
            font-weight: 500;
            color: #666;
        }
        .member-value {
            color: #333;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
            color: #6c757d;
        }
        .important-note {
            background-color: #FFF8E1;
            border: 1px solid #FFD23F;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .important-note h4 {
            color: #E65100;
            margin: 0 0 10px 0;
        }
        .important-note ul {
            margin: 0;
            padding-left: 20px;
            color: #BF360C;
        }
        .status-badge {
            display: inline-block;
            background-color: #1A5F7A;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .slot-time {
            background-color: #FF6B35;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin: 2px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://emaiv-jc.ci/logo/logoXL.png" alt="Logo EMAIV" style="width: 100px; height: auto; margin-bottom: 10px; margin-top: 10px;">
            <h1 style="font-weight: bold;">🎫 Confirmation de Rendez-vous</h1>
            <div class="subtitle">{{ $visaType ?? 'Demande de visa' }}</div>
        </div>

        <div class="">
            <p class="content">Bonjour,</p>

            <p class="content">Nous avons le plaisir de confirmer votre rendez-vous pour votre demande de visa. Voici les détails de votre réservation :</p>

            <div class="appointment-details">
                <div class="detail-row">
                    <span class="detail-label">📅 Date :</span>
                    <span class="detail-value">
                        @if(isset($appointmentDate) && $appointmentDate)
                            {{ \Carbon\Carbon::parse($appointmentDate)->format('l j F Y') }}
                        @else
                            Non spécifiée
                        @endif
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">🕐 Créneaux :</span>
                    <span class="detail-value">
                        @if(isset($selectedSlots) && is_array($selectedSlots))
                            @foreach($selectedSlots as $slot)
                                <span class="slot-time">{{ $slot }}</span>
                            @endforeach
                        @else
                            Non spécifiés
                        @endif
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📍 Format :</span>
                    <span class="detail-value">{{ $format ?? 'Non spécifié' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">💳 Paiement :</span>
                    <span class="detail-value">{{ $paymentMethod ?? 'Non spécifié' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">💰 Montant :</span>
                    <span class="detail-value">25 000 FCFA (tarif unique)</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📊 Statut :</span>
                    <span class="detail-value">
                        <span class="status-badge">{{ $status ?? 'Confirmé' }}</span>
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">👥 Participants :</span>
                    <span class="detail-value">{{ $membersCount ?? 0 }} personne(s)</span>
                </div>
            </div>

            @if(isset($members) && is_array($members) && count($members) > 0)
            <div class="members-section">
                <h3 style="color: #495057; margin-bottom: 15px;">👤 Détails des participants :</h3>
                @foreach($members as $index => $member)
                <div class="member-card">
                    <div class="member-header">
                        Participant {{ $index + 1 }} : {{ $member['prenom'] ?? '' }} {{ $member['nom'] ?? '' }}
                    </div>
                    <div class="member-details">
                        <div class="member-detail">
                            <span class="member-label">🏳️ Nationalité :</span>
                            <span class="member-value">{{ $member['nationalite'] ?? 'Non spécifiée' }}</span>
                        </div>
                        <div class="member-detail">
                            <span class="member-label">📧 Email :</span>
                            <span class="member-value">{{ $member['email'] ?? 'Non spécifié' }}</span>
                        </div>
                        <div class="member-detail">
                            <span class="member-label">📱 Téléphone :</span>
                            <span class="member-value">{{ $member['prefixe'] ?? '' }} {{ $member['telephone'] ?? 'Non spécifié' }}</span>
                        </div>
                        <div class="member-detail">
                            <span class="member-label">🎯 Motif :</span>
                            <span class="member-value">{{ $member['motif'] ?? 'Non spécifié' }}</span>
                        </div>
                        @if(isset($member['dates']) && $member['dates'])
                        <div class="member-detail">
                            <span class="member-label">📅 Dates :</span>
                            <span class="member-value">
                                @try
                                    {{ \Carbon\Carbon::parse($member['dates'])->format('l j F Y') }}
                                @catch
                                    {{ $member['dates'] }}
                                @endtry
                            </span>
                        </div>
                        @endif
                        @if(isset($member['passeport']) && $member['passeport'])
                        <div class="member-detail">
                            <span class="member-label">🛂 Passeport :</span>
                            <span class="member-value">{{ $member['passeport'] }}</span>
                        </div>
                        @endif
                    </div>
                </div>
                @endforeach
            </div>
            @endif

            <div class="important-note" style="padding: 10px;">
                <h4>⚠️ Informations importantes :</h4>
                <ul>
                    @if(($paymentMethod ?? '') === 'Espèces (sur place)')
                    <li>Le paiement de 25 000 FCFA se règle en espèces à l'agence, avant le début de l'entretien.</li>
                    @else
                    <li>Le paiement de 25 000 FCFA s'effectue en ligne au préalable, de manière sécurisée.</li>
                    @endif
                    <li>Les frais d'entretien ne sont pas remboursables.</li>
                    <li>Veuillez vous présenter 15 minutes avant votre créneau horaire</li>
                    <li>N'oubliez pas d'apporter tous les documents requis</li>
                    <li>En cas d'annulation, merci de nous contacter au moins 24h à l'avance</li>
                    <li>Présentez-vous avec une pièce d'identité valide</li>
                </ul>
            </div>

            <p class="content">Pour toute question ou modification, n'hésitez pas à nous contacter.</p>
        </div>

        <div class="footer">
            <p><strong>Merci de votre confiance !</strong></p>
            <p>L'équipe EMAIV-JC</p>
            <p style="font-size: 12px; color: #adb5bd;">
                Cet email a été généré automatiquement. Merci de ne pas y répondre.
            </p>
        </div>
    </div>
</body>
</html>
