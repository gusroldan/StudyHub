import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarMensajePage } from './enviar-mensaje.page';

describe('EnviarMensajePage', () => {
  let component: EnviarMensajePage;
  let fixture: ComponentFixture<EnviarMensajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarMensajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
