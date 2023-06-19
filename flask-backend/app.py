from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.densenet import preprocess_input, decode_predictions
from tensorflow.keras.applications.vgg16 import preprocess_input as preprocess_input_mri
import numpy as np
import os
from flask_cors import CORS
import json

# import glob
# import tensorflow
# from tensorflow.keras.preprocessing.image import array_to_img, img_to_array, load_img
# from tensorflow.keras.layers import Conv2D, Flatten, MaxPooling2D, Dense, Dropout, BatchNormalization
# from tensorflow.keras.models import Sequential
# from mlxtend.plotting import plot_confusion_matrix
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
# from tensorflow.keras.callbacks import ReduceLROnPlateau
# from tensorflow.keras.applications.vgg16 import VGG16
# from sklearn.model_selection import train_test_split

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



@app.route('/pneumonia', methods = ['POST'])
def pneumonia_prediction():
    new_image_path = "Image Path"
    test_image = image.load_img(new_image_path, target_size = (460, 460))
    test_image = image.img_to_array(test_image)
    #test_image = np.reshape(test_image, (224, 224, 3))
    test_image = np.expand_dims(test_image, axis = 0)
    test_image = test_image / 255.0
    model_loaded = tensorflow.keras.models.load_model("model_path")
    prediction = model_loaded.predict(test_image)
    test_image_for_plotting = image.load_img(new_image_path, target_size = (460, 460))
    plt.imshow(test_image_for_plotting)
    if(prediction[0] > 0.5):
        statistic = prediction[0] * 100 
        print("This image is %.3f percent %s"% (statistic, "P N E U M O N I A"))
    else:
        statistic = (1.0 - prediction[0]) * 100
        print("This image is %.3f percent %s" % (statistic, "N O R M A L"))
     
 

@app.route('/', methods=['GET'])
def welcome():
    return "Hi"


if __name__ == '__main__':
    app.run(port=8000)
