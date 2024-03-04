import Person from "./Person";
// import { ReactGoogleChartEvent, Chart } from "react-google-charts";
import { useState, useEffect } from "react";

// interface Props {
//   people: Person[];
//   onChangeSelect: (id: string) => void;
// }

export default function FamilyTree(props) {
  google.charts.load("current", { packages: ["orgchart"] });
  google.charts.setOnLoadCallback(drawChart);
  var chart;
  function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Name");
    data.addColumn("string", "Manager");
    data.addColumn("string", "ToolTip");
    const display = [];
    for (let person of props.people) {
      display.push([
        {
          v: person.id,
          f: person.name,
        },
        person.parent,
        person.birth,
      ]);
    }

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows(display);

    // Create the chart.
    chart = new google.visualization.OrgChart(
      document.getElementById("chart_div")
    );
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, { allowHtml: true });
    google.visualization.events.addListener(chart, "select", selectHandler);
  }
  const exampleData = [
    [
      {
        v: "Mike",
        f: 'Mike<div style="color:red; font-style:italic">President</div>',
      },
      "",
      "The President",
    ],
    [
      {
        v: "Jim",
        f: 'Jim<div style="color:red; font-style:italic">Vice President</div>',
      },
      "Mike",
      "VP",
    ],
    ["Alice", "Mike", ""],
    ["Bob", "Jim", "Bob Sponge"],
    ["Carol", "Bob", ""],
  ];

  function selectHandler() {
    let selection = chart.getSelection();
    if (selection[0]) {
      let person = props.people[selection[0].row];
      props.onChangeSelect(person.id);
    } else {
      props.onChangeSelect("");
    }
  }

  return <div id="chart_div"></div>;
}
