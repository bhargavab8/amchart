(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
		<div id="amchart1"></div>
    `;
    class amchart1 extends HTMLElement {
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
	

	connectedCallback(){
		
	}
		render() {
           
				let script = document.createElement("script");
				script.innerHTML=`
				<style>
				#chartdiv {
				  width: 100%;
				  height: 500px;
				}
				
				</style>
				
				<!-- Resources -->
				<script src="https://www.amcharts.com/lib/4/core.js"></script>
				<script src="https://www.amcharts.com/lib/4/charts.js"></script>
				<script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
				
				<!-- Chart code -->
				<script>
				am4core.ready(function() {
				
				// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end
				
				var chart = am4core.create("chartdiv", am4charts.PieChart);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
				
				chart.data = [
				  {
					country: "Lithuania",
					value: 401
				  },
				  {
					country: "Czech Republic",
					value: 300
				  },
				  {
					country: "Ireland",
					value: 200
				  },
				  {
					country: "Germany",
					value: 165
				  },
				  {
					country: "Australia",
					value: 139
				  },
				  {
					country: "Austria",
					value: 128
				  }
				];
				chart.radius = am4core.percent(70);
				chart.innerRadius = am4core.percent(40);
				chart.startAngle = 180;
				chart.endAngle = 360;  
				
				var series = chart.series.push(new am4charts.PieSeries());
				series.dataFields.value = "value";
				series.dataFields.category = "country";
				
				series.slices.template.cornerRadius = 10;
				series.slices.template.innerCornerRadius = 7;
				series.slices.template.draggable = true;
				series.slices.template.inert = true;
				series.alignLabels = false;
				
				series.hiddenState.properties.startAngle = 90;
				series.hiddenState.properties.endAngle = 90;
				
				chart.legend = new am4charts.Legend();
				
				}); // end am4core.ready()
				</script>
				
				<!-- HTML -->
				<div id="chartdiv"></div>`

				
				document.head.appendChild(script);
			}

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
           this.render();
        }
    }
    customElements.define("com-sample-amchart1", amchart1);
})();