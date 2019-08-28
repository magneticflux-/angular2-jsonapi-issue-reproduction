import {Attribute, HasMany, JsonApiModel, JsonApiModelConfig} from 'angular2-jsonapi';
import {Category} from './category';

@JsonApiModelConfig({
  type: 'thing'
})
export class Thing extends JsonApiModel {
  @Attribute()
  name: string;

  @HasMany()
  categories: Category[];
}
