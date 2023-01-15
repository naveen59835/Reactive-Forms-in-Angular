import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { notes } from './models/notes';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  URL: string ="http://localhost:3000/notes";
  constructor(private httpClient:HttpClient) { }
  saveNotes(note: notes) {
    return this.httpClient.post<Array<notes>>(this.URL, note);
  }


}
