from flask import Flask, request, jsonify
from rembg import remove
from PIL import Image
import io
import base64
import traceback
from flask_cors import CORS
import os
from dotenv import load_dotenv

# .env लोड करो
load_dotenv()

app = Flask(__name__)

# FRONTEND_URL सेट करो (Local या Production)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
CORS(app, origins=[FRONTEND_URL])

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/remove_background', methods=['POST'])
def remove_background():
    try:
        image_data = request.files['image'].read()
        input_image = Image.open(io.BytesIO(image_data))

        # इमेज का आकार बदलें (optional)
        max_size = 1024
        if max(input_image.size) > max_size:
            input_image.thumbnail((max_size, max_size))

        output_image = remove(input_image)
        buffered = io.BytesIO()
        output_image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return jsonify({'image': img_str})

    except Exception as e:
        error_message = traceback.format_exc()
        return jsonify({'error': f"An error occurred: {str(e)}\n{error_message}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
