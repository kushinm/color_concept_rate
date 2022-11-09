var jsPsychCongruenceGraph = (function (jspsych) {
    'use strict';
    
    const info = {
        name: "CongruenceGraph",
        parameters: {
            /** Each element of the array is the HTML-formatted content for a single page. */
            concept1: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "concept1",
                default: undefined,
            },
            concept2: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "concept2",
                default: undefined,
            },
            /** The key the subject can press in order to advance to the next page. */
            ylabel: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "ylabel",
                default: undefined,
            },
            /** The key that the subject can press to return to the previous page. */
            key_backward: {
                type: jspsych.ParameterType.KEY,
                pretty_name: "Key backward",
                default: "ArrowLeft",
            },
            /** If true, the subject can return to the previous page of the instructions. */
            innerHigh: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "innerHigh",
                default: true,
            },
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            
            /** If true, the subject can use keyboard keys to navigate the pages. */
            allow_keys: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Allow keys",
                default: true,
            },
            /** If true, then a "Previous" and "Next" button will be displayed beneath the instructions. */
            concept1color: {
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: null,
            },
            concept2color: {
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: null,
            },
            fontColor: {
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: null,
            },
            congruenceCond: {
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: true,

            },
            semanticCond:{
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: true,

            },
            correctCity:{
                type: jspsych.ParameterType.STRING,
                // pretty_name: "Allow keys",
                default: true,

            },
            practiceTrial:{
                type: jspsych.ParameterType.INT,
                default: null,
            },
            set: {
                type: jspsych.ParameterType.INT,
               
                default: null,
            },
        },
    };
    
    
    class CongruenceGraphPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        
        trial(display_element, trial) { 
            console.log(trial.concept1color)
            $("#jspsych-content").css('max-width', '750px');
            display_element.innerHTML='';
            
            
            display_element.innerHTML+=(`<div class="canvas-container" id="container" style="position:relative; height:400px;width:900px;margin-left:auto;margin-right: auto;  margin-top: 5px;background: rgba(61, 58, 57)">\
            <canvas id="myChart" style="float:left;z-index: 1;height: 100%; width:50%; margin-left:auto;margin-right: auto; top:0px;">\
            </canvas>\
            <div id="legend" style="margin-top:100px;float:right;width:35%">\
            <div id = "item1" style = "height:65px;">\
            <div id="box1"  style = "float: left;\
            height: 40px;\
            width: 40px;\
            margin: 15px;\
            clear: both;\
            background-color: ${trial.concept1color};"></div><p style="font-size:35px; margin-top: 15px;float:left; color:${trial.fontColor}">${trial.concept1}</p></div>\
            <div id = "item2" style = "height:65px;">\
            <div id="box2"  style = "float: left;\
            height: 40px;\
            width: 40px;\
            margin: 15px;\
            clear: both;\
            background-color: ${trial.concept2color};"></div><p style="font-size:35px; margin-top: 15px;float:left; color:${trial.fontColor}">${trial.concept2}</p></div></div>\
            <div id = "grid" style = "height:100%;width:100%;margin-left:auto;margin-right: auto;  margin-top: 5px;background:  rgba(61, 58, 57)"></div>\
            </div>`
            );
            
            
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // kill keyboard listeners
                // gather the data to store for the trial
                // var trial_data = {
                //     rt: response.rt,
                //     stimulus: trial.stimulus,
                //     response: response.key,
                // };
                // clear the display
                // display_element.innerHTML = "";
                // move on to the next trial

                var trial_data = {
                   
                    concept1: trial.concept1,
                    concept2: trial.concept2,
                    congruenceCond:trial.congruenceCond,
                    semanticCond: trial.semanticCond,
                    correctCity:trial.correctCity,
                    set:trial.set,
                    practiceTrial: trial.practiceTrial,
                };
                this.jsPsych.finishTrial(trial_data);
            };
            
        
            
            var ctx = document.getElementById('myChart').getContext('2d');
            // ctx.canvas.width  =800;
            // ctx.canvas.height = 400;
            
            
            function getRandNum(base, max, min){
                
                return (base + Math.round(Math.random() * (max - min) + min))
            }
            
            if (trial.innerHigh==true){
                
                var barHeights1 =  [ getRandNum(20,10,-10), getRandNum(60,10,-10)]
                var barHeights2 =  [ getRandNum(60,10,-10), getRandNum(20,10,-10)]
            }
            else if(trial.innerHigh==false){
                var barHeights1 =  [ getRandNum(60,10,-10), getRandNum(20,10,-10)]
                var barHeights2 =  [ getRandNum(20,10,-10), getRandNum(60,10,-10)]
            }
            
            var labels = ["City A","City B"];
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: trial.concept1,
                        data: barHeights1,
                        backgroundColor: trial.concept1color,
                        stack: 'Stack 0',
                        barPercentage: 0.8,
                        categoryPercentage: .75
                    },
                    {
                        label: trial.concept2,
                        data: barHeights2,
                        backgroundColor:  trial.concept2color,
                        stack: 'Stack 1',
                        barPercentage: 0.8,
                        categoryPercentage: .75
                        
                    },
                ]
            };
            
            
            
            var myChart = new Chart(ctx, {
                
                type: 'bar',
                data: data,
                // plugins: [legendExtraSpace],
                
                options: {
                    
                    events:[],
                    responsive: false,
                    animation: {duration: 0},
                    tooltips: {enabled: false},
                    hover: {mode: null},
                    
                    plugins:{
                        legend: {
                            
                            // rtl: true,
                            textDirection: 'rtl',
                            align: 'right',
                            display: false,
                            position:'right',
                            
                            labels: {
                                font:{size:35},
                                boxWidth:45,
                                color: trial.fontColor,
                                boxHeight:45,
                                textAlign: 'left',
                                padding: 20
                                
                                
                            }
                            
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            //  gridLines: {display: false,
                            //  drawBorder: true,
                            //  drawOnChartArea: false,
                            //  lineWidth:2,
                            //  color: '#000000',
                            //  tickMarkLength: 0
                            //     },
                            
                            title: {
                                display: true,
                                text: trial.ylabel,
                                font:{size:35},
                                //boxWidth:25,
                                color: "black",
                            },
                            grid: {display: false,
                                drawBorder: true,
                                borderWidth:3,
                                z:100,
                                borderColor: trial.fontColor,
                                
                            },
                            ticks: {
                                display: false,
                                // beginAtZero: true,
                                // padding: 100
                            }
                        },
                        x:{ 
                            
                            //   gridLines: {display: false,
                            // drawBorder: false,
                            // drawOnChartArea: false,
                            // lineWidth:1,
                            // color: '#000000'
                            // },
                            grid: {//drawOnChartArea:false,
                                
                                display: false,
                                drawBorder: true,
                                borderWidth:3,
                                z:100,
                                borderColor: trial.fontColor,
                                
                                
                            },
                            ticks:{display: true,
                                color: trial.fontColor,
                                font: {
                                    size: 35,
                                }}}
                            }
                        }
                    })
                    
                    
                    
                    
                    /// write a javascript function to create a 5 by 5 grid of squares with the color of each square alternating between red and blue
                    /// the function should take in a parameter that determines the size of the grid and generate the grid using css and html using the 2 colors specified above
                    function creategrid() {
                        var grid = document.getElementById("grid");
                        var size = 18;
                        var color = trial.concept1color;
                        for (var i = 0; i < size-9; i++) {
                            for (var j = 0; j < size; j++) {
                                var square = document.createElement("div");
                                square.style.width = "50px";
                                square.style.height = "50px";
                                square.style.float = "left";
                                square.style.backgroundColor = color;
                                grid.appendChild(square);
                                if (color == trial.concept1color) {
                                    color = trial.concept2color;
                                } else {
                                    color = trial.concept1color;
                                }
                            }
                            if (color == trial.concept1color) {
                                color = trial.concept2color;
                            } else {
                                color = trial.concept1color;
                            }
                        }
                    }
                    
    

                    setTimeout(() => {
                     
                        const cont = document.getElementById('container');
                        cont.innerHTML=""
                        var grid = document.createElement('div');
                        grid.setAttribute("id", "grid");
                        grid.setAttribute("style", "height:100%;width:100%;margin-left:auto;margin-right: auto;  margin-top: 5px;background: rgba(61, 58, 57)");
                        cont.appendChild(grid)
                        creategrid();
                        // runRefresh=false;
                        
                    }, 1700);
        
               
                    
                    if (trial.trial_duration !== null) {
                        this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
                    }
                    
                }
            } 
            
            CongruenceGraphPlugin.info = info;
            
            return CongruenceGraphPlugin;
            
            
        })(jsPsychModule);
        
        
        