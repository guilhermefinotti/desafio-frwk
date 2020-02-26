import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumListaComponent } from './album-lista.component';


describe('AlbumListaComponent', () => {
  let component: AlbumListaComponent;
  let fixture: ComponentFixture<AlbumListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
