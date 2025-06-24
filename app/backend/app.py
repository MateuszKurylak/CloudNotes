from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Umożliwia żądania z innych domen (np. nasz frontend)

# Na razie przechowujemy notatki w pamięci
notes_db = []
note_id_counter = 1

@app.route('/api/notes', methods=['GET'])
def get_notes():
    return jsonify(notes_db) # <--- Tak wyglądała oryginalna, działająca wersja

@app.route('/api/notes', methods=['POST'])
def add_note():
    global note_id_counter
    try:
        note_content = request.json.get('content')
        if not note_content:
            return jsonify({"error": "Content cannot be empty"}), 400
        
        new_note = {
            "id": note_id_counter,
            "content": note_content
        }
        notes_db.append(new_note)
        note_id_counter += 1
        return jsonify(new_note), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)