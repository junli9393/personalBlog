
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'Contact Me';
  emailForm: FormGroup;
  customer: any;
  message: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customer = {
      firstName: '',
      conteny: ''
    };

    this.emailForm = this.formBuilder.group({
      firstName: [this.customer.firstName, Validators.required ],
      content: [this.customer.content, Validators.required ]
    });
  }

  onSubmit(form: FormGroup) {
    this.message =  'Hi ' + form.controls.firstName.value + ', your email is sent successfully!';
  }
}
