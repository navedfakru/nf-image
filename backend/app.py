import os
from flask import Flask, request, jsonify, send_file
from rembg import remove
from PIL import Image
import io
import traceback
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["https://nf-image.netlify.app", "http://localhost:5173"]}})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/naved', methods=['GET'])
def naved():
    return jsonify({"message": "naved running!"})

@app.route('/remove_background', methods=['POST', 'OPTIONS'])
def remove_background():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin')
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        image_file = request.files['image']
        input_image = Image.open(image_file).convert("RGBA")

        max_size = 1024
        if max(input_image.size) > max_size:
            input_image.thumbnail((max_size, max_size))

        output_image = remove(input_image)

        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        response = send_file(img_io, mimetype="image/png")
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin')
        return response
    except Exception as e:
        error_message = traceback.format_exc()
        return jsonify({'error': f"An error occurred: {str(e)}\n{error_message}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)