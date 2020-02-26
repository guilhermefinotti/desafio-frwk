import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetalheComponent } from './album-detalhe.component';

describe('AlbumDetalheComponent', () => {
  let component: AlbumDetalheComponent;
  let fixture: ComponentFixture<AlbumDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
