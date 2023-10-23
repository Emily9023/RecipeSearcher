from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/receive-recipe-data', methods=['POST'])
def receive_data():
    try:
        # Get the data from the POST request
        data = request.json

        # Handle the data as needed
        # For example, you can print it or process it in some way
        print("Received data:", data)

        # Send a response back to the Chrome extension
        response = {'message': 'Data received successfully to flask server'}
        return jsonify(response), 200

    except Exception as e:
        error_message = str(e)
        response = {'error': error_message}
        return jsonify(response), 500

if __name__ == '__main__':
    app.run(debug=True)
