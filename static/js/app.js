

// populate the meta data

function demoInfo(sample)
{
    console.log(sample);

     //get data with d3.json
     d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
       
        //filter based on value of sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

       
        // acces index 0 from array
        let resultData = result[0];
       
        //clear metadata
        d3.select("#sample-metadata").html("");

        //use object.entry to get value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            //add to sample data/ demographics section
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });

     });
}



// function for building bar chart
function buildBarChart(sample)
{
   

    d3.json("samples.json").then((data) => {
        //grab all the samples
        let sampleData = data.samples;
        console.log(sampleData);

        
       // filter based on value of sample
       let result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
        // acces index 0 from array
        let resultData = result[0];
        

        //ger otu_ids, labels, an sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
       
        // build barchart
        //get y ticks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

       
       let barChart = {
        y: yticks.reverse(),
        x: xValues.reverse(),
        text: textLabels.reverse(),
        type: "bar",
        orientation: "h"
       }

       let layout = {
        title: "Top 10 Belly Button Bacteria"
       };

       Plotly.newPlot("bar", [barChart], layout)

     });
}

//function for bubble chart
function buildBUbbleChart(sample)
{
    d3.json("samples.json").then((data) => {
        //grab all the samples
        let sampleData = data.samples;
        console.log(sampleData);

        
       // filter based on value of sample
       let result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
        // acces index 0 from array
        let resultData = result[0];
        

        //ger otu_ids, labels, an sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
       
        // build bubble chart      
        let bubbleChart = {
        y: sample_values,
        x: otu_ids,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
       }

       let layout = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
       };

       Plotly.newPlot("bubble", [bubbleChart], layout)

     });
};

// initialize dashboard


function initialize()
    {
        //access dropdown from index.html
        var select = d3.select("#selDataset");

        //get data with d3.json
        d3.json("samples.json").then((data) =>
        {
        let sampleNames = data.names;
       //console.log(sampleNames);   


            sampleNames.forEach((sample) => {
                select.append("option")
                .text(sample)
                .property("value", sample);

            });

             //pass in info for first sample when initialized
            let sample1 = sampleNames[0];

           //call function to build metaddata
           demoInfo(sample1);
           //call funtion to buiild bar chart
           buildBarChart(sample1);
           //call function to build bubble chart
           buildBUbbleChart(sample1)
            


        });                
  
    }

    //update dashboard
    function optionChanged(item)
    {
        //call  update to the metadata
        demoInfo(item);
        //call funtion for bar chart
        buildBarChart(item);
        //call funtion for bubble chart
        buildBUbbleChart(item);

    }
//call to initialize function
initialize();



