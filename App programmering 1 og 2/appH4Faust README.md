Appen bliver lavet i React Native

appen skal forbindes til en nodeJs backend som skal laves

appen kommer til at fungerer lidt ligesom phpmyadmin

færdig
start siden er en knap called "Connect" og 3 input bokse host, user, password
hvis det lykkes at oprette fobindelse skifter den til en ny side

færdig
den nye side er en oversigt over all databaserne i en liste klikker du ind på en af databaserne skal du kunne se alle tabels, procederes og views der lavt i databasen i en liste
klikker man vidre fks. på en tabel for man vist alt dataen

færdig
i bunden på alle sider skal der være en navigations bar med 4 kanpper 
en til oversigt siden med listerne af databaserne
en til oprettelse af nye databaser 
en til ændringer af bruger 
en til at logge ud

færdig
oprettelse af nye databaser siden
input boks til databasens title
knap til at tilføje tabels 
input bokse til tabel navn
knap til at tilføje column
inputboks til tabel column navn og datatype

ændringer af bruger siden
liste over alle bruger
knap til at oprette nye bruger 
modal med 2 input bokse en til brugernavn og kodeord 
og en liste over alle databaser der er med checkbokse så man kan vælge hvilke man kan se når man logger ind

okay så der er 3 steder hvor du skal ændre ip adresserne til din computers egen ip adresse
første er overView.js linje 27
næste er createConnection.js linje 16
næste navBar.js linje 33

derefter skal du starte starte backend serveren 
ved at gå til mappen Backend og skrive commandoen (node server) i terminalen