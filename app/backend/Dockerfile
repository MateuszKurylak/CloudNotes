# Krok 1: Wybierz obraz bazowy
# Użyjemy oficjalnego obrazu Python w wersji 3.9 (lub innej stabilnej, np. 3.10, 3.11) w wersji "slim", 
# która jest mniejsza i zawiera tylko niezbędne komponenty.
FROM python:3.9-slim

# Krok 2: Ustaw katalog roboczy wewnątrz kontenera
# Wszystkie kolejne komendy będą wykonywane względem tego katalogu.
WORKDIR /app

# Krok 3: Skopiuj plik z zależnościami
# Kopiujemy najpierw requirements.txt i instalujemy zależności, 
# aby wykorzystać mechanizm cache'owania warstw Dockera.
# Jeśli requirements.txt się nie zmieni, ta warstwa nie będzie przebudowywana.
COPY requirements.txt .

# Krok 4: Zainstaluj zależności
# RUN wykonuje komendy wewnątrz kontenera podczas budowania obrazu.
# --no-cache-dir zmniejsza rozmiar obrazu, nie przechowując cache pip.
# --trusted-host pypi.python.org - może być potrzebne w niektórych sieciach/proxy
RUN pip install --no-cache-dir -r requirements.txt --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --trusted-host pypi.org

# Krok 5: Skopiuj resztę kodu aplikacji backendu
# Kopiujemy wszystkie pliki z bieżącego katalogu (gdzie jest Dockerfile) do /app w kontenerze.
COPY . .

# Krok 6: Ustaw zmienną środowiskową (opcjonalnie, ale dobra praktyka)
# Informuje Flask, aby nasłuchiwał na wszystkich interfejsach sieciowych,
# a nie tylko na localhost, co jest potrzebne w Dockerze.
ENV FLASK_RUN_HOST=0.0.0.0
# Możemy też ustawić port, ale zrobimy to później przy uruchamianiu kontenera
# ENV FLASK_RUN_PORT=5000 
# ENV FLASK_APP=app.py # Już mamy if __name__ == '__main__': więc nie jest to krytyczne tutaj

# Krok 7: Wystaw port, na którym aplikacja będzie nasłuchiwać
# To jest bardziej informacyjne dla użytkownika obrazu. Rzeczywiste mapowanie portów
# dzieje się podczas uruchamiania kontenera (`docker run -p ...`).
EXPOSE 5000

# Krok 8: Komenda do uruchomienia aplikacji, gdy kontener startuje
# Uruchomi aplikację Flask.
CMD ["python", "app.py"]