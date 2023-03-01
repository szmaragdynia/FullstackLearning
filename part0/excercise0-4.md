```mermaid



sequenceDiagram
    participant b as Browser
    participant s as Server
    
    Note over b: User presses "Submit" button.
    
    activate b
    b->>s: Sending the data (note) using <br/> HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note <br/> (url specified in form's action field) 
    deactivate b
    activate s
    s-)b: HTTP status code 302: redirect to https://studies.cs.helsinki.fi/exampleapp/notes <br/> (Redirection to specific url is demanded from the server side) <br/> (This redirection is basically asking the browser to do a new HTTP GET]
    deactivate s

    activate b
        b->>s: GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate b
    activate s
        s-)b: HTML document
    deactivate s
    
    activate b
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    deactivate b
    activate s
    s-)b: the css file
    deactivate s
    
    activate b
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    deactivate b
    activate s
    s-)b: the JavaScript file
    deactivate s
    
    Note right of b: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    activate b
    b->>s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    deactivate b
    activate s
    s-)b: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate s

    Note right of b: The browser executes the callback function that renders the notes
    
```