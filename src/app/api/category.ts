import {HasMany, JsonApiModel, JsonApiModelConfig} from 'angular2-jsonapi';
import {Thing} from './thing';

@JsonApiModelConfig({
  type: 'category'
})
export class Category extends JsonApiModel {
  @HasMany()
  members: Thing[];
}
