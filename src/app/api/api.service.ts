import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Thing} from './thing';
import {DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig} from 'angular2-jsonapi';
import {Category} from './category';

const config: DatastoreConfig = {
  baseUrl: './api/v2',
  models: {
    thing: Thing,
    category: Category
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class ApiService extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http);
  }
}
