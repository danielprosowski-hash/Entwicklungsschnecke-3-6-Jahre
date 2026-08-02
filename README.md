# Entwicklungsschnecke

Ein Beobachtungsbogen für Kinder von 1–6 Jahren als kleine Web-App, mit zwei umschaltbaren Katalogen:

- **0–3 Jahre** (Reiter „0–3 Jahre“): Kernkatalog für 1;0 – 2;11 Jahre, 123 Beobachtungspunkte, gestaffelt nach vier Altersbändern. Punkte aus noch nicht erreichten Bändern werden grau angezeigt und zählen nicht in der Statistik mit. Dazu zwei Zusatzmodule: eine einmalige Eingewöhnungs-Dokumentation und eine Einschätzung von Wohlbefinden und Engagiertheit pro Beobachtung.
- **3 Jahre – Schuleintritt** (Reiter „3 Jahre – Schuleintritt“): der ursprüngliche Katalog mit 169 Beobachtungspunkten, unverändert.

Beide Kataloge nutzen dieselben sechs Bildungsbereiche (Spielen, Sprechen/Hören/Sehen, Denken, Bewegung, Lebenspraxis, Soziales Miteinander) und dasselbe Dateiformat, sodass die Akte eines Kindes beim Übergang von der Krippe in den Kindergarten weiterläuft. Ein Kind wird angelegt, die Beobachtungspunkte werden bewertet (leer / halb / voll), dazu Notizen und eine Schnecken-Übersicht. Alles läuft im Browser, es werden keine Daten ins Netz übertragen.

Der Moduswechsel schlägt sich aus dem Geburtsdatum vor, lässt sich aber jederzeit von Hand umstellen. Enthält der Bogen bereits Bewertungen, fragt die App vor dem Wechsel nach, damit nichts versehentlich verloren geht.

## Online stellen mit GitHub Pages

1. Auf github.com anmelden und oben rechts über **+ → New repository** ein neues Repository anlegen, zum Beispiel `entwicklungsschnecke`. Sichtbarkeit **Public**. **Create repository**.
2. Auf der nächsten Seite **uploading an existing file** anklicken.
3. Alle Dateien aus diesem Ordner hochladen: `index.html`, `manifest.webmanifest`, `icon-512.png`, `icon-192.png`, `apple-touch-icon.png`, `favicon.png`. Dann **Commit changes**.
4. Im Repository auf **Settings → Pages** gehen. Unter *Build and deployment* bei *Source* **Deploy from a branch** wählen, Branch **main** und Ordner **/ (root)**, dann **Save**.
5. Nach ein bis zwei Minuten erscheint oben die Adresse, unter der die App erreichbar ist – etwa `https://DEINNAME.github.io/entwicklungsschnecke/`.

## Aufs iPad/iPhone oder ins Dock legen

Die Adresse im Safari öffnen, dann **Teilen → Zum Home-Bildschirm** (bzw. am Mac **Teilen → Zum Dock hinzufügen**). Das farbige Schnecken-Icon wird automatisch verwendet.

## Datenschutz

Kinderdaten werden ausschließlich als Datei auf dem eigenen Gerät gespeichert. Die veröffentlichte Seite enthält nur die App selbst, keine Kinderdaten.
