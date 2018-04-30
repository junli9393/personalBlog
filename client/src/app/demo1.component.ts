//
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {IotService} from './iot.service';
//
// @Component({
//   selector: 'app-demo',
//   templateUrl: './demo.component.html'
// })
// export class DemoComponent implements OnInit {
//   title = 'Contact Me';
//   emailForm: FormGroup;
//   customer: any;
//   message: string;
//   constructor(private formBuilder: FormBuilder, private iotService: IotService) { }
//   text_display: string;
//   text = this.iotService.getAllCats().subscribe(data => this.text_display = data);
//   ngOnInit() {
//     this.customer = {
//       firstName: '',
//       conteny: ''
//     };
//
//     this.emailForm = this.formBuilder.group({
//       firstName: [this.customer.firstName, Validators.required ],
//       content: [this.customer.content, Validators.required ]
//     });
//
//   }
//
// }
