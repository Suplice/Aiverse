Aiverse

## Aby wszystko działało poprwanie należy pobrać dockera z internetu a następnie w ustawieniach systemowych ustawić możliwość odpalania wirtualnych środowisk
Polecam obejrzeć film: https://www.youtube.com/watch?v=gAkwW2tuIqE


### Po zklonowaniu repo należy otowrzyć konsolę i wpisać następujące komendy:

 - cd Aiverse
 - docker-compose up --build

### po zbudowaniu obrazu za pomocą dockera możemy odpalać go wywołując komendę:
 - docker-compose up

### jeśli wprowadzimy zmiany w plikach projektowych, np dodamy paczki do package.json lub dodamy paczki do *.csproj należy wykonać ponownie komendę:
 - docker-compose up --build

## Commitowanie

Aby commitować do repozytorium należy przed stworzyć własną gałąź:
 - git checkout -b (nazwa gałęzi)

Następnie należy dodać wprowadzone zmiany
 - git add . lub git add (konkretne pliki)
 - git commit -m "message commitu"

(Uwaga, message jest bardzo ważną częścią commitu, stosujcie się proszę do tego schematu commitowania: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

Kolejnym krokiem jest push do swojej gałęzi:
 - git push origin (nazwa utworzonej gałęzi)

Na samym końcu należy udać się na stronę githuba i utworzyć pull request, który zostanie sprawdzony i kod zmergowany do głównej gałęzi main

# Nie commitujemy do gałęzi main!

# W razie jakichkolwiek pytań piszcie na discordzie lub na messengerze

LOL
