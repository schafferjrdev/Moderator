import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Moderator';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'wolf_head',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wolf_head.svg'));
    iconRegistry.addSvgIcon(
        'rings',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linked-rings.svg'));
    iconRegistry.addSvgIcon(
          'death',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hasty-grave.svg'));
    iconRegistry.addSvgIcon(
          'shield',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/slashed-shield.svg'));
        iconRegistry.addSvgIcon(
          'atk',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/claw.svg'));
        iconRegistry.addSvgIcon(
          'werewolf',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/werewolf.svg'));
        iconRegistry.addSvgIcon(
          'villager',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/farmer.svg'));
        iconRegistry.addSvgIcon(
          'grave',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/grave.svg'));
        iconRegistry.addSvgIcon(
          'voodoo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/voodoo.svg'));
        iconRegistry.addSvgIcon(
          'target-dummy',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/target-dummy.svg'));
        iconRegistry.addSvgIcon(
          'target-human',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/human-target.svg'));
        iconRegistry.addSvgIcon(
          'venom',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/poison-bottle.svg'));
        iconRegistry.addSvgIcon(
          'cure',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/heart-bottle.svg'));
        iconRegistry.addSvgIcon(
          'white-wolf',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/werewolf-white.svg'));
        iconRegistry.addSvgIcon(
          'hood',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cowled.svg'));
        iconRegistry.addSvgIcon(
          'elder-sign',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/flexible-star.svg'));
        iconRegistry.addSvgIcon(
          'feather',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg'));
        iconRegistry.addSvgIcon(
          'paw',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/paw.svg'));
        iconRegistry.addSvgIcon(
          'fox-tail',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fox-tail.svg'));
        iconRegistry.addSvgIcon(
          'double-claw',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/double-claw.svg'));
        iconRegistry.addSvgIcon(
          'day',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sunrise.svg'));
        iconRegistry.addSvgIcon(
          'night',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night-sky.svg'));
        iconRegistry.addSvgIcon(
          'eliminate',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/tombstone.svg'));
        iconRegistry.addSvgIcon(
          'vote',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gibbet.svg'));

        iconRegistry.addSvgIcon(
          'grave1',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-grave-1.svg'));
        iconRegistry.addSvgIcon(
          'grave2',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-grave-2.svg'));
        iconRegistry.addSvgIcon(
          'grave3',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-grave-3.svg'));
        iconRegistry.addSvgIcon(
          'revive',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/revive.svg'));
        
        iconRegistry.addSvgIcon(
          'amaldicoado',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/amaldicoado.svg'));
        iconRegistry.addSvgIcon(
          'aldeao',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/aldeao.svg'));
        iconRegistry.addSvgIcon(
          'bruxa',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/bruxa.svg'));
        iconRegistry.addSvgIcon(
          'cacador',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/cacador.svg'));
        iconRegistry.addSvgIcon(
          'corvo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/corvo.svg'));
        iconRegistry.addSvgIcon(
          'cupido',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/cupido.svg'));
        iconRegistry.addSvgIcon(
          'gigante',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/gigante.svg'));
        iconRegistry.addSvgIcon(
          'guardiao',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/guardiao.svg'));
        iconRegistry.addSvgIcon(
          'leprechaun',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/leprechaun.svg'));
        iconRegistry.addSvgIcon(
          'licano',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/licano.svg'));
        iconRegistry.addSvgIcon(
          'liderdoculto',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/liderdoculto.svg'));
        iconRegistry.addSvgIcon(
          'lobinho',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/lobinho.svg'));
        iconRegistry.addSvgIcon(
          'lobisomem',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/lobisomem.svg'));
        iconRegistry.addSvgIcon(
          'lobo-mau',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/lobo-mau.svg'));
        iconRegistry.addSvgIcon(
          'lupino',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/lupino.svg'));
        iconRegistry.addSvgIcon(
          'macom',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/macom.svg'));
        iconRegistry.addSvgIcon(
          'principe',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/principe.svg'));
        iconRegistry.addSvgIcon(
          'raposa',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/raposa.svg'));
        iconRegistry.addSvgIcon(
          'urso',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/urso.svg'));
        iconRegistry.addSvgIcon(
          'vidente',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/vidente.svg'));
        iconRegistry.addSvgIcon(
          'cao',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/cao.svg'));
        iconRegistry.addSvgIcon(
          'feiticeira',
        sanitizer.bypassSecurityTrustResourceUrl('assets/players/feiticeira.svg'));
       
  }
}
