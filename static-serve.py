#!/usr/bin/env python3
"""
Simple HTTP server for running the Umbrella 7 website locally.
"""

import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Press Ctrl+C to stop the server")
        
        # Open browser after a short delay
        Timer(0.5, open_browser).start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")