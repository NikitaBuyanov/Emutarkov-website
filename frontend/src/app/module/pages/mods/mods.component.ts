import { Component, OnInit } from '@angular/core';
import { Mod } from 'src/app/shared/models/mod';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.scss']
})
export class ModsComponent implements OnInit {
  mods: Mod[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getMods();
  }

  private getMods(): void {
    this.httpService.getMods().subscribe(data => this.mods = data);
  }

}
