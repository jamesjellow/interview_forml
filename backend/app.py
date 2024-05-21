from flask import Flask, request, jsonify
import time
from typing import List
from flask_cors import CORS

def countCorrectDigits(guess: List[str], actual_combination: str) -> int:
    countOfCorrectDigits = 0
    for digit1, digit2 in zip(guess, actual_combination):
        if digit1 == digit2:
            countOfCorrectDigits += 1

    return countOfCorrectDigits

def crack_safe(actual_combination: str):
    start = time.time()
    
    starting_guess = ['0'] * len(actual_combination)
    attempts = 0
    
    for i in range(len(actual_combination)):
        number_correct_so_far = -1
        best = '0'
        
        for digit in range(10):
            starting_guess[i] = str(digit)

            attempts += 1
            
            correct_digits = countCorrectDigits(starting_guess, actual_combination)
            
            if correct_digits > number_correct_so_far:
                number_correct_so_far = correct_digits
                best = digit
        
        starting_guess[i] = best
    
    end_time = time.time()
    
    return attempts, end_time - start


app = Flask(__name__, )
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/api/crack_safe', methods=['POST'])
def crack_code():

    try:

        data = request.get_json()
        actual_combination = data['actual_combination']

        attempts, time = crack_safe(str(actual_combination))

        response = {
            "attempts": attempts,
            "time_taken": time
        }

        return jsonify(response)
    
    except:
        return jsonify({"message": "error"}), 400
    

if __name__ == '__main__':
    app.run(debug=True, port=3001)