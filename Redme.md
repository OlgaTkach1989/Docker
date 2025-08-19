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