# Sentiment Analysis for Crypto Tweets

Welcome to our sentiment analysis application for cryptocurrency tweets! This application predicts the sentiment of tweets related to cryptocurrencies. The sentiment analysis model has been trained on the Kaggle Cryptocurrency Dataset, providing insights into the emotional tone of tweets in the dynamic world of cryptocurrencies.

## Getting Started

### Backend

To run the application, start the Flask backend server. Make sure you have Python 3.0 or later installed.

1. Navigate to the `/backend` directory.
2. Run the following command in the command line to install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run the main Flask application:

    ```bash
    python main.py
    ```

4. The server will be started on port 5000 on localhost (127.0.0.1). It may take approximately 30 seconds for the server to go live.

5. For predictions, perform a GET request to the `/predict` route (`http://127.0.0.1:5000/predict`), with a `message` parameter in the header containing the actual tweet.

### Frontend

To run the UI, navigate to the `frontend/frontend-sentiment-analysis/` directory.

1. Run the following command in the command line to install the required npm packages:

    ```bash
    npm install
    ```

2. Start the React server:

    ```bash
    npm start
    ```

3. The React server will be started on port 3000.

Now you're ready to use the sentiment analysis application! The backend handles predictions for cryptocurrency tweet sentiments, while the frontend provides a user-friendly interface for interacting with the model.

Feel free to explore the application and gain insights into the sentiment behind cryptocurrency tweets!
