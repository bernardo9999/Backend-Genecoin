import * as yup from "yup";
import { ChaincodeTx } from "@worldsibu/convector-platform-fabric";
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
} from "@worldsibu/convector-core";

import { NotasPrivate, NotasPublic, NotasTransientInput } from "./notas.model";

@Controller("notas")
export class NotasController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async initNotasOrg1(): Promise<any> {
    const req = await this.tx.getTransientValue<NotasTransientInput>("nota", NotasTransientInput);

    const notasPublic = new NotasPublic({
      id: req.id,
      date: req.date,
      org: "org1",
    });
    await notasPublic.save();

    const colData = new NotasPrivate({
      id: req.id,
      date: req.date,
      nota: req.nota,
    });
    await colData.save({ privateCollection: "collectionNotasPrivateOrg1" });
  }

  @Invokable()
  public async initNotasOrg2(): Promise<any> {
    const req = await this.tx.getTransientValue<NotasTransientInput>("nota", NotasTransientInput);

    const notasPublic = new NotasPublic({
      id: req.id,
      date: req.date,
      org: "org2",
    });
    await notasPublic.save();

    const colData = new NotasPrivate({
      id: req.id,
      date: req.date,
      nota: req.nota,
    });
    await colData.save({ privateCollection: "collectionNotasPrivateOrg2" });
  }

  @Invokable()
  public async compareNotasOrg1(
    @Param(yup.string()) start_date: string, @Param(yup.string()) end_date: string): Promise<any> {
    let notas = [];
    notas = await NotasPublic.getAll();
    console.log("Array de notas ", notas.length);
    let quantidade_total_org1 = 0;
    let quantidade_total_org2 = 0;
    // console.log("start_date utc", convertUTCDateToLocalDate(new Date(start_date)));
    // console.log("end_date utc", convertUTCDateToLocalDate(new Date(end_date)));
    // console.log("start_date time", convertUTCDateToLocalDate(new Date(start_date)).getTime());
    // console.log("end_date time", convertUTCDateToLocalDate(new Date(end_date)).getTime());
    console.log("----------------------------------");

    for (let i = 0; i < notas.length; i++) {
      if (
        convertUTCDateToLocalDate(new Date(notas[i].date)).getTime() >= convertUTCDateToLocalDate(new Date(start_date)).getTime() &&
        convertUTCDateToLocalDate(new Date(notas[i].date)).getTime() <=
        convertUTCDateToLocalDate(new Date(end_date)).getTime()) {
        // console.log("date utc", convertUTCDateToLocalDate(new Date(notas[i].date)));
        // console.log("date time", convertUTCDateToLocalDate(new Date(notas[i].date)).getTime());
        // console.log("-----------------------------------");

        if (notas[i].org === "org1") {
          let notasPrivate = await NotasPrivate.getOne(notas[i].id, NotasPrivate, { privateCollection: "collectionNotasPrivateOrg1" });
          if (!notasPrivate.id) {
            throw new Error(
              `Inconsistencia de dados com o Indice ${notas[i].id}`);
          }
          let quantidade = 0;
          quantidade = parseFloat(parseFloat(notasPrivate.nota["NFe"]["infNFe"]["transp"]["vol"]["pesoL"]).toFixed(2));
          // console.log("quantidade Org1", quantidade);
          quantidade_total_org1 = quantidade_total_org1 + quantidade;
          // console.log("quantidade total Org1 ", quantidade_total_org1);
        }

        if (notas[i].org === "org2") {
          let notasPrivate = await NotasPrivate.getOne(notas[i].id, NotasPrivate, { privateCollection: "collectionNotasPrivateOrg2" }
          );
          if (!notasPrivate.id) {
            throw new Error(`Inconsistencia de dados com o Indice ${notas[i].id}`);
          }
          let quantidade = 0;
          quantidade = parseFloat(parseFloat(notasPrivate.nota["NFe"]["infNFe"]["transp"]["vol"]["pesoL"]).toFixed(2));
          // console.log("quantidade Org2", quantidade);
          quantidade_total_org2 = quantidade_total_org2 + quantidade;
          // console.log("quantidade total Org2", quantidade_total_org2);
        }
      }
    }

    if (quantidade_total_org1 <= quantidade_total_org2) {
      if (quantidade_total_org1 === 0 && quantidade_total_org2 === 0) {
        console.log("quantiade total org1 " , quantidade_total_org1)
        console.log("quantiade total org2 " , quantidade_total_org2)
        return ("Não há notas para as datas consultadas")
      }
      console.log("quantiade total org1 " , quantidade_total_org1)
      console.log("quantiade total org2 " , quantidade_total_org2)
      return (quantidade_total_org1 <= quantidade_total_org2);
    }
    console.log("quantiade total org1 " , quantidade_total_org1)
    console.log("quantiade total org2 " , quantidade_total_org2)
  }

  @Invokable()
  public async getNotasOrg1(@Param(yup.string()) id: string): Promise<any> {
    const marblePrivate = await NotasPrivate.getOne(id, NotasPrivate, {
      privateCollection: "collectionNotasPrivateOrg1",
    });

    if (!marblePrivate.id) {
      throw new Error(`No marble private data with id ${id}`);
    }

    return marblePrivate.toJSON();
  }
  @Invokable()
  public async getNotasPublic(@Param(yup.string()) id: string): Promise<any> {
    const marblePublic = await NotasPublic.getOne(id, NotasPublic);

    if (!marblePublic.id) {
      throw new Error(`No marble private data with id ${id}`);
    }
    return marblePublic.toJSON();
  }
}

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate;
}
