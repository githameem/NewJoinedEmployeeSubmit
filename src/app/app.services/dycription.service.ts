import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class DycriptionService {
  private key: string = '9BKlCcKTWtU+uILw+yOqMg==';

  constructor() {}

  DycrptToId(cypherText: string): string {
    let original = "";
    for (const c of cypherText) {
        switch (c) {
            case 't':
                original += "0";
                break;
            case 'z':
                original += "1";
                break;
            case 'y':
                original += "2";
                break;
            case 'k':
                original += "3";
                break;
            case 'l':
                original += "4";
                break;
            case 'p':
                original += "5";
                break;
            case 'n':
                original += "6";
                break;
            case 'x':
                original += "7";
                break;
            case 'a':
                original += "8";
                break;
            case 'u':
                original += "9";
                break;
        }
    }

    return original.split('').reverse().join('');
  }
}
