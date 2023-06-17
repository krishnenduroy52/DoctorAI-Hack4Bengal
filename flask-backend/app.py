from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.densenet import preprocess_input, decode_predictions
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri
import numpy as np
import os
from flask_cors import CORS
import json

app = Flask(__name__)
app.debug = True
CORS(app)

# Load the CT scan model
ctmodel = load_model('Models/ct-scan/chest_CT_SCAN-DenseNet201.hdf5')

# Load the MRI model
mrimodel = load_model('Models/MRI/VGG16-Brain-Tumor-MRI-3.h5')


class NumpyInt64Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.int64):
            return int(obj)
        return super().default(obj)


@app.route('/predict-ct', methods=['POST'])
def predict_ct():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    img = image.load_img(img_path, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    # Make predictions on the image
    predictions = ctmodel.predict(img)

    # Interpret the predictions
    class_labels = ['Adenocarcinoma', 'Large.cell.carcinoma',
                    'Normal', 'Squamous.cell.carcinoma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]

    # Prepare the response
    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }

    # Remove the temporary image file
    os.remove(img_path)

    # Return the response in JSON format
    return jsonify(response)


@app.route('/predict-mri', methods=['POST'])
def predict_mri():
    # Check if an image file is provided in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Load and preprocess the image
    img = request.files['image']
    img_path = f"tmp/{img.filename}"  # Save the file temporarily
    img.save(img_path)

    img = image.load_img(img_path, target_size=(460, 460))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input_mri(img)

    print("Predicting MRI")
    # Make predictions on the image
    predictions = mrimodel.predict(img)

    # Interpret the predictions
    class_labels = ['pituitary', 'notumor', 'meningioma', 'glioma']
    predicted_class_index = np.argmax(predictions, axis=1)
    predicted_class_label = class_labels[predicted_class_index[0]]

    # Prepare the response
    response = {
        'predicted_class': predicted_class_label,
        'probability': float(predictions[0][predicted_class_index[0]]) * 100
    }

    # Remove the temporary image file
    os.remove(img_path)

    # Return the response in JSON format
    return jsonify(response)


@app.route('/', methods=['GET'])
def welcome():
    return "Hi"


if __name__ == '__main__':
    app.run(port=8000)
