# Exercise 0.5 - Single Page App Diagram

```mermaid
sequenceDiagram
    
    participant browser
    participant server

    %% 1) browser make GET request to notes pages
    browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/spa

    %% 2) server responds with HTML document
    activate server
    server-->>browser: HTML document
    deactivate server

    %% 3) browser fetch the css file
    note right of browser : fetch css file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    %% 4) server send css file
    activate server
    server-->>browser: main.css file
    deactivate server

    %% 5) browser fetch the javascript file
    note right of browser : fetch javascript file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js

    %% 6) server send javascript file
    activate server
    server-->>browser: spa.js file
    deactivate server

    %% 7) browser execute the javascript file
    note right of browser : execute javascript file

    %% 8) browser fetch json data file
    note right of browser : fetch data.json file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    %% 9) server send data.json file
    activate server
    server-->>browser: data.json file
    deactivate server

    %% 10) browser execute the callback function 
    note right of browser : browser execute the callback function 
    note right of browser : page display notes

```