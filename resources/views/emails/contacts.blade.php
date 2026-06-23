<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            border-image: linear-gradient(90deg, #FF6B35 0%, #FFD23F 100%) 1;
            border-top: 10px solid;
            color: #FF6B35;
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
            padding-left: 20px;
            padding-right: 20px;
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
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://emaiv-jc.ci/logo/logoXL.png" alt="Logo EMAIV" style="width: 100px; height: auto; margin-bottom: 10px; margin-top: 10px;">
            <h1 style="font-weight: bold;">📩 Nouveau message de contact</h1>
            <div class="subtitle">Formulaire de contact EMAIV-JC</div>
        </div>

        <div class="">
            <p class="content">Bonjour,</p>

            <p class="content">Vous avez reçu un nouveau message via le formulaire de contact :</p>
            <ul class="content" style="list-style: none;">
                <li><strong>Nom :</strong> {{ $lastName ?? '' }}</li>
                <li><strong>Prénom :</strong> {{ $firstName ?? '' }}</li>
                <li><strong>Email :</strong> {{ $email ?? '' }}</li>
                <li><strong>Sujet :</strong> {{ $subject ?? 'Contact' }}</li>
                <li><strong>Message :</strong><br>
                    <div style="margin-top: 5px; white-space: pre-line;">{{ $contactMessage ?? '' }}</div>
                </li>
            </ul>

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
