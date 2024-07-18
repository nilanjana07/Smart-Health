from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import io

app = Flask(__name__)

@app.route('/api/extract-text', methods=['POST'])
def extract_text():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))
    extracted_text = pytesseract.image_to_string(image)
    
    return jsonify({'extracted_text': extracted_text})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
