import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  stringText: string="hi there ";

  constructor(private dataService: ServiceService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getStringText().subscribe(
      (result: string) => {
        this.stringText = result;
        console.log('String text:', result);
      },
      (error) => {
        console.error('Error fetching string text:', error);
      }
    );
  }
}
