(function() { 
	let template = document.createElement("template");
	  template.innerHTML = `
      <style>
      :host {
          display: block;
         } 
         </style> 
        <div id="chart_div"></div>`;

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
	    
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            var myprops = this._props
            this.style["width"]=myprops.width;
            this.style["height"]=myprops.height;
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
            script.onload = function () {  
                const script1 = document.createElement('script');
                script1.type = 'text/javascript';
                script1.async = true;
    
                script1.onload = function () {  
                    const script2 = document.createElement('script');
                    script2.type = 'text/javascript';
                    script2.async = true;
        
                    script2.onload = function () {  
                        am4core.ready(function() {

                            // Themes begin
                            am4core.useTheme(am4themes_animated);
                            // Themes end
                            const ctx = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#chart_div");
                            var chart = am4core.create(ctx, am4charts.PieChart);
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
                            
                            }); 
                                        
                                                                  
                        }
                        script2.src = 'https://www.amcharts.com/lib/4/themes/animated.js';
                        document.head.appendChild(script2);           
                                                              
                    }
                    script1.src = 'https://www.amcharts.com/lib/4/charts.js';             
                    document.head.appendChild(script1);                                    
                }
                script.src = 'https://www.amcharts.com/lib/4/core.js';
                document.head.appendChild(script);

			
            }
    }
    customElements.define("com-sample-amchart1", amchart1);
})();
