import { Component } from '@angular/core';
import { SQLite } from "ionic-native";
import { Platform, NavController, PopoverController  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public storage: SQLite;
  public itemList: Array<Object>;
  
  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public platform: Platform) {
    console.info("Page starting");
    this.platform.ready().then(() => {
        console.info("Opening database");
        this.storage = new SQLite();
        this.storage.openDatabase({ name: "data.db", location: 'default', createFromLocation: 1 }).then((success) => {
            this.storage.executeSql("CREATE TABLE IF NOT EXISTS item (id INTEGER PRIMARY KEY AUTOINCREMENT, columnname1 TEXT, columnname2 TEXT)", {});
            this.storage.executeSql("SELECT * FROM item", {}).then((data) => {
                let rows = data.rows;
                for (let i = 0; i < rows.length; i++) {
                    this.itemList.push({
                        id: rows.item(i).id
                    });
                }
            }, (error) => {
                console.info("Unable to execute sql " + JSON.stringify(error));
            })
     }, (err) => {
            console.info("Error opening database: " + err);
        });
    });
  }

}
