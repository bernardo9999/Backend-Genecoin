import { Request, Response } from 'express';
import { NotasControllerBackEnd } from '../convector';
import { NotasTransientInput } from '../../../notas-cc';
let fs = require('fs')
let parseString = require('xml2js').parseString;

export async function NotasController_initNotasOrg1_post(req: Request, res: Response): Promise<void> {
    try {
        let nota = {}
        let params = req.body;
        let id = JSON.stringify(Math.floor(Math.random() * (1000000000000 - 100000000000 + 1) + 100000000000));

        parseString(params.nota, {
            explicitArray: false,
            explicitRoot: false,
            ignoreAttrs: true,
        },

            function (err, result) {
                nota = result
                if (nota.hasOwnProperty("NFe")) {
                    return nota
                } else {
                    parseString(params.nota, {
                        explicitArray: false,
                        explicitRoot: true,
                        ignoreAttrs: true,
                    },
                        function (err, result) {
                            nota = result
                            return nota
                        });
                }
            });

        if (nota['NFe']['infNFe']['emit']['CNPJ'] === '48539407009255') {
            const transientInput = new NotasTransientInput({
                id: id,
                date: nota['NFe']['infNFe']['ide']['dhEmi'],
                nota: nota
            });

            res.status(200).send(await NotasControllerBackEnd
                .$config({ transient: { nota: transientInput.toJSON() } })
                .initNotasOrg1());
        }else {
            throw new Error('Nota nao valida para esta Organização')
        }

    } catch (ex) {
        console.log('Error post NotasController_initNotasOrg1', ex.stack);
        res.status(500).send(ex);
    }
}
export async function NotasController_initNotasOrg2_post(req: Request, res: Response): Promise<void> {
    try {
        let nota = {}
        let params = req.body;
        let id = JSON.stringify(Math.floor(Math.random() * (1000000000000 - 100000000000 + 1) + 100000000000));

        parseString(params.nota, {
            explicitArray: false,
            explicitRoot: false,
            ignoreAttrs: true,
        },

            function (err, result) {
                nota = result
                if (nota.hasOwnProperty("NFe")) {
                    return nota
                } else {
                    parseString(params.nota, {
                        explicitArray: false,
                        explicitRoot: true,
                        ignoreAttrs: true,
                    },
                        function (err, result) {
                            nota = result
                            return nota
                        });
                }
            });

        if (nota['NFe']['infNFe']['emit']['CNPJ'] === '18866111000493') {
            const transientInput = new NotasTransientInput({
                id: id,
                date: nota['NFe']['infNFe']['ide']['dhEmi'],
                nota: nota
            });

            res.status(200).send(await NotasControllerBackEnd
                .$config({ transient: { nota: transientInput.toJSON() } })
                .initNotasOrg2());
        }else{
        throw new Error('Nota nao valida para esta Organização')
        }

    } catch (ex) {
        console.log('Error post NotasController_initNotasOrg2', ex.stack);
        res.status(500).send(ex);
    }
}
export async function NotasController_compareNotasOrg1_post(req: Request, res: Response): Promise<void> {
    try {
        let params = req.body;
        res.status(200).send(await NotasControllerBackEnd
            .compareNotasOrg1(params.start_date, params.end_date));

    } catch (ex) {
        console.log('Error post NotasController_compareNotasOrg1', ex.stack);
        res.status(500).send(ex);
    }
}