Aiverse

## Aby wszystko działało poprwanie należy pobrać dockera z internetu a następnie w ustawieniach systemowych ustawić możliwość odpalania wirtualnych środowisk
Polecam obejrzeć film: https://www.youtube.com/watch?v=gAkwW2tuIqE

## Kolejnym ważnym podpunktem jest poobranie node na komputer, należy zrobić to ze strony: https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12
   na dole strony mamy dostępne różne możliwości do pobrania, wybieramy nvm-setup.exe

## Po pobraniu wchodzicie do folderu w którym pobrał się nvm, jest to AppData/Roaming/nvm, w tym folderze otwieracie konsole i wpisujecie następujące polecenia:
 - nvm install 18.17.1
 - nvm use 18.17.1
   
## po wykonaniu tych komend powinna pokazać się wiadomość informująca, że wersja node została zainstalowana
## Kolejnym krokiem jest otworzenie terminala jako administrator i wprowadzenie komendy
 - Set-ExecutionPolicy Unrestricted
   
oraz wybranie opcji [A]

## Kolejnym krokiem jest odpalenie Visual Studio Code, a następnie terminalu Ctrl + ` i wpisanie danych komend:
 - cd Client
 - npm i

Powinny zainstalować nam się wszystkie paczki, a syntax podświetlić na poprawny kolor


### Ważnym jest również dodanie konkretnych rozszerzeń do Visual studio code:
 - .NET Install Tool
 - C#
 - C# Dev Kit
 - Docker
 - ES7+ React/Redux/React-Native snippets
 - ESLint
 - HTML CSS Support
 - JavaScript (ES6) code snippets
 - PowerShell
 - Prettier
 - Tailwind CSS IntelliSense
 - WSL


### Po zklonowaniu repo należy otowrzyć konsolę i wpisać następujące komendy:

 - cd Aiverse
 - docker-compose up --build

### po zbudowaniu obrazu za pomocą dockera możemy odpalać go wywołując komendę:
 - docker-compose up

### jeśli wprowadzimy zmiany w plikach projektowych, np dodamy paczki do package.json lub dodamy paczki do *.csproj należy wykonać ponownie komendę:
 - docker-compose up --build

## Commitowanie

Aby commitować do głównej gałęzi repozytorium należy przed stworzyć własną gałąź:
 - git checkout -b (nazwa gałęzi)

Następnie należy dodać wprowadzone zmiany
 - git add . lub git add (konkretne pliki)
 - git commit -m "message commitu"

(Uwaga, message jest bardzo ważną częścią commitu, stosujcie się proszę do tego schematu commitowania: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

Kolejnym krokiem jest push do swojej gałęzi:
 - git push origin (nazwa utworzonej gałęzi)

Na samym końcu należy udać się na stronę githuba i utworzyć pull request, który zostanie sprawdzony i kod zmergowany do głównej gałęzi main
po stworzeniu pull request, należy poczekać, aż zostanie on sprawdzony
jeśli pull request zostanie zatwierdzony i zmergowany do main, to należy pobrać dane z głównej gałęzi main w kodzie:

- git checkout main
- git pull

## Jeśli chcemy pracować w 2 osoby na jednej gałęzi to należy:

- git checkout -b "nazwa nowej gałęzi" (stworzenie nowej gałęzi)
- git push origin "nazwa nowej gałęzi" (dodanie wprowadzenie gałęzi na githuba)

## Następnie druga osoba wykonuje następujące komendy:
- git checkout "nazwa nowej gałęzi" (przeniesienie się na nową gałąź)
- git pull origin "nazwa gałęzi" (pobranie danych o commitach z gałęzi)

## Aby wymieniać się pracą należy za każdym możliwym razem wykonywać komendę:
- git status (sprawdzamy czy nasza gałąź jest aktualna, czy może druga osoba zrobiła jakieś commity)

## Aby wprowadzać zmiany na nowej gałęzi korzystamy z komend:
- git add .
- git commit -a -m "opis commitu"
- git push origin "nazwa nowej gałęzi"
  
## jeżeli jesteśmy do tyłu na gałęzi (druga osoba zrobiła jakieś commity) to należy wpisać komendę:
- git pull origin "nazwa nowej gałęzi"
  
# Nie commitujemy do gałęzi main!

# W razie jakichkolwiek pytań piszcie na discordzie lub na messengerze

#TEST

