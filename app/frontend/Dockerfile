# Krok 1: Wybierz obraz bazowy Nginx
# Użyjemy oficjalnego, lekkiego obrazu Nginx opartego na Alpine Linux.
FROM nginx:alpine

# Krok 2: (Opcjonalnie) Usuń domyślną stronę powitalną Nginx
# Aby mieć pewność, że serwujemy tylko nasze pliki.
RUN rm -rf /usr/share/nginx/html/*

# Krok 3: Skopiuj pliki frontendu do odpowiedniego katalogu Nginx
# Nginx domyślnie serwuje pliki z /usr/share/nginx/html/
# Kopiujemy zawartość bieżącego katalogu (gdzie jest Dockerfile, czyli nasze pliki HTML, JS, CSS)
# do /usr/share/nginx/html/ w kontenerze.
COPY . /usr/share/nginx/html/

# Krok 4: Wystaw port, na którym Nginx będzie nasłuchiwać
# Nginx domyślnie nasłuchuje na porcie 80.
EXPOSE 80

# Krok 5: Komenda startowa Nginx (jest już zdefiniowana w obrazie bazowym)
# Nie musimy jej tutaj jawnie definiować, ale dla jasności:
# Nginx uruchamia się z domyślną konfiguracją, która serwuje pliki ze wskazanego katalogu.
# CMD ["nginx", "-g", "daemon off;"] jest typową komendą w obrazach Nginx.