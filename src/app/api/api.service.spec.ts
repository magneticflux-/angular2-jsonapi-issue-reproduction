import {inject, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Thing} from './thing';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should request at the correct endpoint',
    inject([HttpTestingController, ApiService], (http: HttpTestingController, api: ApiService) => {
      api.findAll(Thing, {include: 'categories.members'}).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = http.expectOne('./api/v2/thing?include=categories.members');
      request.flush(sampleData);
    }));

  it('should parse one thing',
    inject([HttpTestingController, ApiService], (http: HttpTestingController, api: ApiService) => {
      api.findAll(Thing, {include: 'categories.members'}).subscribe((response) => {
        expect(response.getModels().length).toBe(1);
      });

      const request = http.expectOne('./api/v2/thing?include=categories.members');
      request.flush(sampleData);
    }));

  it('should parse 1 category',
    inject([HttpTestingController, ApiService], (http: HttpTestingController, api: ApiService) => {
      api.findAll(Thing, {include: 'categories.members'}).subscribe((response) => {
        expect(response.getModels()[0].categories.length).toBe(1);
      });

      const request = http.expectOne('./api/v2/thing?include=categories.members');
      request.flush(sampleData);
    }));

  it('should parse 1 category that has one member',
    inject([HttpTestingController, ApiService], (http: HttpTestingController, api: ApiService) => {
      api.findAll(Thing, {include: 'categories.members'}).subscribe((response) => {
        response.getModels()[0].categories.forEach((category) => {
          expect(category.members.length).toBe(1, `Failing category: ${category.id}`);
        });
      });

      const request = http.expectOne('./api/v2/thing?include=categories.members');
      request.flush(sampleData);
    }));
});

const sampleData = {
  data: [
    {
      id: 'thing_1',
      type: 'thing',
      attributes: {
        name: 'Thing One'
      },
      relationships: {
        categories: {
          data: [
            {
              id: 'category_1',
              type: 'category'
            }
          ]
        }
      }
    }
  ],
  included: [
    {
      id: 'category_1',
      type: 'category',
      relationships: {
        members: {
          data: [
            {
              id: 'thing_1',
              type: 'thing'
            }
          ]
        }
      }
    },
  ]
};

