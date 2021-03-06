(function() { 
	let template = document.createElement("template");
	  template.innerHTML = `
        <div id="chart_div" style="width:900px;height:800px"></div>`;

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
            var val = myprops.value;           

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
                      drawchart(val)}

                      function drawchart(props) {
                        var a=props.split(";");
                        var chartdata=[];
                        for (let i = 0; i < a.length; i++) {
                          const a1 = a[i].substring(0,a[i].search(":"));
                          const a2 = a[i].substring(a[i].search(":")+1,);
                          const a3 = Number(a2);
                          var c1={
                            Label: a1,
                            value: a3
                          }
                          chartdata.push(c1);
                        }
                      
                        am4core.ready(function() {

                            // Themes begin
                            am4core.useTheme(am4themes_animated);
                            // Themes end
                            const ctx = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#chart_div");
                            var chart = am4core.create(ctx, am4charts.PieChart);
                            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
                            
                            chart.data = chartdata;
                            chart.radius = am4core.percent(70);
                            chart.innerRadius = am4core.percent(40);
                            chart.startAngle = 180;
                            chart.endAngle = 360;  
                            
                            var series = chart.series.push(new am4charts.PieSeries());
                            series.dataFields.value = "value";
                            series.dataFields.category = "Label";
                            
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
				//document.write('<script src="https://www.amcharts.com/lib/4/core.js"><\/script>');
				//document.write('<script src="https://www.amcharts.com/lib/4/charts.js"><\/script>');
				//document.write('<script src="https://www.amcharts.com/lib/4/themes/animated.js"><\/script>');
			//script.src = 'https://www.amcharts.com/lib/4/core.js';
			//script.src = 'https://www.amcharts.com/lib/4/charts.js';
			//script.src = 'https://www.amcharts.com/lib/4/themes/animated.js';
			//Append it to the document header
			//document.head.appendChild(script);
			
            }
    }
    customElements.define("com-sample-amchart1", amchart1);
})();
