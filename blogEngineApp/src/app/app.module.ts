import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewPostComponent } from './new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    PostsDashboardComponent,
    NewPostComponent
  ],
  imports: [
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule
  ],
  providers: [],
  entryComponents: [NewPostComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
