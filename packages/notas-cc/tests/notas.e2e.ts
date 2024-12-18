// tslint:disable:no-unused-expression
import { homedir } from 'os';
import { expect } from 'chai';
import { resolve } from 'path';
import 'mocha';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { FabricControllerAdapter } from '@worldsibu/convector-platform-fabric';
import { BaseStorage, ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import { NotasController, NotasPrivate, NotasTransientInput } from '../src';
let fs = require('fs')
let parseString = require('xml2js').parseString;


let xml = '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe xmlns="http://www.portalfiscal.inf.br/nfe"><infNFe Id="NFe35190318866111000493550010000114001068302210" versao="4.00"><ide><cUF>35</cUF><cNF>06830221</cNF><natOp>Venda de Producao do Estabelecimento</natOp><mod>55</mod><serie>1</serie><nNF>11400</nNF><dhEmi>2019-03-08T14:10:00-03:00</dhEmi><dhSaiEnt>2019-03-08T14:10:00-03:00</dhSaiEnt><tpNF>1</tpNF><idDest>1</idDest><cMunFG>3526902</cMunFG><tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>0</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>0</indPres><procEmi>0</procEmi><verProc>5.8.10.102</verProc></ide><emit><CNPJ>18866111000493</CNPJ><xNome>INDUSTRIAS XHARA LTDA</xNome><xFant>XHARA LIMEIRA</xFant><enderEmit><xLgr>ESTRADA MUNICIPAL LIM-125</xLgr><nro>S/N</nro><xCpl>PISTA NORTE ROD ANHANGUERA SP330 KM 131</xCpl><xBairro>JAGUARI</xBairro><cMun>3526902</cMun><xMun>LIMEIRA</xMun><UF>SP</UF><CEP>13480970</CEP><cPais>1058</cPais><xPais>Brasil</xPais><fone>1934439700</fone></enderEmit><IE>417355487118</IE><IM>61601</IM><CNAE>1042200</CNAE><CRT>3</CRT></emit><dest><CNPJ>48539407009255</CNPJ><xNome>BASF S/A</xNome><enderDest><xLgr>Estrada Rio Abaixo</xLgr><nro>S/N</nro><xCpl>Rod. Presidente Dutra - KM-161</xCpl><xBairro>RIO BAIXO</xBairro><cMun>3524402</cMun><xMun>JACAREI</xMun><UF>SP</UF><CEP>12335010</CEP><cPais>1058</cPais><xPais>Brasil</xPais></enderDest><indIEDest>1</indIEDest><IE>392109284115</IE><email>nfe.br@basf.com;gabriela.armelin@basf.com</email></dest><autXML><CNPJ>18866111000493</CNPJ></autXML><det nItem="1"><prod><cProd>R102-00</cProd><cEAN>SEM GTIN</cEAN><xProd>OLEO DE PALMA REFINADO C/TBHQ</xProd><NCM>15119000</NCM><CEST>1707500</CEST><CFOP>5101</CFOP><uCom>TON</uCom><qCom>30.5900</qCom><vUnCom>3655.9200000000</vUnCom><vProd>111834.59</vProd><cEANTrib>SEM GTIN</cEANTrib><uTrib>TON</uTrib><qTrib>30.5900</qTrib><vUnTrib>3655.9200000000</vUnTrib><indTot>1</indTot><xPed>6440</xPed><nItemPed>1</nItemPed></prod><imposto><ICMS><ICMS20><orig>0</orig><CST>20</CST><modBC>3</modBC><pRedBC>61.11</pRedBC><vBC>43491.22</vBC><pICMS>18.00</pICMS><vICMS>7828.42</vICMS></ICMS20></ICMS><IPI><cEnq>999</cEnq><IPINT><CST>51</CST></IPINT></IPI><PIS><PISNT><CST>06</CST></PISNT></PIS><COFINS><COFINSNT><CST>06</CST></COFINSNT></COFINS></imposto></det><total><ICMSTot><vBC>43491.22</vBC><vICMS>7828.42</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST><vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>111834.59</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc><vII>0.00</vII><vIPI>0.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>0.00</vPIS><vCOFINS>0.00</vCOFINS><vOutro>0.00</vOutro><vNF>111834.59</vNF></ICMSTot></total><transp><modFrete>0</modFrete><transporta><CPF>33392894842</CPF><xNome>R.P DOS SANTOS TRANSPORTES - ME</xNome><IE>ISENTO</IE><xEnder>GABRIEL CINTRA DE CASTRO, 78</xEnder><xMun>LIMEIRA</xMun><UF>SP</UF></transporta><vol><qVol>30590</qVol><esp>Granel</esp><pesoL>30590.000</pesoL><pesoB>48900.000</pesoB></vol></transp><cobr><fat><nFat>11400</nFat><vOrig>111834.59</vOrig><vDesc>0.00</vDesc><vLiq>111834.59</vLiq></fat><dup><nDup>001</nDup><dVenc>2019-04-08</dVenc><vDup>111834.59</vDup></dup></cobr><pag><detPag><tPag>99</tPag><vPag>111834.59</vPag></detPag></pag><infAdic><infAdFisco>* IPI aliquota 0,00 cf. TIPI, Decreto 6.006/2006. * PIS/PASEP e COFINS aliquota zero cf. Medida Provisoria n 609, de 08 de marco de 2013. Convertida em Lei n 12.839/2013 em 09 de Julho de 2013.Inc. XXIII. * BC Reduzida Conf. Inciso IV do Art. 3 do Anexo II do RICMS/2000.</infAdFisco><infCpl>VENDA MERCADO INTERNO CONF. PEDIDO N6440/1 LACRES: 1404/1459/1442/1478/1479/1413 MOTORISTA:APARECIDO DE SOUZA CPF: 075.791.808-55 PLACA : GIG-0151/ASO-4357 TICKET: 0549079 LOTE FAB:RPOC1910 FAT.STEFANY GREICY DATA DE ENTREGA:11/03/2019 - Entrega: 11/03/2019</infCpl><obsCont xCampo="EMAILTRANSPORTADOR"><xTexto>paloma1caetano@hotmail.com,pedro_donato77@hotmail.com</xTexto></obsCont></infAdic></infNFe><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /><Reference URI="#NFe35190318866111000493550010000114001068302210"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /><DigestValue>LnGZAahxFxGB5rmzX4Y/XJzThPI=</DigestValue></Reference></SignedInfo><SignatureValue>krITFcunx6zytz56Vn1mhAiOc7nxdjF5faHv6dV5XE1Q4rivffw+FGccDho3QznrMptm0v3oxTE7GcDptG0Vnxbhu+7HtpVkbxqzfuAlR1lcahdAp6wzmKZIfYptuZzU/ElqB0jX7DHLW+c+Uprz4ylr3M+6RcsnzNE46OZ0nLt/2dQjevucaVrBBNj5MdOzBuEGdf8itR3ArteOpay/Co50YX+QD7rOFhq4VbnEU3cpUYDEAtZVe7n27T7ILM/2+y9ulAAQubZDpKVKaficCK2qumIgdT36UL9tlrOPKor3CMr9Dm3meR8Rqsallfrd3LghFRnGpI0H9WOO8YpXtw==</SignatureValue><KeyInfo><X509Data><X509Certificate>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</X509Certificate></X509Data></KeyInfo></Signature></NFe><protNFe versao="4.00"><infProt><tpAmb>1</tpAmb><verAplic>SP_NFE_PL009_V4</verAplic><chNFe>35190318866111000493550010000114001068302210</chNFe><dhRecbto>2019-03-08T14:18:00-03:00</dhRecbto><nProt>135190167938030</nProt><digVal>LnGZAahxFxGB5rmzX4Y/XJzThPI=</digVal><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt></protNFe></nfeProc>'
let xml2 = '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe xmlns="http://www.portalfiscal.inf.br/nfe"><infNFe Id="NFe35190318866111000493550010000114001068302210" versao="4.00"><ide><cUF>35</cUF><cNF>06830221</cNF><natOp>Venda de Producao do Estabelecimento</natOp><mod>55</mod><serie>1</serie><nNF>11400</nNF><dhEmi>2020-01-04T15:00:00-03:00</dhEmi><dhSaiEnt>2019-03-08T14:10:00-03:00</dhSaiEnt><tpNF>1</tpNF><idDest>1</idDest><cMunFG>3526902</cMunFG><tpImp>1</tpImp><tpEmis>1</tpEmis><cDV>0</cDV><tpAmb>1</tpAmb><finNFe>1</finNFe><indFinal>0</indFinal><indPres>0</indPres><procEmi>0</procEmi><verProc>5.8.10.102</verProc></ide><emit><CNPJ>18866111000493</CNPJ><xNome>INDUSTRIAS XHARA LTDA</xNome><xFant>XHARA LIMEIRA</xFant><enderEmit><xLgr>ESTRADA MUNICIPAL LIM-125</xLgr><nro>S/N</nro><xCpl>PISTA NORTE ROD ANHANGUERA SP330 KM 131</xCpl><xBairro>JAGUARI</xBairro><cMun>3526902</cMun><xMun>LIMEIRA</xMun><UF>SP</UF><CEP>13480970</CEP><cPais>1058</cPais><xPais>Brasil</xPais><fone>1934439700</fone></enderEmit><IE>417355487118</IE><IM>61601</IM><CNAE>1042200</CNAE><CRT>3</CRT></emit><dest><CNPJ>48539407009255</CNPJ><xNome>BASF S/A</xNome><enderDest><xLgr>Estrada Rio Abaixo</xLgr><nro>S/N</nro><xCpl>Rod. Presidente Dutra - KM-161</xCpl><xBairro>RIO BAIXO</xBairro><cMun>3524402</cMun><xMun>JACAREI</xMun><UF>SP</UF><CEP>12335010</CEP><cPais>1058</cPais><xPais>Brasil</xPais></enderDest><indIEDest>1</indIEDest><IE>392109284115</IE><email>nfe.br@basf.com;gabriela.armelin@basf.com</email></dest><autXML><CNPJ>18866111000493</CNPJ></autXML><det nItem="1"><prod><cProd>R102-00</cProd><cEAN>SEM GTIN</cEAN><xProd>OLEO DE PALMA REFINADO C/TBHQ</xProd><NCM>15119000</NCM><CEST>1707500</CEST><CFOP>5101</CFOP><uCom>TON</uCom><qCom>30.5900</qCom><vUnCom>3655.9200000000</vUnCom><vProd>111834.59</vProd><cEANTrib>SEM GTIN</cEANTrib><uTrib>TON</uTrib><qTrib>30.5900</qTrib><vUnTrib>3655.9200000000</vUnTrib><indTot>1</indTot><xPed>6440</xPed><nItemPed>1</nItemPed></prod><imposto><ICMS><ICMS20><orig>0</orig><CST>20</CST><modBC>3</modBC><pRedBC>61.11</pRedBC><vBC>43491.22</vBC><pICMS>18.00</pICMS><vICMS>7828.42</vICMS></ICMS20></ICMS><IPI><cEnq>999</cEnq><IPINT><CST>51</CST></IPINT></IPI><PIS><PISNT><CST>06</CST></PISNT></PIS><COFINS><COFINSNT><CST>06</CST></COFINSNT></COFINS></imposto></det><total><ICMSTot><vBC>43491.22</vBC><vICMS>7828.42</vICMS><vICMSDeson>0.00</vICMSDeson><vFCP>0.00</vFCP><vBCST>0.00</vBCST><vST>0.00</vST><vFCPST>0.00</vFCPST><vFCPSTRet>0.00</vFCPSTRet><vProd>111834.59</vProd><vFrete>0.00</vFrete><vSeg>0.00</vSeg><vDesc>0.00</vDesc><vII>0.00</vII><vIPI>0.00</vIPI><vIPIDevol>0.00</vIPIDevol><vPIS>0.00</vPIS><vCOFINS>0.00</vCOFINS><vOutro>0.00</vOutro><vNF>111834.59</vNF></ICMSTot></total><transp><modFrete>0</modFrete><transporta><CPF>33392894842</CPF><xNome>R.P DOS SANTOS TRANSPORTES - ME</xNome><IE>ISENTO</IE><xEnder>GABRIEL CINTRA DE CASTRO, 78</xEnder><xMun>LIMEIRA</xMun><UF>SP</UF></transporta><vol><qVol>30590</qVol><esp>Granel</esp><pesoL>30590.000</pesoL><pesoB>48900.000</pesoB></vol></transp><cobr><fat><nFat>11400</nFat><vOrig>111834.59</vOrig><vDesc>0.00</vDesc><vLiq>111834.59</vLiq></fat><dup><nDup>001</nDup><dVenc>2019-04-08</dVenc><vDup>111834.59</vDup></dup></cobr><pag><detPag><tPag>99</tPag><vPag>111834.59</vPag></detPag></pag><infAdic><infAdFisco>* IPI aliquota 0,00 cf. TIPI, Decreto 6.006/2006. * PIS/PASEP e COFINS aliquota zero cf. Medida Provisoria n 609, de 08 de marco de 2013. Convertida em Lei n 12.839/2013 em 09 de Julho de 2013.Inc. XXIII. * BC Reduzida Conf. Inciso IV do Art. 3 do Anexo II do RICMS/2000.</infAdFisco><infCpl>VENDA MERCADO INTERNO CONF. PEDIDO N6440/1 LACRES: 1404/1459/1442/1478/1479/1413 MOTORISTA:APARECIDO DE SOUZA CPF: 075.791.808-55 PLACA : GIG-0151/ASO-4357 TICKET: 0549079 LOTE FAB:RPOC1910 FAT.STEFANY GREICY DATA DE ENTREGA:11/03/2019 - Entrega: 11/03/2019</infCpl><obsCont xCampo="EMAILTRANSPORTADOR"><xTexto>paloma1caetano@hotmail.com,pedro_donato77@hotmail.com</xTexto></obsCont></infAdic></infNFe><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /><Reference URI="#NFe35190318866111000493550010000114001068302210"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /><DigestValue>LnGZAahxFxGB5rmzX4Y/XJzThPI=</DigestValue></Reference></SignedInfo><SignatureValue>krITFcunx6zytz56Vn1mhAiOc7nxdjF5faHv6dV5XE1Q4rivffw+FGccDho3QznrMptm0v3oxTE7GcDptG0Vnxbhu+7HtpVkbxqzfuAlR1lcahdAp6wzmKZIfYptuZzU/ElqB0jX7DHLW+c+Uprz4ylr3M+6RcsnzNE46OZ0nLt/2dQjevucaVrBBNj5MdOzBuEGdf8itR3ArteOpay/Co50YX+QD7rOFhq4VbnEU3cpUYDEAtZVe7n27T7ILM/2+y9ulAAQubZDpKVKaficCK2qumIgdT36UL9tlrOPKor3CMr9Dm3meR8Rqsallfrd3LghFRnGpI0H9WOO8YpXtw==</SignatureValue><KeyInfo><X509Data><X509Certificate>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</X509Certificate></X509Data></KeyInfo></Signature></NFe><protNFe versao="4.00"><infProt><tpAmb>1</tpAmb><verAplic>SP_NFE_PL009_V4</verAplic><chNFe>48190318866111000493550010000114001068302221</chNFe><dhRecbto>2019-03-08T14:18:00-03:00</dhRecbto><nProt>135190167938030</nProt><digVal>LnGZAahxFxGB5rmzX4Y/XJzThPI=</digVal><cStat>100</cStat><xMotivo>Autorizado o uso da NF-e</xMotivo></infProt></protNFe></nfeProc>'

//fs.readFile('nota.xml', function (err, data) {
// aqui vai a funcao de parseString
//});

describe('Notas', () => {
    let adapter: FabricControllerAdapter;
    let adapter2: FabricControllerAdapter;
    let notasCtrl: ConvectorControllerClient<NotasController>;
    let notasCtrl2: ConvectorControllerClient<NotasController>;

    before(async () => {
        const home = homedir();
        const keyStore = resolve(home, 'hyperledger-fabric-network/.hfc-org1');
        const networkProfile = resolve(home, 'hyperledger-fabric-network',
            'network-profiles/org1.network-profile.genecoin.yaml');
        const userMspPath = resolve(home, 'hyperledger-fabric-network',
            'artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/User1@org1.hurley.lab/msp');

        adapter = new FabricControllerAdapter({
            skipInit: true,
            txTimeout: 300000,
            user: 'user1',
            channel: 'ch1',
            chaincode: 'notas',
            keyStore,
            networkProfile,
            userMspPath,
            userMsp: 'org1MSP'
        });
        notasCtrl = ClientFactory(NotasController, adapter);
        await adapter.init(true);

        BaseStorage.current = new CouchDBStorage({
            host: 'localhost',
            protocol: 'http',
            port: '5084'
        }, 'ch1_notas');
    });

    before(async () => {
        const home = homedir();
        const keyStore = resolve(home, 'hyperledger-fabric-network/.hfc-org2');
        const networkProfile = resolve(home, 'hyperledger-fabric-network',
            'network-profiles/org2.network-profile.yaml');
        const userMspPath = resolve(home, 'hyperledger-fabric-network',
            'artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/User1@org2.hurley.lab/msp');

        adapter2 = new FabricControllerAdapter({
            skipInit: true,
            txTimeout: 300000,
            user: 'user1',
            channel: 'ch1',
            chaincode: 'notas',
            keyStore,
            networkProfile,
            userMspPath,
            userMsp: 'org2MSP'
        });
        notasCtrl2 = ClientFactory(NotasController, adapter2);
        await adapter2.init(true);

        BaseStorage.current = new CouchDBStorage({
            host: 'localhost',
            protocol: 'http',
            port: '5184'
        }, 'ch1_notas');
    });

    //-----------------------------------------------------
    it('should store private data', async () => {

        let nota = {}

        parseString(xml, {
            explicitArray: false,
            explicitRoot: false,
            ignoreAttrs: true
        },
            function (err, result) {
                nota = result
                return nota
            });


        const transientInput = new NotasTransientInput({
            id: nota['protNFe']['infProt']['chNFe'],
            date: nota['NFe']['infNFe']['ide']['dhEmi'],
            cod_prod: nota['NFe']['infNFe']['det']['prod']['cProd'],
            nota: nota
        });

        console.log('Sending tx with transient:', transientInput.toJSON());
        await notasCtrl
            .$config({ transient: { nota: transientInput.toJSON() } })
            .initNotasOrg1();

        (BaseStorage.current as CouchDBStorage).updateDefaultDB('ch1_notas$$pcollection$notas$private$org1');
        const notasPrivate = await NotasPrivate.getOne('35190318866111000493550010000114001068302210');
        expect(notasPrivate.id).to.eql('35190318866111000493550010000114001068302210');
        expect(notasPrivate.date).to.eql('2019-03-08T14:10:00-03:00');
    });
    //-----------------------------------------------------
    it('should store private data', async () => {

        let nota = {}

        parseString(xml2, {
            explicitArray: false,
            explicitRoot: false,
            ignoreAttrs: true
        },
            function (err, result) {
                nota = result
                return nota
            });


        const transientInput = new NotasTransientInput({
            id: nota['protNFe']['infProt']['chNFe'],
            date: nota['NFe']['infNFe']['ide']['dhEmi'],
            cod_prod: nota['NFe']['infNFe']['det']['prod']['cProd'],
            nota: nota
        });

        console.log('Sending tx with transient:', transientInput.toJSON());
        await notasCtrl2
            .$config({ transient: { nota: transientInput.toJSON() } })
            .initNotasOrg2();

        (BaseStorage.current as CouchDBStorage).updateDefaultDB('ch1_notas$$pcollection$notas$private$org2');
        const notasPrivate = await NotasPrivate.getOne('48190318866111000493550010000114001068302221');
        expect(notasPrivate.id).to.eql('48190318866111000493550010000114001068302221');
        expect(notasPrivate.date).to.eql('2020-01-04T15:00:00-03:00');
    });

});
    //-----------------------------------------------------
//     it('should query private data', async () => {

//         const nota = await notasCtrl.$query().getOneNotasPrivate('35190318866111000493550010000114001068302210');
//         console.log('Got private data:', nota);
//         expect(nota.id).to.eql('35190318866111000493550010000114001068302210');
//         expect(nota.date).to.eql('2019-03-08T14:10:00-03:00');
//     });
//     //-----------------------------------------------------
//     it('should query private data', async () => {

//         const nota = await notasCtrl.$query().getOneNotasPrivate('48190318866111000493550010000114001068302221');
//         console.log('Got private data:', nota);
//         expect(nota.id).to.eql('48190318866111000493550010000114001068302221');
//         expect(nota.date).to.eql('2020-01-04T15:00:00-03:00');
//     });

//     //-----------------------------------------------------

// 
