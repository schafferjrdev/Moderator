import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { MatSnackBar } from "@angular/material";

import _ from "lodash";



export class Jogador {
  name: string;
  job: Classes;
  lynch:boolean = false;
  target: boolean = false;
  toughTarget: boolean = false;
  attacked: boolean = false;
  love: boolean = false;
  save: boolean = false;
  saved: boolean = false;
  enchant: boolean = false;
  dead: boolean = false;
  curePotion: boolean = false;
  cureUsed: boolean = false;
  deathPotion: boolean = false;
  deathUsed: boolean = false;
  crowMark: boolean = false;
  spell: boolean = false;
  foxPower: boolean = false;
  buddy: boolean = false;
  mason: boolean = false;
  psycho: boolean = false;
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
  spell: number = 0;
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
  id: string;
  first: boolean;
  oneTime: boolean;
  skills: string[];
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {

  tutorial: boolean = true;
  tutorialScreen: number = 0;

  showPlayer: boolean = false;
  filterInGame: boolean = false;
  sortGame: boolean = false;
  hasData: boolean = localStorage["gameSave"];
  step: number = 0;
  night:boolean = true;
  showDead:boolean = false;
  showDeadFlag :boolean = true;
  orderFlag :boolean = false;

  playerEditIndex: number =0;
  myControl = new FormControl();
  options: string[] = [];
  nameOfDead: string[] = [];

  firstNight: boolean = true;
  secondNight: boolean = false;

  jogador: Jogador = new Jogador();
  jogadores: Jogador[] = [];
  jogadoresFilter: Jogador[] = [];

  classesForSort: Classes[];

  statusUseds: Status = new Status();

  
  // skills = ['atk','shield'];

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
      order: 5,
      qnt:0,
      icon:'lobisomem',
      id:'lobisomem',
      first: true,
      oneTime: false,
      skills: ['atk']
    },
    {
      name: 'Cachorro', 
      desc: 'Na primeira noite escolhe outra pessoa para ser seu companheiro, se essa pessoa morrer, você morre. No resto das noites joga pelos lobos. ',
      team: 'bad',
      power: '-4',
      order: 0,
      qnt:0,
      icon:'cao',
      id:'cachorro',
      first: true,
      oneTime: true,
      skills: ['atk','paw']
    },
    {
      name: 'Aldeão', 
      desc: 'Não tem poderes especiais',
      team: 'good',
      power: '+1',
      order: 100,
      qnt:0,
      icon:'aldeao',
      id:'aldeao',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Guardião', 
      desc: 'Toda noite protege uma pessoa de ataque de lobo. Não pode escolher a mesma pessoas duas vezes seguidas.',
      team: 'good',
      power: '+3',
      order: 4,
      qnt:0,
      icon:'guardiao',
      id:'guardiao',
      first: false,
      oneTime: false,
      skills: ['shield']
    },
    {
      name: 'Vidente', 
      desc: 'Toda noite a vidente escolhe alguem e consulta as entidades para saber se tal pessoa é ou não lobo',
      team: 'good',
      power: '+7',
      order: 2,
      qnt:0,
      icon:'vidente',
      id:'vidente',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Feiticeira', 
      desc: 'Toda noite você tentará adivinhar quem é a vidente, você vence com os lobos.',
      team: 'bad',
      power: '-3',
      order: 3,
      qnt:0,
      icon:'feiticeira',
      id:'feiticeira',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Bruxa', 
      desc: 'Tem duas poções que podem ser usadas uma vez durante o jogo, com a cura ela sabe quem foi atacado a noite e salva, e com o veneno ela elimina um jogador.',
      team: 'good',
      power: '+4',
      order: 8,
      qnt:0,
      icon:'bruxa',
      id:'bruxa',
      first: false,
      oneTime: false,
      skills: ['cure','venom']
    },
    {
      name: 'Licano', 
      desc: 'Ele confunde o vidente aparecendo na vidência como se fosse Lobo, porém ele joga sempre pela vila.',
      team: 'good',
      power: '-1',
      order: 100,
      qnt:0,
      icon:'licano',
      id:'licano',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Amaldiçoado', 
      desc: 'Luta pela vila, mas caso seja atacado pelos Lobos, se junta a eles e se torna um Lobisomem.',
      team: 'good',
      power: '-3',
      order: 100,
      qnt:0,
      icon:'amaldicoado',
      id:'amaldicoado',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Gigante', 
      desc: 'Precisa de dois ataques de lobo para morrer',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'gigante',
      id:'gigante',
      first: false,
      oneTime: false,
      skills: ['double-claw']
    },
    {
      name: 'Caçador', 
      desc: 'Se morrer em algum momento ele escolhe alguém pra matar, sem influencia da vila. (Se morrer de dia todo mundo sabe, se for de noite fica secreto',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'cacador',
      id:'cacador',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Maçom', 
      desc: 'Se reconhecem na primeira noite. Se alguém falar sobre, o moderador mata a pessoa durante a noite.',
      team: 'good',
      power: '+2',
      order: 0,
      qnt:0,
      icon:'macom',
      id:'macom',
      first: true,
      oneTime: true,
      skills: ['masonry']
    },
    {
      name: 'Príncipe', 
      desc: 'Não pode ser linchado',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'principe',
      id:'principe',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Lupino', 
      desc: 'É lobo, mas parece um aldeão para o vidente',
      team: 'bad',
      power: '-9',
      order: 100,
      qnt:0,
      icon:'lupino',
      id:'lupino',
      first: true,
      oneTime: false,
      skills: ['atk']
    },
    {
      name: 'Lobinho', 
      desc: 'Se ele morrer, na próxima noite os lobos matam 2.',
      team: 'bad',
      power: '-8',
      order: 100,
      qnt:0,
      icon:'lobinho',
      id:'lobinho',
      first: true,
      oneTime: false,
      skills: ['atk']
    },
    {
      name: 'Lobo Mau', 
      desc: 'Durante a noite, acorda mais uma vez sozinho escolhe um jogador adjacente ao alvo para morrer também.',
      team: 'bad',
      power: '-9',
      order: 6,
      qnt:0,
      icon:'lobo-mau',
      id:'lobomau',
      first: false,
      oneTime: false,
      skills: ['atk']
    },
    {
      name: 'Psicopata', 
      desc: 'Durante a noite escolhe um jogador para morrer, ele não morre com ataque de lobo. Não vence o jogo e nem perde, só cria caos.',
      team: 'neutral',
      power: '-3',
      order: 6.5,
      qnt:0,
      icon:'psicopata',
      id:'psicopata',
      first: false,
      oneTime: false,
      skills: ['knife']
    },
    {
      name: 'Cupido', 
      desc: 'No começo do jogo, ele escolhe duas pessoas para se apaixonarem. A partir dai, essas duas pessoas jogam juntas, mas não sabem o que a outra pessoa é. Se uma morrer, a outra morre automaticamente.',
      team: 'good',
      power: '-3',
      order: 0,
      qnt:0,
      icon:'cupido',
      id:'cupido',
      first: true,
      oneTime: true,
      skills: ['rings']
    },
    {
      name: 'Urso', 
      desc: 'Se de dia um lobo estiver ao lado dele o moderador diz "Urso sente cheiro de lobo". Quando um do lado dele morre, então o próximo é o novo vizinho dele.',
      team: 'good',
      power: '+3',
      order: 100,
      qnt:0,
      icon:'urso',
      id:'urso',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Raposa', 
      desc: 'Escolhe 3 pessoas, se tiver um lobo entre eles o moderador indica positivamente, mas se não tiver a raposa perde seus poderes até o fim do jogo.',
      team: 'good',
      power: '+3',
      order: 3,
      qnt:0,
      icon:'raposa',
      id:'raposa',
      first: false,
      oneTime: false,
      skills: ['fox-tail']
    },
    {
      name: 'Corvo', 
      desc: 'Escolhe um jogador para começar com 2 votos de dia.',
      team: 'good',
      power: '+2',
      order: 1,
      qnt:0,
      icon:'corvo',
      id:'corvo',
      first: false,
      oneTime: false,
      skills: ['feather']
    },
    {
      name: 'Mago', 
      desc: 'Escolhe um jogador que não pode falar nada durante o próximo dia.',
      team: 'good',
      power: '+2',
      order: 1,
      qnt:0,
      icon:'mago',
      id:'mago',
      first: false,
      oneTime: false,
      skills: ['spell']
    },
    {
      name: 'Leprechaun', 
      desc: 'Redireciona o ataque de um lobo para um alvo adjacente ao atacado.',
      team: 'good',
      power: '+5',
      order: 7,
      qnt:0,
      icon: 'leprechaun',
      id: 'leprechaun',
      first: false,
      oneTime: false,
      skills: []
    },
    {
      name: 'Lider do Culto', 
      desc: 'Toda noite ele converte uma pessoa para seu culto e se todos os vivos estiverem no culto ele ganha o jogo sozinho. (Opcional) Depois de converter, o moderador manda toda noite quem está convertido abrir o olho e se reconhecerem, assim todos sabem se está ficando perto ou não.',
      team: 'neutral',
      power: '+1',
      order: 9,
      qnt:0,
      icon: 'liderdoculto',
      id: 'liderdoculto',
      first: false,
      oneTime: false,
      skills: ['elder-sign']
    }
  ];
  classesHelp: Classes[] = this.classes;
  classesInGame: Classes[] = this.classes;
  
  
  constructor(private snackBar: MatSnackBar) {

    
    
    this.classes = _.sortBy(this.classes, ['team', 'power']);  
    this.classesHelp = _.sortBy(this.classesHelp, ['team', 'power']);
    this.classesInGame = _.pull(this.classesInGame,undefined);
    this.classesInGame = _.shuffle(this.classesInGame);
    this.getLocalFav();
    this.getLocalTutorial();
    
    // var pulled = _.pullAt(array, 0);
    // console.log(this.classesInGame);
    
    
  }

  ngOnInit() {
    
  }

  save(jogador: Jogador) {
    document.getElementById('input-player-name').focus();
    if(jogador.name !== undefined){
      if(jogador.name.trim() != "" && !this.hasNamePlayer(jogador.name.trim())){
        let index = _.findIndex(this.classes, { 'id': 'aldeao' });
        
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

    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 

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

  showHideDead(){
    this.showDeadFlag = !this.showDeadFlag;
    this.filterDead();
  }

  showOrder(){
    this.filterOrder();
    
    this.orderFlag = !this.orderFlag;
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
    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 

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
    if(this.hasClass('liderdoculto')){
      this.jogadores[_.findIndex(this.jogadores, function(o) { return o.job.id === 'liderdoculto'; })].enchant = true;
    }
       this.times.cult = this.numberCult();
  }

  numberCult(){
    
    let cultAlive = _.filter(this.jogadores, function(o) { return o.dead === false; });
    return _.countBy(cultAlive, 'enchant').true > 0 ? _.countBy(cultAlive, 'enchant').true : 0 ;

  }

  hasClass(className:string){
    let index = _.findIndex(this.jogadores, function(o) { return o.job.id == className; });
    return index !== -1 ? true : false;  
  }

  manyClass(className:string){
    let many = _.filter(this.jogadores, function(o) { return o.job.id == className; });
    return many.length;
  }

  hasClassArray(className:string, array){
    let index = _.findIndex(array, function(o) { return o.job.id == className; });
    return index !== -1 ? true : false;  
  }

  playerWithStatus(stat:string, array, type:boolean){
    let playerWithStatus = _.filter(array, function(o) { return o[stat] == type; });
    
    return playerWithStatus;
  }
  playerWithClass(classe:string, array){
    let playerWithClass = _.filter(array, function(o) { return o.job.id == classe; });
    
    return playerWithClass;
  }

  playerWithClassAndStatusTrue(classe:string, array,stat:string){
    let playerWithClassAndStatus = _.filter(array, function(o) { return o.job.id == classe; });
    let index = _.findIndex(playerWithClassAndStatus, function(o) { return o[stat] == true; });
    return index !== -1 ? true : false;
  }

  atLastOne(classe:string,array,stat:string){
    let playerWithClassAndStatus = _.filter(array, function(o) { return o.job.id == classe; });
    let playersWithTrue = _.filter(playerWithClassAndStatus, function(o) { return o[stat] == false; });
    
    return playersWithTrue.length > 0 ? true : false;
  }

  

  statusTrue(stat:string, array){
    let index = _.findIndex(array, function(o) { return o[stat] == true; });
    
    return index !== -1 ? true : false;
  }

  changeAllStatus(stat:string, array, type){
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

  exit(){
    this.hasData = localStorage["gameSave"];
    this.resetGame();
    this.toStep(1);
  }

  resetMatch(){
    this.softReset();
  }

  resetGame(){
    this.jogador = new Jogador();
    this.classesInGame =[];
    this.jogadores = [];
    this.showPlayer = false;
    this.filterInGame = false;
    this.sortGame = false;
    this.night = true;
    this.showDead = false;
    this.playerEditIndex =0;
    this.options = [];
    this.jogadores = [];
    this.showDeadFlag = false;
    this.firstNight = true;


    this.classesForSort = [];

    this.statusUseds = new Status();
    this.showDeadFlag = true;

    this.times.aldeia = 0;
    this.times.lobos = 0;
    this.times.cult = 0;
    this.times.balancing = 0;
    this.times.totalClasses = 0;

    this.changeAllStatus('qnt', this.classes, 0);


  }

  softReset(){
   
    this.showPlayer = false;
    this.firstNight = true;
    this.night = true;
    this.playerEditIndex =0;
    this.statusUseds= new Status();

    this.changeAllStatus('target', this.jogadores, false);
    this.changeAllStatus('toughTarget', this.jogadores, false);
    this.changeAllStatus('attacked', this.jogadores, false);
    this.changeAllStatus('love', this.jogadores, false);
    this.changeAllStatus('save', this.jogadores, false);
    this.changeAllStatus('saved', this.jogadores, false);
    this.changeAllStatus('enchant', this.jogadores, false);
    this.changeAllStatus('curePotion', this.jogadores, false);
    this.changeAllStatus('cureUsed', this.jogadores, false);
    this.changeAllStatus('deathPotion', this.jogadores, false);
    this.changeAllStatus('deathUsed', this.jogadores, false);
    this.changeAllStatus('crowMark', this.jogadores, false);
    this.changeAllStatus('spell', this.jogadores, false);
    this.changeAllStatus('foxPower', this.jogadores, false);
    this.changeAllStatus('buddy', this.jogadores, false);
    this.changeAllStatus('dead', this.jogadores, false);
    this.changeAllStatus('lynch', this.jogadores, false);
    this.changeAllStatus('psycho', this.jogadores, false);
    this.changeAllStatus('mason', this.jogadores, false);

    this.teamsUp();
    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
    this.saveLocal();
  }

  openSnackBar(message: string) {
    const snackBarRef = this.snackBar.open(message, "Ok", {
       duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if(this.nameOfDead.length>0){
        this.talkTheNames();
      }
      
    });
    
 } 

  show(){
    console.log("teste");
  }

  dayPass(){
    let playerAlive = _.filter(this.jogadores, function(o){return o.dead === false; });
    this.changeStatusWhereMinus('target', this.jogadores, playerAlive, false, 'gigante');
    this.changeStatusWhere('toughTarget', this.jogadores, playerAlive, false);
    this.changeStatusWhere('save', this.jogadores, playerAlive, false);
    this.changeStatusWhere('curePotion', this.jogadores, playerAlive, false);
    this.changeStatusWhere('lynch', this.jogadores, playerAlive, false);
    this.changeStatusWhere('psycho', this.jogadores, playerAlive, false);
    this.night = !this.night;

    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
    
    this.saveLocal();
  }

  eliminate(){
    this.nameOfDead = [];
    this.changeAllStatus('saved',this.jogadores,false);
    let playerAttacked = _.filter(this.jogadores, function(o){return o.target === true && o.job.id !== 'gigante'; });
    playerAttacked = _.filter(playerAttacked, function(o){return o.target === true && o.job.id !== 'amaldicoado' ; });
    playerAttacked = _.filter(playerAttacked, function(o){return o.target === true && o.job.id !== 'psicopata' ; });
    let indexGiantWound = _.findIndex(this.jogadores, function(o) { return o.job.id === 'gigante' && o.target === true && o.save === false && o.curePotion === false; });
    let indexCursedWound = _.findIndex(this.jogadores, function(o) { return o.job.id === 'amaldicoado' && o.target === true && o.save === false && o.curePotion === false; });
    let saved = _.filter(this.jogadores, function(o) { return o.save === true; });
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.lynch === true && o.job.id !== 'principe'; }));
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.deathPotion === true; }));
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.psycho === true; }));
    
    playerAttacked = _.concat(playerAttacked,_.filter(this.jogadores, function(o){return o.toughTarget === true; }));
    playerAttacked = _.uniqBy(playerAttacked, 'name');

    let playerNotSaved = _.filter(playerAttacked, function(o){return o.save === false; });
    playerNotSaved = _.filter(playerNotSaved, function(o){return o.curePotion === false; });
    playerNotSaved = _.concat(playerNotSaved,_.filter(this.jogadores, function(o){return o.mason === true; }));
    playerNotSaved = _.uniqBy(playerNotSaved, 'name');
    
    if(saved.length>0){
      // this.jogadores[saved].saved = true;
      this.changeStatusWhere("saved",this.jogadores,saved,true);
    }

    if(indexGiantWound != -1){
      this.jogadores[indexGiantWound].attacked = true;
    }
    if(indexCursedWound != -1){
      this.jogadores[indexCursedWound].attacked = true;
      // this.openSnackBar("Um novo lobisomem surge!");
      this.nameOfDead.push("Um novo lobisomem surge!");
    }

    
    
    

    let lovers; 
    if(this.statusTrue('love',playerNotSaved)){
      lovers = this.playerWithStatus('love',this.jogadores,true);
      playerNotSaved = _.concat(playerNotSaved,lovers);
      playerNotSaved = _.uniqBy(playerNotSaved, 'id');
      // this.openSnackBar("O casal morreu!");
      
      if(this.playerWithStatus('dead',lovers,false).length > 0){
        this.nameOfDead.push("O casal morreu!");
      }
    }

    let buddy;
    if(this.statusTrue('buddy',playerNotSaved)){
      buddy = this.playerWithClass('cachorro',this.jogadores)
      playerNotSaved = _.concat(playerNotSaved,buddy);
      playerNotSaved = _.uniqBy(playerNotSaved, 'id');
      // this.openSnackBar("O cachorro morreu!");

      if(!this.playerWithClassAndStatusTrue("cachorro",playerNotSaved,'dead')){
        this.nameOfDead.push("O cachorro morreu!");

      }
      
      

    }

    
    
    playerNotSaved = this.playerWithStatus('dead',playerNotSaved,false);
    // this.nameOfDead = [];
    // if(playerNotSaved.length>0){
    //   for (let i = 0; i < playerNotSaved.length; i++) {
    //     this.nameOfDead.push(playerNotSaved[i].name);
      
    //   }
    // }
    // this.talkTheNames();
    if(this.hasClassArray('lobinho',playerNotSaved)){
        let cubs = this.playerWithClass('lobinho',playerNotSaved);
        
      if(this.statusTrue('lynch',cubs)){
        // this.openSnackBar("Na noite os lobos podem matar 2!");
        this.nameOfDead.push("Na noite os lobos podem matar 2!");

      }
      
    }

    
    
    
    this.changeStatusWhere("dead",this.jogadores,playerNotSaved,true);

    if(playerNotSaved.length ==0){
      if(this.night){
        this.nameOfDead.push("Ninguém morreu nessa noite!");

      }else{
        this.nameOfDead.push("Ninguém morreu nesse dia!");

      }
    }

    if(this.hasClassArray('cacador',playerNotSaved)){
      // this.openSnackBar("Caçador deve matar alguém!");
      this.nameOfDead.push("Caçador deve matar alguém!");

    }
   
    console.log(this.nameOfDead);
    this.talkTheNames();
    
   

    let playerAlive = _.filter(this.jogadores, function(o){return o.dead === false; });
    let giantAttacked = _.findIndex(this.jogadores, function(o) { return o.job.id === 'gigante' && o.attacked === true; });
    if(giantAttacked != -1){
      this.changeStatusWhereMinus('target', this.jogadores, playerAlive, false, 'gigante');
      
    }else{
      this.changeStatusWhere('target', this.jogadores, playerAlive, false);
    }
   
    this.changeStatusWhere('toughTarget', this.jogadores, playerAlive, false);
    this.changeStatusWhere('save', this.jogadores, playerAlive, false);
    this.changeStatusWhere('crowMark', this.jogadores, playerAlive, false);
    this.changeStatusWhere('spell', this.jogadores, playerAlive, false);
    this.changeStatusWhere('curePotion', this.jogadores, playerAlive, false);
    this.changeStatusWhere('deathPotion', this.jogadores, playerAlive, false);
    this.changeStatusWhere('lynch', this.jogadores, playerAlive, false);
    this.changeStatusWhere('psycho', this.jogadores, playerAlive, false);
    this.changeStatusWhere('mason', this.jogadores, playerAlive, false);


    
    let indexCursed = _.findIndex(this.jogadores, function(o) { return o.job.id === 'amaldicoado' && o.attacked === true; });
    
    let indexWolf = _.findIndex(this.classes, function(o) { return o.id === 'lobisomem'; });

    if(indexCursed != -1){
      
      this.jogadores[indexCursed].job = this.classes[indexWolf];
      this.teamsUp();

    }
    
    
    // for (let index = 0; index < this.jogadores.length; index++) {
    //   this.jogadores[index].target = false;
    //   this.jogadores[index].toughTarget = false;
    //   this.jogadores[index].save = false;
    //   this.jogadores[index].crowMark = false;

    // }
    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
    this.saveLocal();
    
  }

  // talkTheNames(){
  //   if(this.nameOfDead.length > 0){
  //     let frase ="";
  //     if(this.nameOfDead.length == 1){
  //       frase = this.nameOfDead[0]+" morreu!";
  //     }else if(this.nameOfDead.length == 2){
  //       frase = this.nameOfDead[0]+" e "+this.nameOfDead[1]+" morreram!";
  //     }else if(this.nameOfDead.length > 2){
  //       for (let i = 0; i < this.nameOfDead.length-1; i++) {
        
  //         frase = this.nameOfDead[i]+", "+frase;
          
  //       }
  //       frase = frase+" e "+this.nameOfDead[this.nameOfDead.length-1]+" morreram!";

  //     }

      
  //     this.openSnackBar(frase);
      
  //   }
    
  // }

    talkTheNames(){
    if(this.nameOfDead.length > 0){
           
      this.openSnackBar(this.nameOfDead.pop());
      
    }
    
  }

  
  

  open(jogador: Jogador){
    this.playerEditIndex = this.jogadores.indexOf(jogador);
    this.showPlayer = true;
    
  }

  voltar(){

    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
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

  

  nextTutorial(){
    if(this.tutorialScreen<3){
      if(this.tutorialScreen == 2){
        this.tutorial = false;
        this.saveLocalTutorial();
      }else{
        this.tutorialScreen++;
      }
    }
    console.log(this.tutorialScreen);
  }
  prevTutorial(){
    if(this.tutorialScreen>0){
      this.tutorialScreen--;
    }
    console.log(this.tutorialScreen);
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
      showDead: this.showDeadFlag,
      firstNight: this.firstNight
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
      this.showDeadFlag = save.showDead;
      this.firstNight = save.firstNight;
      this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
      this.toStep(4);
    }else{
      console.log("No data saved");
    }

    
  }

  saveLocalTutorial(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("tutorial", JSON.stringify(this.tutorial));
    }
  }

  getLocalTutorial(){
    if (typeof(Storage) !== "undefined" && localStorage["tutorial"]) {
      this.tutorial = JSON.parse(localStorage.getItem("tutorial"));
      
    }else{
      console.log("No data tutorial saved");
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
    this.jogadores = _.sortBy(this.jogadores, ['job.order']); 
   
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

   filterDead(){
    if(this.showDeadFlag === false){
      this.jogadoresFilter = this.jogadores;
      this.jogadores =  _.filter(this.jogadores, function(o) { return o.dead == false; });
    }else{
      this.jogadores = this.jogadoresFilter;
    }
  }

  filterOrder(){
    this.firstNightCheck();
    let classTemp=[];
      
        for (let i = 0; i < this.jogadores.length; i++) {
          
          
          add(classTemp,this.jogadores[i].job);
          
          
          
        }
        let indexWolf = _.findIndex(this.classes, { 'id': 'lobisomem' });
        
        
          
        this.classesHelp = classTemp;
        this.classesHelp =  _.filter(this.classesHelp, function(o) { return o.order < 99; });
        let wolfpack = this.times.lobos;

        if(this.hasClass('feiticeira') && this.atLastOne('feiticeira',this.jogadores,'dead')){
         wolfpack--;
        }
        if(wolfpack > 0){
         
        this.classesHelp = _.concat(this.classesHelp,this.classes[indexWolf]);
        
          
        }
        
        
        
        this.classesHelp = _.sortBy(this.classesHelp, ['order']);
        this.classesHelp = _.uniqBy(this.classesHelp, 'id');
  }

  firstNightCheck(){
    if(this.statusUseds.buddy>0 && this.statusUseds.love>1){
      this.firstNight = false;
    }else{
      this.firstNight = true;
    }
    
  }

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

