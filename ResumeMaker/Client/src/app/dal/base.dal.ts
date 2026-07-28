import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class BaseDal {
  protected readonly API_URL = 'http://localhost:5038/api';

  protected httpClient = inject(HttpClient);
}
