<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- CSRF DÉSACTIVÉ : Token CSRF commenté -->
    <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
    <meta name="app-base" content="{{ rtrim(url('/'), '/') }}">
    <title>Emaiv-JC — Visa, immigration & voyage</title>

    {{-- Typographie : Fraunces (titres éditoriaux) + Hanken Grotesk (corps) --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">

        @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body class="font-sans bg-paper text-ink antialiased">
    <div id="app" class="min-h-dvh flex flex-col"></div>
</body>
</html>
