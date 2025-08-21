Works on my machine Problem
Wenn ich nur den Code verschicke, muss mein Kollege Node.js, npm, die richtige Version von Vite usw. selbst installieren.
Mit Docker gebe ich ihm ein fertiges, portables Image, das überall gleich funktioniert – egal ob Windows, Mac oder Linux.

Blaupause für die Infrastruktur
Das Dockerfile beschreibt Schritt für Schritt wie man meine Anwendung baut und startet.
Das ist wie eine Bauanleitung (Infrastructure as Code): Jeder kann mit diesem Rezept dieselbe Umgebung reproduzieren.

Trennung von Code und Abhängigkeiten
Bei Node.js (node_modules) oder Python (venv) entstehen oft viele Dateien, die vom Host abhängen (OS, Architektur).
Wenn man sie einfach ins Image kopiert, können sie inkompatibel sein.
Deshalb installiert man Dependencies im Container selbst (RUN npm ci / pip install), damit sie garantiert zur Laufzeitumgebung passen


Ports: EXPOSE vs. -p

EXPOSE 80 im Dockerfile = Dokumentation: "Dieser Container hört intern auf Port 80."

-p 8081:80 beim docker run = Mapping von Host-Port zu Container-Port.
→ Beispiel: Browser greift auf localhost:8081 zu, Docker leitet das in den Container-Port 80 um.

------------------------------
## FAQ – Veröffentlichung auf Docker Hub

### Namensräume
**Warum `<username>/<repository>` wichtig ist**
- Stellt **Eindeutigkeit und Besitz** sicher: `olga378/meine-webseite` gehört eindeutig dem Nutzer `olga378`.
- Ermöglicht **Rechte & Quotas** pro Namespace (Rate-Limits, Teams, Automations).
- Ohne Namespace (z. B. alle nennen ihr Image nur `meine-webseite`) gäbe es **Namenskollisionen**: unklar, welches Image gezogen wird, „last write wins“, Supply-Chain-Risiken.

> Merke: Der Namespace ist wie eine Domain für Images.

---

### Tag vs. Build
**Unterschied**
- `docker build -t neuer-name .`  
  Baut ein Image **aus dem Dockerfile** (neue Layer, neuer **IMAGE ID/Digest**). Optional wird dabei gleich ein Tag vergeben.
- `docker tag alter-name neuer-name`  
  Erstellt **keine** neuen Layer und **kein** neues Image. Es wird nur **ein zusätzlicher Tag/Name** auf **das gleiche Image** (gleiche IMAGE ID) gesetzt.

**Beleg**
```bash
docker images --no-trunc | grep meine-webseite
docker tag meine-webseite:1.0 olga378/meine-webseite:1.0
# -> Beide Zeilen zeigen die gleiche IMAGE ID: es ist dasselbe Image mit zwei Tags.


Versionierung

Bugfix behoben – welchen Tag?

Für einen reinen Bugfix ohne API-Änderungen: Patch-Bump → …:1.0.1.

Für neue, abwärtskompatible Features: Minor → …:1.1.0.

Für Breaking Changes: Major → …:2.0.0.

Warum saubere Versionierung wichtig ist

Reproduzierbare Deployments (Rollback auf exakt 1.0.0 statt „latest“).

Nachvollziehbarkeit (welcher Code läuft wo?).

Sicherheit/Compliance (CVE-Fixes pro Version).

CI/CD-Best-Practice: Bei Release mehrere Tags auf denselben Digest pushen, z. B.:

1.0.1, 1.0, 1, latest
(optional: build-ID/Commit: 1.0.1-<shortsha>)

Öffentlich vs. Privat

Wann privat?

Proprietärer Code, geschäftliche Logik oder Lizenzpflichten (nicht frei verteilbar).

Images mit internen Abhängigkeiten, privaten Registries/Packages.

Vorab-Releases/Feature-Branches, die nicht für die Öffentlichkeit sind.

Security-Themen (z. B. temporär bekannte Schwachstellen oder geheime Basiskonfigurationen, die noch gehärtet werden).

Kundenspezifische Builds, Prüfungs-/Kursmaterialien, die nicht geteilt werden sollen.

Grundregel: Alles, was IP/Compliance/Datenschutz berührt oder nicht für alle bestimmt ist, gehört in ein Private Repository.