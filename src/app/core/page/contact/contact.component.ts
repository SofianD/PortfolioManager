import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messages: [] = [];

  selectedMessage: object = {};

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit() {
  }

  /////////////////////////////////////////////////
  ////    SERVICE FUNCTIONS

  async getMessages() {
    try {
      (await this.contactService.getMessages()).subscribe(res => {
        this.messages = res.messages;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOneMessage(id: string) {
    try {
      (await this.contactService.getOneMessage(id)).subscribe(res => {
        this.selectedMessage = res.result;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      (await this.contactService.delete(id)).subscribe(res => {
        this.selectedMessage = res.result;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
