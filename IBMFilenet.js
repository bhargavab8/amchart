(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
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
<body>
    <div id="showTable"></div>
</body>;
    
    <script>


    // Create XMLHttpRequest object.
    var val = "https://raw.githubusercontent.com/bhargavab8/amchart/master/Data.json";
    var oXHR = new XMLHttpRequest();

    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET",val , true);  // get json file.
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.

            // Create an HTML table using response from server.
            createTableFromJSON(this.responseText);
        }
    }

    // Create an HTML table using the JSON data.
    function createTableFromJSON(jsonData) {
        var arrBirds = [];
        arrBirds = JSON.parse(jsonData); 	// Convert JSON to array.

        var col = [];
        for (var i = 0; i < arrBirds.length; i++) {
            for (var key in arrBirds[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // Create a dynamic table.
        var table = document.createElement("table");

        // Create table header.

        var tr = table.insertRow(-1);                   // Table row.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // Table header.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // Add JSON to the table rows.
        for (var i = 0; i < arrBirds.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = arrBirds[i][col[j]];
            }
        }

        // Finally, add the dynamic table to a container.
        var divContainer = document.getElementById("showTable");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        
    };
         
</script> `;
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

        }
    }
    customElements.define("com-sap-sample-tablejson", TableJSON);
})();
