import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { IFilm } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public films!: IFilm[];
  public randomFilm!: IFilm;

  constructor(
    private filmService: FilmService,
  ) { }

  async ngOnInit() {
    this.films = await lastValueFrom(this.filmService.getFilmWithoutRating());
  }



  public generateRandomFilm() {
    let rand = Math.floor(Math.random() * this.films.length);
    this.randomFilm = this.films[rand];
  }

}
