export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(req) {
    const response = new Response(
        `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <title>Carte des membres beta.gouv</title>
      <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png">
      <link rel="manifest" href="/static/favicon/site.webmanifest">
      <link rel="stylesheet" href="/static/css/main.css">
    </head>
      <script src="https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.js"></script>
      <link href="https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css" rel="stylesheet" />
      <style>
        body {
          margin: 0;
          padding: 0;
        }
    
        #mapcontainer {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
        }
        #helptext {
          position: absolute;
          top: 20px;
          width: 100%;
          text-align: center;
        }
        #helptext span {
          padding: 10px;
          background-color: aquamarine;
        }
        .popup {
          max-height: 300px;
          overflow: auto;
        }
        .maplibregl-popup-content {
          width: 300px;
        }
        #buttons {
          width: 100%;
          margin: auto auto;
          position: absolute;
          bottom: 10px;
          text-align: center;
          /* right: 0px; */ */
        }
        .button {
          background: #fff;
          border-radius: 3px;
          width: 120px;
          border: 1px solid rgba(0, 0, 0, 0.4);
          font-family: 'Open Sans', sans-serif;
          display: inline-block;
          position: relative;
          cursor: pointer;
          width: 20%;
          padding: 8px;
          border-radius: 3px;
          margin-top: 10px;
          font-size: 12px;
          text-align: center;
          font-family: sans-serif;
          font-weight: bold;
        }
        .button:hover {
        background-color: #f8f8f8;
        color: #404040;
        }
        
        .button.active {
        background-color: #3887be;
        color: #ffffff;
        }
        
        button.active:hover {
        background: #3074a4;
        }
      </style>
    </head>
    
    <body>
        <div id="mapcontainer"></div>
        <div id="helptext"><span>Chargement des données en cours ....</span></div>
        <ul id="buttons">
          <li id="button-clusters" class="button active">Afficher les communes en clusters</li>
          </ul>
        <div id="dashboard" class="dashboard" style="position: absolute; width: 25%; top:0px; left:0px; display: none;">
          <aside class="side-menu" role="navigation" id="navigation">
              <button id="drawer-toggle" class="button-outline small primary">Menu <span id="drawer-toggle-arrow">▼</span></button>
              <h4 id="logo">Espace Membre</h4>
              <div style="position: absolute; top:0px; right: 0px;"><a href="#hide"><< cacher </a></div>
              <ul class="hidden-mobile margin-bottom-5" id="drawer">
                  <li>
                      <a href="/account" id="account" 
                          class="nav-item <% if(activeTab === 'account') { %> active <% } %>">
                          Mon compte
                      </a>
                  </li>
                  <li>
                      <a href="/community" id="community"
                          class="nav-item <% if(activeTab === 'community') { %> active <% } %>">
                          Communauté
                      </a>
                  </li>
                  <!-- <li>
                      <a href="/startups" id="startups"
                          class="nav-item <% if(activeTab === 'startups') { %> active <% } %>">
                          Startups
                      </a>
                  </li>
                  <li>
                      <a href="/admin" id="admin" 
                          class="nav-item <% if(activeTab === 'admin') { %> active <% } %>">
                          Administration
                      </a>
                  </li> -->
                  <!-- <li>
                      <a href="/newsletters" id="newsletter" 
                          class="nav-item <% if(activeTab === 'newsletter') { %> active <% } %>">
                          Infolettres internes
                      </a>
                  </li> -->
                  <!-- <li>
                      <a href="/resources" id="resources"
                          class="nav-item <% if(activeTab === 'resources') { %> active <% } %>">
                          Ressources
                      </a>
                  </li> -->
                  <!-- <li>
                      <a href="/map" id="map"
                          class="nav-item <% if(activeTab === 'map') { %> active <% } %>">
                          Carte des membres
                      </a>
                  </li> -->
                  <li class="nav-end">
                      <hr />
                      <% if (currentUserId) { %>
                      <div>
                          Identifié·e en tant que<br />
                          <span class="font-weight-bold"><%= currentUserId %></span>
                      </div>
                      <% } %>
                      <hr />
                      <a href="/logout">Se déconnecter</a>
                      <hr />
                      <img src="/static/images/betagouv.png" width="150" alt="">
                      <a href="https://github.com/betagouv/secretariat/" target="_blank"
                          class="text-size-caption text-color-darker-grey">Code source de l'espace membre</a>
                  </li>
              </ul>
          </aside>
        </div>
        <script src="/static/scripts/buildmap.js"></script>
    </body>
    
    </html>
    
    `,
        {
            headers: {
                "content-type": "text/html",
            },
        }
    );
    return response;
}
