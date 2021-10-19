import { Injectable } from '@angular/core';
import { Pregunta, PreguntaUsuario } from 'src/app/models/pregunta';
import { CategoriaResultado, Trivia, TriviaUser } from 'src/app/models/trivia';
import { User } from 'src/app/models/user';

import { Cuestionario } from '../TriviaData';
import { CuestionarioUser } from '../TriviaUserData';
import { categoriasResultado } from '../TriviaData';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {


  trivia: Trivia=new Trivia();
  triviaUser: TriviaUser=new TriviaUser();
  user:User=new User();

  categorias: CategoriaResultado[]=[];
  PreguntaEnCurso?: Pregunta;
  ordenPregunta:number=0;

  PreguntaUsuarioEnCurso?: PreguntaUsuario;
  ordenPreguntaUsuario:number=0;
  
  constructor() { 
    this.trivia.cuestionario=Cuestionario;
    this.ordenPregunta=0;
    this.PreguntaEnCurso=this.trivia.cuestionario[this.ordenPregunta];

    this.triviaUser.cuestionarioUsuario=CuestionarioUser;
    this.ordenPreguntaUsuario=0;
    this.PreguntaUsuarioEnCurso=this.triviaUser.cuestionarioUsuario[this.ordenPreguntaUsuario];
    this.categorias=categoriasResultado;
  }

  getPregunta(ordenPregunta:number){
    this.PreguntaEnCurso=this.trivia.cuestionario[ordenPregunta];
    return this.PreguntaEnCurso
  }

  getPreguntaUsuario(ordenPreguntaUsuario:number){
    this.PreguntaUsuarioEnCurso=this.triviaUser.cuestionarioUsuario[ordenPreguntaUsuario];
    return this.PreguntaUsuarioEnCurso
  }

  setScore(orden: number, optionChoiced:number){
    if(this.trivia.cuestionario[orden].Axis=="x"){
      this.trivia.PositionX=this.trivia.PositionX+this.trivia.cuestionario[orden].QuestionScore*(optionChoiced-3)
    }
    else{
      this.trivia.PositionY=this.trivia.PositionY+this.trivia.cuestionario[orden].QuestionScore*(optionChoiced-3)
    }
  }

}
