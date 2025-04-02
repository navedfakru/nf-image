from flask import Flask, request, jsonify, send_file
from rembg import remove
from PIL import Image
import io
import traceback
from flask_cors import CORS
import os
from dotenv import load_dotenv

# .env लोड करो
load_dotenv()

app = Flask(__name__)

ENVIRONMENT = os.getenv("ENVIRONMENT", "production") 
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://nf-image.netlify.app")

# ENVIRONMENT = os.getenv("ENVIRONMENT", "development") 
# FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
# print(ENVIRONMENT)


if ENVIRONMENT == "production":
    CORS(app, resources={r"/*": {"origins": FRONTEND_URL}})
else:
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/', methods=['GET'])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/api/remove_background', methods=['POST'])
def remove_background():
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

        
        return send_file(img_io, mimetype="image/png")

    except Exception as e:
        error_message = traceback.format_exc()
        return jsonify({'error': f"An error occurred: {str(e)}\n{error_message}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=(ENVIRONMENT != "production"))
