(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
    <head>
       
    
        <style>
           div { font:17px 'Calibri'; }
    table, th, td {
                border: solid 1px #ddd;
                border-collapse: collapse;
                padding: 2px 3px;
                text-align: center;
            }
            th {
                font-weight:bold;
            }
            
        </style>
    </head>
    <body>
        
        <div id='showTable'></div>
    </body>
    ;
    <script>
             
    </script>
    `;
    class TableJSON extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            this._props = {};
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            var myprops = this._props       
            var val = myprops.value;  
            this.$script.innerHTML=' var oXHR = new XMLHttpRequest();oXHR.onreadystatechange = reportStatus;oXHR.open("GET",'+val+' , true);file.oXHR.send(); function reportStatus() { if (oXHR.readyState == 4) {createTableFromJSON(this.responseText);}}function createTableFromJSON(jsonData) { var arrBirds = [];arrBirds = JSON.parse(jsonData);var col = []; for (var i = 0; i < arrBirds.length; i++) {for (var key in arrBirds[i]) {if (col.indexOf(key) === -1) {col.push(key);}}}var table = document.createElement("table");var tr = table.insertRow(-1);for (var i = 0; i < col.length; i++) { var th = document.createElement("th");th.innerHTML = col[i];tr.appendChild(th);}for (var i = 0; i < arrBirds.length; i++) { tr = table.insertRow(-1);for (var j = 0; j < col.length; j++) {var tabCell = tr.insertCell(-1);tabCell.innerHTML = arrBirds[i][col[j]];}}var divContainer = document.getElementById("showTable");divContainer.innerHTML = "";divContainer.appendChild(table);};';
        }
    }
    customElements.define("com-sap-sample-tablejson", TableJSON);
})();
