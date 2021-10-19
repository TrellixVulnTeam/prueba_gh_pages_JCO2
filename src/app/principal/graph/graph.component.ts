import { Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TriviaService } from '../trivia_service/trivia.service';

import { GoogleChartsModule } from 'angular-google-charts';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { CategoriaResultado } from 'src/app/models/trivia';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit { 
  posX:number=0;
  posY:number=0;
  
  titulo_resultado:String ='HOLA';
  descripcion_resultado:String ='Holaaa';
  categorias: CategoriaResultado[]=[];

  ngOnInit(): void {  
    this.posX= this.triviaService.trivia.PositionX;
    this.posY= this.triviaService.trivia.PositionY;
    console.log(this.posX,this.posY);

    this.categorias=this.triviaService.categorias;
    this.categorias[3].selected=false;
    this.categorias[2].selected=false;
    this.categorias[1].selected=false;
    this.categorias[0].selected=false;

    this.scatterChartData=[
      {
        data: [
          {x: this.posX as number,y: this.posY as number},        
        ],
        label: '',
        pointRadius: 10,
      },
    ];
    
    if(this.posX>0){
      if(this.posY>0){
        //this.titulo_resultado="POPULISMOS DE DERECHA";
        this.categorias[3].selected=true;
        this.categorias[2].selected=false;
        this.categorias[1].selected=false;
        this.categorias[0].selected=false;
      }
      else{
        //this.titulo_resultado="LIBERALISMOS DE DERECHA";
        this.categorias[1].selected=true;
        this.categorias[2].selected=false;
        this.categorias[3].selected=false;
        this.categorias[0].selected=false;
      }   
    }
    else{
      if(this.posY>0){
        //this.titulo_resultado="POPULISMOS DE IZQUIERDA";
        this.categorias[2].selected=true;
        this.categorias[1].selected=false;
        this.categorias[3].selected=false;
        this.categorias[0].selected=false;
      }
      else{
        //this.titulo_resultado="LIBERALISMOS DE IZQUIERDA";
        this.categorias[0].selected=true;
        this.categorias[2].selected=false;
        this.categorias[3].selected=false;
        this.categorias[1].selected=false;
      }
    }
    if(this.posX==0 && this.posY==0){
      this.titulo_resultado="CENTRO";
        this.descripcion_resultado="WOW... estás en el centro!";
        this.categorias[0].selected=false;
        this.categorias[2].selected=false;
        this.categorias[3].selected=false;
        this.categorias[1].selected=false;
    }
  }

  

   scatterChartOptions: ChartOptions = {
    responsive: true,
    showLines:false,
    spanGaps:false,
    scales: {
      xAxes: [{
        gridLines: {
            display:true,
            lineWidth: 0,
            zeroLineWidth:3,
            zeroLineColor:"grey",
        },
        display: true,
        ticks: {
          max : 30,
          min: -30,
        }
    }],
      yAxes: [{
          gridLines: {
              display:true,
              lineWidth: 0,
              zeroLineWidth:3,
              zeroLineColor:"grey",
          },
          scaleLabel:{
            display:false,
            lineHeight:0,
          },
          display: true,
          ticks: {
            max : 30,
            min: -30
          }
      }],
    },


  };

   scatterChartLabels: Label[] = [''];

   scatterChartType: ChartType = 'scatter';

   scatterChartData: ChartDataSets[] = [
    {
      data: [
        {x: this.posX as number,y: this.posY as number},        
      ],
      label: '',
      pointRadius: 10,
    },
  ];

  public chartColors:Array<any> =[
    {
      fillColor:"#ffffff",
      strokeColor:"#ffffff",
      pointColor:"#ffffff",
      pointStrokeColor:"#ffffff",
      pointHighlightFill:"#ffffff",
      pointHighlightStroke:"#ffffff",
      pointBackgroundColor:"black",
      backgroundColor: "#ffffff"
    }]

  constructor(private triviaService:TriviaService,private _router: Router) { 
    //this.posX=triviaService.trivia.PositionX;
    //this.posY=triviaService.trivia.PositionY; 
    //(this.scatterChartData[0].data as number[]).push(this.posX,this.posY);

  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
