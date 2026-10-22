IDLE FRIENDS 2 — NETLIFY DEPLOY PACKAGE

Enthalten:
- index.html: Spiel mit Ranglisten und API-Synchronisierung
- netlify/functions/leaderboard.mjs: gemeinsame Ranglisten-API
- netlify.toml und package.json: Netlify-Konfiguration

DEPLOY:
1. Lade den gesamten Inhalt dieses ZIPs in ein neues GitHub-Repository hoch (nicht nur index.html).
2. Importiere das Repository in Netlify und deploye es. Build command leer lassen; Publish directory ".".
3. Netlify installiert die Abhängigkeit und baut die Function automatisch.
4. Öffne die veröffentlichte Seite und teste die Rangliste mit zwei verschiedenen Browsern/Geräten.

WICHTIG:
- Die API nutzt Netlify Blobs als gemeinsame Speicherung (Region Frankfurt / eu-central-1).
- Die aktuellen Spielkonten sind lokal im Browser. Für die Rangliste wird der Name, die Rebirth-Zahl und der beste Friend ans Backend geschickt.
- Das ist eine einfache Rangliste, keine manipulationssichere Rangliste: Ohne serverseitige Anmeldung und serverseitige Spiel-Logik können Spieler Werte fälschen oder denselben Namen verwenden.
- Spielstände werden dadurch NICHT zwischen Geräten synchronisiert; nur die Ranglisten-Einträge werden geteilt.
