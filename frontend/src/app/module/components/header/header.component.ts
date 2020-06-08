import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

// Just some "dummy" interface while backend data structure is being designed.
interface Selection {
  type?: any;
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public versions: Selection[] = [
    { value: "none", viewValue: "All versions" },
    { value: "0.12.6_dev", viewValue: "0.12.6 DEV" },
    { value: "0.12.6_b", viewValue: "0.12.5 B" },
    { value: "0.12.4_r2", viewValue: "0.12.4 R2" }
  ];

  public categories: Selection[] = [
    { value: "none", viewValue: "All categories" },
    { value: "server", viewValue: "Server" },
    { value: "client", viewValue: "Client" }

  ];

  public types: Selection[] = [
    { type: "none", value: "all_types", viewValue: "All types" },
    { type: "server_all", value: "all_server_types", viewValue: "All server Types" },
    { type: "server", value: "server_type1", viewValue: "Server Type 1" },
    { type: "server", value: "server_type2", viewValue: "Server Type 2" },
    { type: "client_all", value: "all_client_types", viewValue: "All client types" },
    { type: "client", value: "client_type1", viewValue: "Client Type 1" },
    { type: "client", value: "client_type2", viewValue: "Client Type 2" }
  ];

  public selectedVersion: Selection = this.versions[0];
  public selectedCategory: Selection = this.categories[0];
  public selectedType: Selection = this.types[0];


  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCategories().subscribe(data => {
      console.log(data);
    });
  }

  public selectVersion(val: string): void {
    this.selectedVersion = this.versions.filter(v => v.value === val)[0];
    console.log(`Changed selected version to ${this.selectedVersion.viewValue}`)
  }

  public selectCategory(val: string): void {
    this.selectedCategory = this.categories.filter(c => c.value === val)[0];
    console.log(`Changed selected version to ${this.selectedCategory.viewValue}`)

    // Force types list refresh, as they're not all the same for client and server mods.
    this.selectType(this.types.filter(t => t.type.includes(this.selectedCategory.value))[0].value);
  }

  public selectType(val: string): void {
    this.selectedType = this.types.filter(t => t.value === val)[0];
    console.log(`Changed selected type to ${this.selectedType.viewValue}`)
  }
}
