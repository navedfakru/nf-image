import os
from flask import Flask, request, jsonify, send_file
from rembg import remove
from PIL import Image
import io
import traceback
from flask_cors import CORS
from dotenv import load_dotenv

# .env लोड करो
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://nf-image.netlify.app", "http://localhost:5173"])

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route('/remove_background', methods=['POST'])
def remove_background():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        image_file = request.files['image']
        input_image = Image.open(image_file).convert("RGBA")

        # Image Resize Limit
        max_size = 1024
        if max(input_image.size) > max_size:
            input_image.thumbnail((max_size, max_size))

        # Background Remove
        output_image = remove(input_image)

        # Convert Image to Bytes
        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        return send_file(img_io, mimetype="image/png")

    except Exception as e:
        error_message = traceback.format_exc()
        return jsonify({'error': f"An error occurred: {str(e)}\n{error_message}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render के लिए Port सेट करो
    app.run(host="0.0.0.0", port=port)  # सभी requests accept करने के लिए host="0.0.0.0"
