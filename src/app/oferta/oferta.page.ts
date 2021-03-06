import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage, StoragePlugin } from '@capacitor/storage';
import { NgForm, FormGroup, FormControl, FormBuilder} from '@angular/forms';

interface Oferta {
  id: number;
  name: string;
  cantidad: number;
  uom: number;
  price: number;
}




@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {


  ofertas: Oferta[] = [];


  itemsO: Oferta[] = [];
  tempVariable: boolean = false;
  public items: any[];
  public itemsF: any[];
  selectedValue;
  public nameType: string = "";
  searchTerms: string;

	toggle = true;
	group = null;
	selected = [];
	selectedUsers = null;
  constructor() {         
}





  async ngOnInit() {
    const i = await Storage.get({ key: 'products' });
    console.log(i)

    this.items = JSON.parse(i.value.toString());
    this.itemsF =this.items['data'].filter(i => i !== null);

    console.log(this.itemsF)

    const i1 = await Storage.get({ key: 'oferta' });
    this.itemsO = JSON.parse(i1.value.toString());
    this.itemsO =this.itemsO.filter(i => i !== null);
    console.log(this.itemsO);

    for(var i3 = 0; i3 < this.itemsO.length ; i3++){
    this.ofertas.push(this.itemsO[i3]);
    }
  }

  async register(data:NgForm){
    this.eliminarItemId(this.nameType['id']);

    this.ofertas.push({id:this.nameType['id'], name:this.nameType['name'], cantidad:data.value.cantidad, uom:this.nameType['uom_id'][0], price:this.nameType['lst_price']});


    const removeName = async () => {
      await Storage.remove({ key: 'oferta' });
    };

    await Storage.set({
      key: 'oferta',
      value: JSON.stringify(this.ofertas)
    })

    data.resetForm();
    console.log(this.itemsO);

  }

  async eliminarItem(item: Oferta) {
    const removeName = async () => {
      await Storage.remove({ key: 'oferta' });
    };
    console.log("Start");
    
    const indiceABorrar = this.ofertas.findIndex((i: Oferta) => {
        return (i.id === item.id);
    });
    if (-1 != indiceABorrar) {
        this.ofertas.splice(indiceABorrar, 1);
        console.log("borrado con exito");
    }
    await Storage.set({
      key: 'oferta',
      value: JSON.stringify(this.ofertas)
    })
    console.log(this.ofertas);
}
async eliminarItemId(id: Number) {
  const removeName = async () => {
    await Storage.remove({ key: 'oferta' });
  };
  console.log("Start");
  
  const indiceABorrar = this.ofertas.findIndex((i: Oferta) => {
      return (i.id === id);
  });
  if (-1 != indiceABorrar) {
      this.ofertas.splice(indiceABorrar, 1);
      console.log("borrado con exito");
  }
  await Storage.set({
    key: 'oferta',
    value: JSON.stringify(this.ofertas)
  })
  console.log(this.ofertas);
}




}


  


