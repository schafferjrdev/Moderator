import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import _ from "lodash";

export class Todo {
  desc: string;
}


export class Jogador {
  name: string;
  job: Classes;
  lynch:boolean = false;
  target: boolean = false;
  toughTarget: boolean = false;
  love: boolean = false;
  save: boolean = false;
  enchant: boolean = false;
  dead: boolean = false;
  curePotion: boolean = false;
  cureUsed: boolean = false;
  deathPotion: boolean = false;
  deathUsed: boolean = false;
  crowMark: boolean = false;
  foxPower: boolean = false;
  buddy: boolean = false;
  graveStyle: number = 0;

}


export class Status {
  target: number = 0;
  toughTarget: number = 0;
  love: number = 0;
  save: number = 0;
  enchant: number = 0;
  dead: number = 0;
  curePotion: number = 0;
  deathPotion: number = 0;
  crowMark: number = 0;
  foxPower: number = 0;
  buddy: number = 0;

}

export interface Classes {
  name: string;
  desc: string;
  team: string;
  power: string;
  order: number;
  qnt: number;
  icon: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {
  showPlayer: boolean = false;
  filterInGame: boolean = false;
  sortGame: boolean = false;
  hasData: boolean = localStorage["gameSave"];
  step: number = 0;
  night:boolean = true;
  showDead:boolean = false;

  playerEditIndex: number =0;
  myControl = new FormControl();
  options: string[] = [];

  
  todo: Todo = new Todo();
  todos: Todo[] = [];

  jogador: Jogador = new Jogador();
  jogadores: Jogador[] = [];

  classesForSort: Classes[];

  statusUseds: Status = new Status();

  times = {
    aldeia:0,
    lobos:0,
    cult:0,
    balancing:0,
    totalClasses:0
  }
 

  classes: Classes[] = [
    {
      name: 'Lobisomem', 
      desc: 'Toda noite, junto dos outros Lobos, ele escolhe alguém da aldeia para atacar e matar',
      team: 'bad',
      power: '-6',
      order: 4,
      qnt:0,
      icon:'lobisomem'
    },
    {
      name: 'Cachorro', 
      desc: 'Na primeira noite escolhe outra pessoa para ser seu companheiro, se essa pessoa morrer, você morre. No resto das noites joga pelos lobos. ',
      team: 'bad',
      power: '-4',
      order: 0,
      qnt:0,
      icon:'cao'
    },
    {
      name: 'Aldeão', 
      desc: 'Não tem poderes especiais',
      team: 'good',
      power: '+1',
      order: 100,
      qnt:0,
      icon:'aldeao'
    },
    {
      name: 'Guardião', 
      desc: 'Toda noite protege uma pessoa de ataque de lobo*. Não pode escolher a mesma pessoas duas vezes seguidas.',
      team: 'good',
      power: '+3',
      order: 3,
      qnt:0,
      icon:'guardiao'
    },
    {
      name: 'Vidente', 
      desc: 'Toda noite a vidente escolhe alguem e consulta as entidades para saber se tal pessoa é ou não lobo',
      team: 'good',
      power: '+7',
      order: 2,
      qnt:0,
      icon:'vidente'
    },
    {
      name: 'Feiticeira', 
      desc: 'Toda noite você tentará adivinhar quem é a vidente, você vence com os lobos',
      team: 'bad',
      power: '-3',
      order: 3,
      qnt:0,
      icon:'feiticeira'
    },
    {
      name: 'Bruxa', 
      desc: 'Tem duas poções que podem ser usadas uma vez durante o jogo, com a cura ela sabe quem foi atacado a noite e salva, e com o veneno ela elimina um jogador.',
      team: 'good',
      power: '+4',
      order: 7,
      qnt:0,
      icon:'bruxa'
    },
    {
      name: 'Licano', 
      desc: 'Ele confunde o vidente aparecendo na vidência como se fosse Lobo, porém ele joga sempre pela vila',
      team: 'good',
      power: '-1',
      order: 100,
      qnt:0,
      icon:'licano'
    },
    {
      name: 'Amaldiçoado', 
      desc: 'Luta pela vila, mas caso seja atacado pelos Lobos, se junta a eles.',
      team: 'good',
      power: '-3',
      order: 100,
      qnt:0,
      icon:'amaldicoado'
    },
    {
      name: 'Gigante', 
      desc: 'Precisa de dois ataques de lobo para morrer',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'gigante'
    },
    {
      name: 'Caçador', 
      desc: 'Se morrer em algum momento ele escolhe alguém pra matar, sem influencia da vila. Se morrer de dia todo mundo sabe, se for de noite fica secreto',
      team: 'good',
      power: '+3',
      order: 0,
      qnt:0,
      icon:'cacador'
    },
    {
      name: 'Maçom', 
      desc: 'Se reconhecem na primeira noite. Se alguém falar sobre, o moderador mata a pessoa durante a noite e avisa no dia seguinte',
      team: 'good',
      power: '+2',
      order: 0,
      qnt:0,
      icon:'macom'
    },
    {
      name: 'Príncipe', 
      desc: 'Não pode ser linchado',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'principe'
    },
    {
      name: 'Lupino', 
      desc: 'É lobo, mas parece um aldeão para o vidente',
      team: 'bad',
      power: '-9',
      order: 100,
      qnt:0,
      icon:'lupino'
    },
    {
      name: 'Lobinho', 
      desc: 'Se ele morrer, na próxima noite os lobos matam 2',
      team: 'bad',
      power: '-8',
      order: 100,
      qnt:0,
      icon:'lobinho'
    },
    {
      name: 'Lobo Mau', 
      desc: 'Durante a noite, se estiver vivo deixa os lobos matarem um jogador adjacente ao alvo',
      team: 'bad',
      power: '-9',
      order: 100,
      qnt:0,
      icon:'lobo-mau'
    },
    {
      name: 'Cupido', 
      desc: 'No começo do jogo, ele escolhe duas pessoas para se apaixonarem. A partir dai, essas duas pessoas jogam juntas, mas não sabem o que a outra pessoa é. Se uma morrer, a outra morre automaticamente.',
      team: 'good',
      power: '-3',
      order: 1,
      qnt:0,
      icon:'cupido'
    },
    {
      name: 'Urso', 
      desc: 'Se de dia tiver um lobo ao lado dele o moderador diz "Urso sente cheiro de lobo". Quando um do lado dele morre, então o próximo é o novo vizinho dele',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'urso'
    },
    {
      name: 'Raposa', 
      desc: 'Escolhe 3 pessoas, se tiver um lobo entre eles o moderador indica positivamente, mas se não tiver a raposa perde seus poderes.',
      team: 'good',
      power: '+3',
      order: 2,
      qnt:0,
      icon:'raposa'
    },
    {
      name: 'Corvo', 
      desc: 'Escolhe um jogador para começar com 2 votos de dia.',
      team: 'good',
      power: '+2',
      order: 2,
      qnt:0,
      icon:'corvo'
    },
    {
      name: 'Leprechaun', 
      desc: 'Redireciona o ataque de um lobo para um alvo adjacente.',
      team: 'good',
      power: '+5',
      order: 5,
      qnt:0,
      icon: 'leprechaun'
    },
    {
      name: 'Lider do Culto', 
      desc: 'Toda noite ele converte uma pessoas para seu culto e se todos os vivos tiverem no culto ele ganha o jogo sozinho. Depois de converter o moderador manda toda noite quem está convertido abri o olho e reconhecer, assim todos sabem se está ficando perto ou não.',
      team: 'neutral',
      power: '+1',
      order: 6,
      qnt:0,
      icon: 'liderdoculto'
    }
  ];
  classesHelp: Classes[] = this.classes;
  classesInGame: Classes[] = this.classes;
  
  constructor() {
    
    this.classes = _.sortBy(this.classes, ['team', 'power']);  
    this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);
    this.classesInGame = _.concat(this.classesInGame,addMore("Aldeão", 3));
    this.classesInGame = _.concat(this.classesInGame,addMore("Lobo", 3));
    this.classesInGame = _.pull(this.classesInGame,undefined);
    this.classesInGame = _.shuffle(this.classesInGame);
    this.getLocalFav();
    
    // var pulled = _.pullAt(array, 0);
    // console.log(this.classesInGame);
    
    
  }

  ngOnInit() {
  }

  save(jogador: Jogador) {
    document.getElementById('input-player-name').focus();
    if(jogador.name !== undefined){
      if(jogador.name.trim() != "" && !this.hasNamePlayer(jogador.name.trim())){
        let index = _.findIndex(this.classes, { 'name': 'Aldeão' });
        
        jogador.job = this.classes[index];
        this.jogador.graveStyle = Math.floor(Math.random() * 3) + 1;  
        this.jogadores.push(jogador);
        this.jogador = new Jogador();
        this.jogadores = Object.assign([], this.jogadores);
        let quantity =0;
        let dead =0;
        let balance =0;
        for (let index = 0; index < this.jogadores.length; index++) {
          balance = balance+Number(this.jogadores[index].job.power);
          if(this.jogadores[index].job.team === 'bad' && !this.jogadores[index].dead){
            quantity++;
          }
          if(this.jogadores[index].dead){
            dead++;
          }  
        }
        // this.times.balance = balance;
        this.times.lobos = quantity;
        this.times.aldeia = this.jogadores.length - dead - quantity;
      }else{
        jogador.name = "";
      }
      
    }
    this.showPlayer = false;

    this.jogadores = _.sortBy(this.jogadores, ['dead','job.team', 'job.order','job.name']); 

    if(this.filterInGame == true){
      let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          add(classTemp,this.jogadores[i].job);
          
        }
          
        this.classesHelp = classTemp;
        this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);  
    }
    
  }
  

  invertFlag(flag:boolean){
    // flag = !flag;
    console.log(flag);
  }

  delete(jogador: Jogador) {
    this.jogadores.splice(this.jogadores.indexOf(jogador), 1);
    let quantity =0;
    let dead =0;
    let balance =0;
    for (let index = 0; index < this.jogadores.length; index++) {
      balance = balance+Number(this.jogadores[index].job.power);
      if(this.jogadores[index].job.team === 'bad' && !this.jogadores[index].dead){
        quantity++;
      }
      if(this.jogadores[index].dead){
        dead++;
      }  
    }
    // this.times.balance = balance;
    this.times.lobos = quantity;
    this.times.aldeia = this.jogadores.length - dead - quantity;
    this.showPlayer = false;
    this.jogadores = _.sortBy(this.jogadores, ['dead','job.team', 'job.order','job.name']); 

    if(this.filterInGame == true){
      let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          add(classTemp,this.jogadores[i].job);
          
        }
          
        this.classesHelp = classTemp;
        this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);  
    }

    if(this.jogadores.length - this.times.totalClasses <0){
      this.classesInGame = _.sortBy(this.classesInGame, ['qnt']);
      this.classesInGame[0].qnt--;
      this.changeBalance();
      
    }
  }

  teamsUp() {

    // _.findKey(this.jogadores.job, ['team', 'bad'])
    let quantity =0;
    let dead =0;
    let balance =0;
    for (let index = 0; index < this.jogadores.length; index++) {
      balance = balance+Number(this.jogadores[index].job.power);
      if(this.jogadores[index].job.team === 'bad' && !this.jogadores[index].dead){
        quantity++;
      }
      if(this.jogadores[index].dead){
        dead++;
      }
       
    }
    // this.times.balance = balance;
    this.times.lobos = quantity;
    this.times.aldeia = this.jogadores.length - dead - quantity;

    if(this.filterInGame == true){
      let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          add(classTemp,this.jogadores[i].job);
          
        }
          
        this.classesHelp = classTemp;
        this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);  
    }
    if(this.hasClass('Lider do Culto')){
      this.jogadores[_.findIndex(this.jogadores, function(o) { return o.job.name === 'Lider do Culto'; })].enchant = true;
    }
       this.times.cult = this.numberCult();
  }

  numberCult(){
    
    let cultAlive = _.filter(this.jogadores, function(o) { return o.dead === false; });
    return _.countBy(cultAlive, 'enchant').true > 0 ? _.countBy(cultAlive, 'enchant').true : 0 ;

  }

  hasClass(className:string){
    let index = _.findIndex(this.jogadores, function(o) { return o.job.name == className; });
    return index !== -1 ? true : false;  
  }

  playerWithStatus(stat:string, array, type:boolean){
    let playerWithStatus = _.filter(array, function(o) { return o[stat] == type; });
    
    return playerWithStatus;
  }
  playerWithClass(classe:string, array){
    let playerWithClass = _.filter(array, function(o) { return o.job.name == classe; });
    
    return playerWithClass;
  }

  playerWithClassAndStatusTrue(classe:string, array,stat:string){
    let playerWithClassAndStatus = _.filter(array, function(o) { return o.job.name == classe; });
    let index = _.findIndex(playerWithClassAndStatus, function(o) { return o[stat] == true; });
    return index !== -1 ? true : false;
  }

  statusTrue(stat:string, array){
    let index = _.findIndex(array, function(o) { return o[stat] == true; });
    
    return index !== -1 ? true : false;
  }

  changeAllStatus(stat:string, array, type:boolean){
      for (let i = 0; i < array.length; i++) {
        array[i][stat] = type;
        
      }
  }

  changeStatusWhere(stat:string, arrayToChange, arrayCompare, type:boolean){
    
    for (let i = 0; i < arrayToChange.length; i++) {
      for (let j = 0; j < arrayCompare.length; j++) {
        if(arrayToChange[i].name === arrayCompare[j].name){
          arrayToChange[i][stat] = type;
        }
        
      }
      
    }
    this.teamsUp();
  }

  changeStatusWhereMinus(stat:string, arrayToChange, arrayCompare, type:boolean, classe:string){
    
    for (let i = 0; i < arrayToChange.length; i++) {
      for (let j = 0; j < arrayCompare.length; j++) {
        if(arrayToChange[i].name === arrayCompare[j].name && arrayToChange[i].job.name !== classe){
          arrayToChange[i][stat] = type;
        }
        
      }
      
    }
    this.teamsUp();
  }

  show(){
    console.log("teste");
  }

  dayPass(){
    let playerAlive = _.filter(this.jogadores, function(o){return o.dead === false; });
    this.changeStatusWhereMinus('target', this.jogadores, playerAlive, false, 'Gigante');
    this.changeStatusWhere('toughTarget', this.jogadores, playerAlive, false);
    this.changeStatusWhere('save', this.jogadores, playerAlive, false);
    this.changeStatusWhere('curePotion', this.jogadores, playerAlive, false);
    this.changeStatusWhere('lynch', this.jogadores, playerAlive, false);
    this.night = !this.night;
    this.saveLocal();
  }

  eliminate(){
    let playerAttacked = _.filter(this.jogadores, function(o){return o.target === true && o.job.name !== 'Gigante'; });
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.lynch === true && o.job.name !== 'Príncipe'; }));
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.deathPotion === true; }));
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.toughTarget === true; }));
    playerAttacked = _.uniqBy(playerAttacked, 'name');

    let playerNotSaved = _.filter(playerAttacked, function(o){return o.save === false; });
    playerNotSaved = _.filter(playerNotSaved, function(o){return o.curePotion === false; });
    playerNotSaved = _.uniqBy(playerNotSaved, 'name');
    


    let lovers; 
    if(this.statusTrue('love',playerNotSaved)){
      lovers = this.playerWithStatus('love',this.jogadores,true);
      playerNotSaved = _.concat(playerNotSaved,lovers);
      playerNotSaved = _.uniqBy(playerNotSaved, 'name');
    }
    let buddy;
    if(this.statusTrue('buddy',playerNotSaved)){
      buddy = this.playerWithClass('Cachorro',this.jogadores)
      playerNotSaved = _.concat(playerNotSaved,buddy);
      playerNotSaved = _.uniqBy(playerNotSaved, 'name');
    }

    
    
    playerNotSaved = this.playerWithStatus('dead',playerNotSaved,false);
    this.changeStatusWhere("dead",this.jogadores,playerNotSaved,true);
    // console.log(playerNotSaved);
    let playerAlive = _.filter(this.jogadores, function(o){return o.dead === false; });
    this.changeStatusWhereMinus('target', this.jogadores, playerAlive, false, 'Gigante');
    this.changeStatusWhere('toughTarget', this.jogadores, playerAlive, false);
    this.changeStatusWhere('save', this.jogadores, playerAlive, false);
    this.changeStatusWhere('crowMark', this.jogadores, playerAlive, false);
    this.changeStatusWhere('curePotion', this.jogadores, playerAlive, false);
    this.changeStatusWhere('lynch', this.jogadores, playerAlive, false);


    
    let indexCursed = _.findIndex(this.jogadores, function(o) { return o.job.name === 'Amaldiçoado' && o.target === true; });
    
    let indexWolf = _.findIndex(this.classes, function(o) { return o.name === 'Lobisomem'; });

    if(indexCursed != -1){
      this.jogadores[indexCursed].dead = false;
      this.jogadores[indexCursed].job = this.classes[indexWolf];
      this.teamsUp();

    }
    
    
    // for (let index = 0; index < this.jogadores.length; index++) {
    //   this.jogadores[index].target = false;
    //   this.jogadores[index].toughTarget = false;
    //   this.jogadores[index].save = false;
    //   this.jogadores[index].crowMark = false;

    // }
    
    this.saveLocal();
  }

  open(jogador: Jogador){
    this.playerEditIndex = this.jogadores.indexOf(jogador);
    this.showPlayer = true;
    
  }

  voltar(){

    this.jogadores = _.sortBy(this.jogadores, ['dead','job.team', 'job.order','job.name']);
    this.saveLocal();
    this.showPlayer = false;
  }

  kill(){
    let quantity =0;
    let dead =0;
    for (let index = 0; index < this.jogadores.length; index++) {

      if(this.jogadores[index].job.team === 'bad' && !this.jogadores[index].dead){
        quantity++;
      }
      if(this.jogadores[index].dead){
        dead++;
      }  
    }
    this.times.lobos = quantity;
    this.times.aldeia = this.jogadores.length - dead - quantity;
    this.times.cult = this.numberCult();
  }

  nextStep(){
    this.step++;
  }

  prevStep(){
    this.step--;
  }
  toStep(n:number){
    this.step = n;
  }

  saveLocal(){
    let gameSave = {
      jogadores: this.jogadores,
      classesin: this.classesInGame,
      classes: this.classes,
      times: this.times,
      status: this.statusUseds,
      night: this.night,
    }
    if (typeof(Storage) !== "undefined") {
      
      localStorage.setItem("gameSave", JSON.stringify(gameSave));

    }
  }

  restart(){
    if (typeof(Storage) !== "undefined" && localStorage["gameSave"]) {
      // console.log(JSON.parse(localStorage.getItem("gameSave")));
      let save = JSON.parse(localStorage.getItem("gameSave"));
      this.classesInGame = save.classesin;
      this.classes = save.classes;
      this.jogadores = save.jogadores;
      this.times = save.times;
      this.statusUseds = save.status;
      this.night = save.night;
      this.jogadores = _.sortBy(this.jogadores, ['dead','job.team', 'job.order','job.name']);
      this.toStep(4);
    }else{
      console.log("No data saved");
    }

    
  }


  saveLocalFav(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(this.options));
    }
  }

  getLocalFav(){
    if (typeof(Storage) !== "undefined" && localStorage["favorites"]) {
      this.options = JSON.parse(localStorage.getItem("favorites"));
      
    }else{
      console.log("No data saved");
    }
  }

  fav(val:string){
    
      val.toLowerCase();
      val = capitalizeFirstLetter(val);
      add(this.options,val);
      this.saveLocalFav();
    
    
  }

  unfav(val:string){
    
      val.toLowerCase();
      val = capitalizeFirstLetter(val);
      remove(this.options,val);
      this.saveLocalFav();
    
    
  }

  hasName(name:string){
    let index = _.findIndex(this.options, function(o) { return o.toUpperCase() === name.toUpperCase(); });
    return index !== -1 ? true : false;  
  }

  hasNamePlayer(name:string){
    let index = _.findIndex(this.jogadores, function(o) { return o.name.toUpperCase() === name.toUpperCase(); });
    return index !== -1 ? true : false;  
  }

  addClasses(){
    
   for (let i = 0; i < this.classesInGame.length; i++) {
    this.classesForSort = _.concat(this.classesForSort,addMore(this.classesInGame[i], this.classesInGame[i].qnt));
    
   }
    
    this.classesForSort = _.pull(this.classesForSort,undefined);
    this.classesForSort = _.shuffle(this.classesForSort);
    for (let j = 0; j < this.jogadores.length; j++) {
      this.jogadores[j].job = this.classesForSort[j];
      
    }
    this.jogadores = _.sortBy(this.jogadores, ['dead','job.team', 'job.order','job.name']);
   
    this.teamsUp();
    this.saveLocal();

    this.nextStep();
  }

  
  add(classe: Classes){
    this.classes.indexOf(classe);
    let index = this.classes.indexOf(classe);
    this.classes[index].qnt++;
    this.changeBalance();
  }

  sub(classe: Classes){
    let index = this.classes.indexOf(classe);
    this.classes[index].qnt--;
    this.changeBalance();
  }

  changeBalance(){
    this.classesInGame = _.filter(this.classes, function(o) { return o.qnt >0; });
    
    let total = 0;
    let balance = 0;
    for (let i = 0; i < this.classesInGame.length; i++) {
      
      total = total+this.classesInGame[i].qnt;
      balance = balance+(this.classesInGame[i].qnt*parseInt(this.classesInGame[i].power));
    }
    
    this.times.totalClasses = total;
    this.times.balancing = balance;
    
    
  }

  // newGame(){
  //   if (typeof(Storage) !== "undefined") {
  //     // Store
  //     localStorage.setItem("players", );
  //     // Retrieve
  //     document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  //   } else {
  //     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  //   }
  // }

  filterClasses(){
    if(this.filterInGame == true && this.sortGame == true){
      let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          add(classTemp,this.jogadores[i].job);
          
        }
          
        this.classesHelp = classTemp;
        this.classesHelp =  _.filter(this.classesHelp, function(o) { return o.order < 99; });
        this.classesHelp = _.sortBy(this.classesHelp, ['order']);  
    }else if(this.filterInGame == false && this.sortGame == true){
      this.filterInGame = false;
      this.classesHelp =  _.filter(this.classesHelp, function(o) { return o.order < 99; });
      this.classesHelp = _.sortBy(this.classesHelp, ['order']);  
    }else if(this.sortGame == true){
      this.filterInGame = false;
      this.classesHelp =  _.filter(this.classesHelp, function(o) { return o.order < 99; });
      this.classesHelp = _.sortBy(this.classesHelp, ['order']);
    }else if(this.filterInGame == true){
      let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          add(classTemp,this.jogadores[i].job);
          
        }
          
        this.classesHelp = classTemp;
        this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);  
    }else{
        this.classesHelp = this.classes;
        this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);  
    }

    
    
  }

  getColor(team:String){

    if(team === "bad"){
      return "warn"
    }else if(team === "good"){
      return "primary"
    }else if(team === "neutral"){
      return "accent"
    }

  }

  attack(jogador: Jogador){
    jogador.target = !jogador.target;
  }

  changeStatus(jogador: Jogador, property){
    
    jogador[property] = !jogador[property];
    if(property == 'curePotion'){
      jogador.cureUsed = jogador.curePotion;
    }
    this.teamsUp();
    
    this.statusUsed(property);

    this.saveLocal();
  }

  statusUsed(status){
     let stat = _.countBy(this.jogadores, status);

     this.statusUseds[status] = stat.true>0 ? stat.true:0;

  }

  
}





function addMore(value, quantity){
  let array =[];
  for (let i = 0; i < quantity; i++) {
      array.push(value);
  }
  return array;
}


function add(array, value) {
  
  if (array.indexOf(value) === -1) {
    array.push(value);
  }
}

function remove(array, value) {
  var index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

