#!/usr/bin/env python3
"""
Simple HTTP server with proper MIME types for ES6 modules
"""

import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Set proper MIME type for JavaScript modules
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        
        super().end_headers()

    def guess_type(self, path):
        mimetype, _ = super().guess_type(path)
        
        # Ensure JavaScript files are served with correct MIME type
        if path.endswith('.js'):
            return 'application/javascript'
        
        return mimetype

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIRECTORY)

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 BoozeLens server running at http://localhost:{PORT}")
    print(f"📁 Serving files from: {DIRECTORY}")
    print("Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")