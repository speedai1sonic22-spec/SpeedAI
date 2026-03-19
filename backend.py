import http.server
import json
import os

PORT = 8000
FILE_NAME = 'applications.json'

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/apply':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            application = json.loads(post_data.decode('utf-8'))

            # Load existing applications
            apps = []
            if os.path.exists(FILE_NAME):
                try:
                    with open(FILE_NAME, 'r') as f:
                        apps = json.load(f)
                except:
                    apps = []

            # Append new application
            apps.append(application)

            # Save back to file
            with open(FILE_NAME, 'w') as f:
                json.dump(apps, f, indent=4)

            # Respond to browser
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())

print(f"SpeedAI Backend running on http://localhost:{PORT}")
http.server.HTTPServer(('', PORT), RequestHandler).serve_forever()
