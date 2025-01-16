import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {PetComponent} from "./pet/pet.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "pet/:id", component: PetComponent},
  {path: "**", redirectTo: ""}
];
