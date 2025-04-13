from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/normalize', methods=['POST'])
def normalize():
    try:
        data = request.get_json()
        a = [float(x.strip()) for x in data['a'].split(',') if x.strip()]
        t = float(data['t'])
        tn = [float(x.strip()) for x in data['tn'].split(',') if x.strip()]

        if len(a) != 100 or len(tn) != 100:
            return jsonify({'error': 'Both "a" and "tn" must contain exactly 100 float values.'})

        temp_diff = t - 30  # Difference from target 30°C
        cv = [round(a[i] - (tn[i] * temp_diff), 4) for i in range(100)]

        return jsonify({'cv': ", ".join(str(v) for v in cv)})

    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
