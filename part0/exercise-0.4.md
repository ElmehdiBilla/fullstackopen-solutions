# Exercise 0.4 - New Note Diagram

```mermaid
sequenceDiagram
    
    participant browser
    participant server

    %% 1) user submit the form
    note right of browser : user submit the form
    browser->>server : POST  https://studies.cs.helsinki.fi/exampleapp/new_note

    %% 2) server save the note and responds with request to the browser to redirect to notes page
    activate server
    note right of server : server save the note
    server-->>browser: HTTP status code 302
    deactivate server
    note right of browser : the browser redirect to notes page

    %% 3) browser make GET request to notes pages
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/notes

    %% 4) server responds with HTML document
    activate server
    server-->>browser: HTML document
    deactivate server

    %% 5) browser fetch the css file
    note right of browser : fetch css file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    %% 6) server send css file
    activate server
    server-->>browser: main.css file
    deactivate server

    %% 7) browser fetch the javascript file
    note right of browser : fetch javascript file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    %% 8) server send javascript file
    activate server
    server-->>browser: main.js file
    deactivate server

    %% 9) browser execute the javascript file
    note right of browser : execute javascript file

    %% 10) browser fetch json data file
    note right of browser : fetch data.json file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    %% 11) server send data.json file
    activate server
    server-->>browser: data.json file
    deactivate server

    %% 12) browser execute the callback function 
    note right of browser : browser execute the callback function 
    note right of browser : page display notes

```