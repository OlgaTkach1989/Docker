# Basis-Image mit Python
FROM python:3.12-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Datei(en) kopieren
COPY app.py .

# Port bekannt machen
EXPOSE 8000

# Startbefehl
CMD ["python", "-u", "app.py"]
