# Family Calendar

Movie with the project https://www.youtube.com/watch?v=aCoW86llfDU

## Spis treści

- [Cel](#Cel)
- [Ogólne informacje](#Ogólne-informacje)
- [Używane technologie](#Używane-technologie)
- [Jak tego użyć](#jak-tego-użyć)
- [Status projektu](#status-projektu)
- [Kontakt](#kontakt)
<!-- * [License](#license) -->

## Cel

- Projekt powstał by nauczyć się preprocesora sass oraz poćwiczyć vue 3.

## Ogólne informacje

Jest to aplikacja będąca kalendarzem online. Genezą pomysłu było to iż posiadam bardzo liczną rodzinę, gdzie już same spamiętanie dat urodzin i imienin jest wyzwaniem. Do tego jakieś spontaniczne rodzinne wyjazdy czy inne akcje. Kalendarz ułatwia przepływ informacji o tym co i kiedy się wydarzy. Różnice po między nim a zwykłym papierowym wiszącym na lodówce to:

- każdy komu podamy kod wie co się dzieje,
- można do niego zajrzeć w każdej chwili.

## Używane technologie

- vue: ^3.2.13
- vue-router: ^4.0.3
- pinia: ^2.0.17,
- typescript: ~4.5.5
- sass: ^1.32.7
- php: 8.0.9

## Jak tego użyć

Aby sklonować i uruchomić tę aplikację, potrzebujesz [Git](https://git-scm.com) i [Node.js](https://nodejs.org/en/download/) (który jest dostarczany z [ npm](http://npmjs.com)) zainstalowany na Twoim komputerze. Z wiersza poleceń:

(frontend)

```bash
# Klonowanie repozytorium
$ git clone https://github.com/Maty2002v2/Family-Calendar.git

#Wejdź do folderu repozytorium
$ cd Family-Calendar

#Wejdź do folderu aplikacji
$ cd family-calendar-frontend

# Zainstaluj zależności
$ npm install

# Uruchom aplikację
$ npm run serve
```

(backend)

- Folder family-calendar-api skopiować do folderu htdocs znajdującego się w folderze xampp
- Zaimportować bazę danych z folderu database family_calendar.sql
- Dostosować ustawienia do połaczenia z bazą danych family-calendar-api/config/settings.php

## Status projektu

Project is: _in progress_

## Kontakt

Stworzone przez [@Maty](mailto:mateusz_malolepszy_02@wp.pl) - nie wahaj się ze mną skontaktować!

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
