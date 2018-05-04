import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact.component';
import { WorldmapComponent } from './worldmap.component';
import { BlogComponent } from './blog.component';
import { HomeComponent} from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogdetailComponent } from './blogdetail.component';
import {DataService} from './data.service';
import {IotService} from './iot.service';
import {ChatComponent} from './chat.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatButtonToggleModule, MatIconModule } from '@angular/material';
// import {ChatModule} from './chat/chat.module';
import {SharedModule} from './shared/shared.module';
import {SocketService} from './chat/shared/services/socket.service';
import {DialogUserComponent} from './chat/dialog-user/dialog-user.component';
import {ChatDesignComponent} from './chatDesign.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    // DemoComponent,
    WorldmapComponent,
    BlogComponent,
    HomeComponent,
    BlogdetailComponent,
    ChatComponent,
    DialogUserComponent,
    ChatDesignComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ChatModule,
    SharedModule
  ],
  providers: [
    DataService,
    IotService,
    SocketService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogUserComponent]
})
export class AppModule {
}

