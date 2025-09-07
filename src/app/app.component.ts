import { Component } from '@angular/core';

/**
 * Root component of the myFlix Angular application
 * This is the main entry point component that serves as the application shell
 */
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Application title displayed in the browser tab */
  title = 'myFlix-Angular-client';
}