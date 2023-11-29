import subprocess
subprocess.run(["pip", "install", "-r", "requirements.txt"])


from transformers import DistilBertTokenizer
from transformers import TFDistilBertForSequenceClassification
from transformers import TextClassificationPipeline
from transformers import AdamW, get_linear_schedule_with_warmup
from tqdm import tqdm

import torch
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler

import tensorflow as tf
import pandas as pd
import json
import gc

from sklearn.model_selection import train_test_split

import re
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
stopw = stopwords.words('english')
nltk.download('wordnet')

from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify

tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = TFDistilBertForSequenceClassification.from_pretrained('TFDistillBERTFineTuned')

def predict(statement):
    text = []
    text.append(statement)
    new_encodings = tokenizer(text, truncation=True, padding=True)
    new_dataset = tf.data.Dataset.from_tensor_slices(dict(new_encodings)).batch(16)
    predictions = model.predict(new_dataset)
    predicted_classes = tf.argmax(predictions.logits, axis=1)
    for predicted_class in predicted_classes:
        returnable = tf.strings.as_string(predicted_class).numpy().decode('utf-8')
        print("Result -> ", returnable)
        return returnable
        
app = Flask(__name__)
cors = CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

@app.route("/")
def hello():
  return "Server Started on Port 5000"

@app.route('/predict', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def generateOutput():
    statement = request.headers.get('statement')
    output = predict(statement)
    response = jsonify({'output': output})
    print(response)
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)