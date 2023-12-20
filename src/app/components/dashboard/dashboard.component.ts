import { Component, OnInit } from '@angular/core';
import { getData, getData1} from './your-data-file';
import { AgCharts } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any; // Replace 'any' with the actual type of your data structure
  numFormatter = new Intl.NumberFormat('en-US');
  total!: number;

  ngOnInit() {
    this.createChart();
    this.data = getData();
    this.total = this.data.reduce((sum: number, d: any) => sum + d['count'], 0);

    const options: any = {
      container: document.getElementById('myChart'),
      data: this.data,
      // title: {
      //   text: 'Dwelling Fires (UK)',
      // },
      // footnote: {
      //   text: 'Source: Home Office',
      // },
      series: [
        {
          type: 'pie',
          calloutLabelKey: 'type',
          angleKey: 'count',
          sectorLabelKey: 'count', // Change this to the actual property name in your data
          calloutLabel: {
            enabled: false,
          },
          sectorLabel: {
            formatter: ({ datum, sectorLabelKey }: { datum: any; sectorLabelKey: string }) => {
              const value = datum[sectorLabelKey];
              return this.numFormatter.format(value);
            },
          },
          title: {
            text: 'Task Count',
          },
          innerRadiusRatio: 0.7,
          innerLabels: [
            {
              text: this.numFormatter.format(this.total),
              fontSize: 24,
            },
            {
              text: 'Task',
              fontSize: 16,
              margin: 10,
            },
          ],
          tooltip: {
            renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }: {
              datum: any;
              calloutLabelKey: string;
              title: string;
              sectorLabelKey: string;
            }) => {
              return {
                title,
                content: `${datum[calloutLabelKey]}: ${this.numFormatter.format(datum[sectorLabelKey])}`,
              };
            },
          },
          strokeWidth: 3,
        },
      ],
    };

    const chart = AgCharts.create(options);
  }

  createChart() {
    function formatNumber(value: number): string {
      value /= 1000000;
      return `${Math.floor(value)}H`;
    }

    const options: any = {
      container: document.getElementById('myChart1'),
      data: getData1(),
      title: {
        text: 'Total day of working',
      },
      footnote: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'bar',
          xKey: 'year',
          yKey: 'visitors',
          label: {
            formatter: ({ value }: { value: number }) => formatNumber(value),
          },
          tooltip: {
            renderer: ({ datum, xKey, yKey }: { datum: any; xKey: string; yKey: string }) => {
              return { title: datum[xKey], content: formatNumber(datum[yKey]) };
            },
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Year',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Total working hrs',
          },
          label: {
            formatter: ({ value }: { value: number }) => formatNumber(value),
          },
        },
      ],
    };

    const chart = AgCharts.create(options);
  }

  }
  

