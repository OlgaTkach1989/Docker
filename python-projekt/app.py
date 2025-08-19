from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"<h1>Hallo aus dem Python-Container!</h1>")

print("Python Server startet auf Port 8000...")
httpd = HTTPServer(("0.0.0.0", 8000), SimpleServer)
httpd.serve_forever()
