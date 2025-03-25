Introduzione progetto Casa Finder Front-end  

CasaFinder è un'applicazione progettata per facilitare la gestione e la consultazione di annunci immobiliari, rendendo la ricerca e l'interazione con il mercato immobiliare semplice ed efficiente. Il front-end dell'applicazione offre un'interfaccia intuitiva che consente agli utenti di esplorare annunci, registrarsi, accedere al proprio profilo, aggiungere preferiti e pubblicare annunci. Sviluppato utilizzando tecnologie moderne, CasaFinder garantisce un'esperienza utente fluida sia per i clienti registrati che non registrati.

1. Linguaggi di programmazione utilizzati: 
Il front-end del progetto è stato realizzato con i seguenti linguaggi:
- HTML5: Per la struttura dei contenuti e la base dell'interfaccia utente.
- CSS3: Per lo stile e la personalizzazione grafica.
- JAVASCRIPT: Per la logica applicativa e l'interattività dinamica.
- REACT.JS: Framework utilizzato per lo sviluppo dei componenti e la gestione dello stato.

2. Ambiente di sviluppo: 
Il front-end è stato sviluppato nell'ambiente Visual Studio Code (VSCode), scelto per la sua flessibilità, le estensioni dedicate come il supporto a ESLint, e le funzionalità di autocompletamento e debugging. L'uso di VSCode ha ottimizzato il flusso di sviluppo.

3. Dipendenze e Configurazioni Utilizzate:
Durante lo sviluppo, sono state utilizzate librerie e strumenti per migliorare le funzionalità e semplificare il lavoro:

Dipendenze principali: 
- Axios: Per effettuare richieste HTTP al backend.
- React-Bootstrap e - Bootstrap-icons: Per lo stile e i componenti predefiniti.
- React-Route-dom: Per il routing e la navigazione.
Dipendenze di sviluppo: 
- @viejs/plugin-react: Per l'ottimizzazione del progetto.
- Estelint con i plugin di React: Per garantire un codice coerente e senza errori.
Configurazioni: 
- vite.config.js: Proxy definito per instradare correttamente le richieste al backend.
- Estelint.config.js: per la definizione delle regole di linting.

4. Struttura del Progetto:
Il front-end è organizzato in modo chiaro per garantire scalabilità e manutenzione:

Cartelle principali: 
- SRC: Contiene i componenti React, i file di stile (CSS), e la logica principale dell'applicazione.
- PUBLIC: Contiene risorse statiche come immagini

File principali: 
- APP.JSX: Punto di accesso al router e alla struttura generale.
- INDEX.CSS: File per lo stile globale dell'applicazione.
- VITE.CONFIG.JS: Configurazione del progetto.

5. Componenti chiave - Routing e Navigazione:
I componenti principali dell'applicazione includono:
- NavBar: Gestisce la navigazione e include le opzioni per accedi/registrati o accedi all'area personale.
- SearchResultsPage: Mostra i risultati della ricerca e permette di aggiungere annunci ai preferiti.
- DettaglioAnnuncio: Mostra le informazioni dettagliate di un annuncio.
- AreaPersonale: Consente all'utente registrato di gestire annunci pubblicati e preferiti.
- RegisterForm: Permette la registrazione di nuovi utenti.
- PropertyForm: Permette di creare un nuovo annuncio che sarà legato all’utente che lo crea.
ROUTING:
-  E stato configurato nel file APP.JSX tramite REACT-ROUTER-DOM
- ROTTE PRINCIPALI:
- / : HomePage.
- /REGISTER: Pagina di registrazione.
- /PROFILE: Pagina di Area personale.
- /SEARCH-RESULTS: Pagina dei risultati di ricerca.
- /ANNUNCIO/:ID : Pagina Dettaglio di un annuncio specifico.

6. Tipo di Sicurezza Applicata
Il progetto prevede due esperienze principali in base allo stato dell'utente (registrato o non registrato):
- CLIENTE NON REGISTRATO:
L'utente non registrato può:
- Visualizzare la homepage con un'anteprima degli annunci.
- Effettuare ricerche immobiliari tramite la barra di ricerca.
- Visualizzare la lista dei risultati di ricerca e consultare i dettagli degli annunci.
- Non può accedere a funzionalità avanzate come aggiungere annunci ai preferiti o pubblicarne di nuovi.
- CLIENTO REGISTRATO (CON LOGIN):
L'utente registrato e che ha effettuato il login può avere accesso a funzionalità avanzate:
- Pubblicare nuovi annunci compilando un modulo dettagliato.
- Aggiungere annunci ai preferiti cliccando sull'icona del cuore nelle card.
- Consultare e gestire i propri annunci pubblicati dall'area personale.
- Visualizzare la cronologia delle email inviate tramite la piattaforma.
- Modificare o eliminare i propri annunci pubblicati.
Questa struttura offre un'esperienza chiara e intuitiva sia per gli utenti non registrati sia per quelli registrati, migliorando la navigabilità e l'interazione.


7. Test dell’avvio:
Per testare il progetto, è necessario avviare i seguenti elementi:
7. DATABASE: Il database deve essere attivo e configurato correttamente per garantire il funzionamento del backend.	
7. BACK-END: Deve essere avviato per gestire le richieste provenienti dal front-end.
7. FRONT-END: Dal terminale, navigare nella directory del progetto e avviare il server di sviluppo: NPM-RUN-DEV. L'applicazione sarà accessibile all'indirizzo HTTPS//LOCALHOST:5173
