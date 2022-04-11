import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { CardComponent } from './components/card/card.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [HeaderComponent, MainComponent, CardComponent],
  imports: [CommonModule, NzSpinModule],
  exports: [HeaderComponent, MainComponent, CardComponent],
})
export class SharedModule {}
